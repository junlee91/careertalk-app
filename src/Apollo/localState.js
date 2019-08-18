import { AsyncStorage } from 'react-native';

import { GET_CACHED_EMPLOYERS, GET_NEW_NOTES, GET_TOTAL_NOTES } from './sharedQueries';

/**
 * App supports public logic so we manage the logged in state like this:
 * AsyncStorage {
 *  isLoggedIn: 'true' | 'false'
 *  socialProvider: 'google' | undefined
 *  token: jwt | null
 * }
 */

const callback = error => {
  if (error) {
    console.error(error);
  }
};

// More info: https://facebook.github.io/react-native/docs/asyncstorage
_storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value, callback);
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      let socialProvider = null;
      if (token) {
        _storeData('token', token);
        _storeData('socialProvider', 'google');
        socialProvider = 'google';
      }
      _storeData('isLoggedIn', 'true');

      // update InMemory cache
      cache.writeData({
        data: {
          isLoggedIn: true,
          socialProvider,
        }
      });

      return null;
    },
    logUserOut: async () => {
      await AsyncStorage.removeItem('token', callback);
      await AsyncStorage.removeItem('socialProvider', callback);
      _storeData('isLoggedIn', 'false');

      return null;
    },
    updateNumOfNotesCache: async (_, variables, { cache }) => {
      const { mode, employerId } = variables;
      if (mode === null) return null;

      /** newNotes: list of employerIds that have note */
      const { newNotes } = cache.readQuery({
        query: GET_NEW_NOTES
      });
      /** total number of employers that have note */
      const { totalNotes } = cache.readQuery({
        query: GET_TOTAL_NOTES
      });
      let updatedNotes;
      let updatedTotal;

      if (mode === 'DELETE') {
        updatedNotes = newNotes.filter(id => id !== employerId);
        updatedTotal = totalNotes - 1;
      } else if (mode === 'SAVE') {
        if (!newNotes.includes(employerId)) {
          updatedNotes = [...newNotes, employerId];
          updatedTotal = totalNotes + 1;
        }
      } else if (mode === 'SETUP') {
        updatedNotes = variables.newNotes;
        updatedTotal = variables.totalNotes;
      }
      await cache.writeData({
        data: {
          newNotes: updatedNotes,
          totalNotes: updatedTotal
        }
      });

      return null;
    }
  },
  Query: {
    /**
     * Get employer list from cache
     */
    getEmployerListCache: (_, variables, { cache }) => {
      try {
        const {
          fairId,
          isUser,
          hiringFilter,
          degreeFilter,
          majorFilter,
          visaFilter,
          searchTerm
        } = variables;
        const hirings = new Set(hiringFilter);
        const degrees = new Set(degreeFilter);
        const majors = new Set(majorFilter);
        const {
          getEmployerList: { companies, fair }
        } = cache.readQuery({
          query: GET_CACHED_EMPLOYERS,
          variables: {
            fairId,
            isUser
          }
        });

        // Following the same filtering logics in CareerTalk App (Mobile)
        let filteredEmployers = companies;
        let employerOptSet;
        let filterOptSet;
        let intersection;

        // filter by search term
        if (searchTerm) {
          filteredEmployers = filteredEmployers.filter(({ employer }) => employer.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // filter by major
        if (majors.size) {
          filteredEmployers = filteredEmployers.filter(e => {
            employerOptSet = new Set(e.hiring_majors);
            filterOptSet = majors;
            intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

            return intersection.size;
          });
        }

        // filter by degree
        if (degrees.size) {
          filteredEmployers = filteredEmployers.filter(e => {
            employerOptSet = new Set(e.degree_requirements);
            filterOptSet = degrees;
            intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

            return intersection.size;
          });
        }

        // filter by hiring
        if (hirings.size) {
          filteredEmployers = filteredEmployers.filter(e => {
            employerOptSet = new Set(e.hiring_types);
            filterOptSet = hirings;
            intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

            return intersection.size;
          });
        }

        // filter by visa
        if (visaFilter) {
          filteredEmployers = filteredEmployers.filter(e => e.visa_support === 'yes');
        }

        return {
          companies: filteredEmployers,
          fair
        };
      } catch (error) {
        console.error(error);
      }

      return null;
    }
  }
};
