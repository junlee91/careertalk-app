import { AsyncStorage } from 'react-native';
// More info: https://facebook.github.io/react-native/docs/asyncstorage
_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
    console.error(error);
  }
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      _storeData('token', token);
      _storeData('isLoggedIn', 'true');
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: () => {
      AsyncStorage.removeItem('token', res => console.log(res));
      _storeData('isLoggedIn', 'false');
      return null;
    }
  }
  // Query: {
  //   /**
  //    * Get employer list from cache
  //    */
  //   getEmployerListCache: (_, variables, { cache }) => {
  //     try {
  //       const { fairId, isUser, hiringFilter, degreeFilter, majorFilter, visaFilter } = variables;
  //       const hirings = new Set(hiringFilter);
  //       const degrees = new Set(degreeFilter);
  //       const majors = new Set(majorFilter);
  //       const {
  //         getEmployerList: { companies, fair }
  //       } = cache.readQuery({
  //         query: GET_CACHED_EMPLOYERS,
  //         variables: {
  //           fairId,
  //           isUser
  //         }
  //       });

  //       // Following the same filtering logics in CareerTalk App (Mobile)
  //       let filteredEmployers = companies;
  //       let employerOptSet;
  //       let filterOptSet;
  //       let intersection;

  //       // TODO: filter by search term

  //       // filter by major
  //       if (majors.size) {
  //         filteredEmployers = filteredEmployers.filter(e => {
  //           employerOptSet = new Set(e.hiring_majors);
  //           filterOptSet = majors;
  //           intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

  //           return intersection.size;
  //         });
  //       }

  //       // filter by degree
  //       if (degrees.size) {
  //         filteredEmployers = filteredEmployers.filter(e => {
  //           employerOptSet = new Set(e.degree_requirements);
  //           filterOptSet = degrees;
  //           intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

  //           return intersection.size;
  //         });
  //       }

  //       // filter by hiring
  //       if (hirings.size) {
  //         filteredEmployers = filteredEmployers.filter(e => {
  //           employerOptSet = new Set(e.hiring_types);
  //           filterOptSet = hirings;
  //           intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

  //           return intersection.size;
  //         });
  //       }

  //       // filter by visa
  //       if (visaFilter) {
  //         filteredEmployers = filteredEmployers.filter(e => e.visa_support === 'yes');
  //       }

  //       return {
  //         companies: filteredEmployers,
  //         fair
  //       };
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     return null;
  //   }
  // }
};
