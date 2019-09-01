import { AsyncStorage } from 'react-native';

import { GET_CACHED_EMPLOYERS, GET_FAVORITES } from './sharedQueries';
import { FAVORITE_FRAGMENT, NOTE_FRAGMENT } from './fragments';

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
    updateNotesCache: async (_, variables, { cache }) => {
      const { mode, fairId, employerId, employerIds } = variables;
      if (mode === null) return null;

      if (mode === 'SETUP') {
        const newNotes = {
          __typename: 'Note',
          id: fairId,
          employerIds
        };

        // update cache
        await cache.writeData({
          data: {
            notes: [newNotes]
          }
        });

        return newNotes;
      } else {
        // unique id: Note:${fairId}
        const noteId = cache.config.dataIdFromObject({
          __typename: 'Note',
          id: fairId,
        });
        const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
        let updatedNotes = [];

        if (mode === 'SAVE') {
          updatedNotes = [...note.employerIds, employerId];
        } else if (mode === 'DELETE') {
          updatedNotes = note.employerId.filter(id => id !== employerId);
        }

        const updatedNote = {
          ...note,
          employerIds: updatedNotes
        };

        // update cache
        cache.writeFragment({
          id: noteId,
          fragment: NOTE_FRAGMENT,
          data: updatedNote
        });

        return updatedNote;
      }
    },
    updateFavoritesCache: async (_, variables, { cache }) => {
      const { mode, fairId, employerId, employerIds } = variables;
      if (mode === null) return null;

      if (mode === 'SETUP') {
        const { favorites } = cache.readQuery({ query: GET_FAVORITES });
        const newFavorite = {
          __typename: 'Favorite',
          id: fairId,
          employerIds,
        };

        // filter before update the cache
        const filteredPreviousFavorites = favorites.filter(({ id }) => id !== fairId);

        // update cache
        await cache.writeData({
          data: {
            favorites: [...filteredPreviousFavorites, newFavorite]
          }
        });

        return newFavorite;
      } else {
        // unique id: Favorite:${fairId}
        const favoriteId = cache.config.dataIdFromObject({
          __typename: 'Favorite',
          id: fairId,
        });
        // get Favorite fragment from cache with given unique id
        const favorite = cache.readFragment({ fragment: FAVORITE_FRAGMENT, id: favoriteId });
        let updatedFavorites = [];

        if (mode === 'LIKE') {
          updatedFavorites = [...favorite.employerIds, employerId];
        } else if (mode === 'UNLIKE') {
          updatedFavorites = favorite.employerIds.filter(id => id !== employerId);
        }

        const updatedFavorite = {
          ...favorite,
          employerIds: updatedFavorites
        };

        // update cache
        cache.writeFragment({
          id: favoriteId,
          fragment: FAVORITE_FRAGMENT,
          data: updatedFavorite
        });

        return updatedFavorite;
      }
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
