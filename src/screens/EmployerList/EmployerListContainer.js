import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';

import {
  ISLOGGEDIN_QUERY,
  GET_SOCIAL_PROVIDER,
  UPDATE_NUM_OF_NOTES,
  GET_TOTAL_NOTES,
  GET_FAVORITES,
  UPDATE_FAVORITES
} from '../../Apollo/sharedQueries';
import { EMPLOYERS, TOGGLE_LIKE, EMPLOYERS_LOCAL } from './EmployerListQueries';
import EmployerListPresenter from './EmployerListPresenter';

export default ({ fairId }) => {
  /** employer list state to be shown in the grid */
  const [employerListState, setEmployerList] = useState(null);

  /** state for showing number of likes and notes */
  const [numOfCompanies, setNumOfCompanies] = useState(0);
  const [numOfFavorites, setNumOfFavorites] = useState(0);
  const [numOfNotes, setNumOfNotes] = useState(0);

  /** search bar state */
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchBarFocus, setSearchBarFocus] = useState(false);

  /** filter state */
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [visaOption, setVisa] = useState(null);

  /** refresh control state */
  const [isRefreshing, setIsRefreshing] = useState(false);

  /** graphql queries */
  const { data: { isLoggedIn } } = useQuery(ISLOGGEDIN_QUERY);
  const { data: { socialProvider } } = useQuery(GET_SOCIAL_PROVIDER);
  const { data, error, loading, refetch } = useQuery(EMPLOYERS, {
    variables: { fairId, isUser: socialProvider !== null },
    fetchPolicy: 'network-only',
  });

  /** notes cache */
  const { data: totalNotesData} = useQuery(GET_TOTAL_NOTES);
  const [updateNoteCountMutation] = useMutation(UPDATE_NUM_OF_NOTES);

  useEffect(() => {
    if (totalNotesData) {
      const { totalNotes } = totalNotesData;
      if (totalNotes !== numOfNotes) {
        setNumOfNotes(totalNotes);
      }
    }
  }, [totalNotesData]);

  /** favorites cache */
  const { data: favoritesData } = useQuery(GET_FAVORITES);
  const [updateFavoritesMutation] = useMutation(UPDATE_FAVORITES);

  useEffect(() => {
    if (employerListState && favoritesData && favoritesData.favorites) {
      const { fair: { id } } = employerListState;
      const { favorites } = favoritesData;
      const fairFavorites = favorites.find(item => item.id === id);

      if (fairFavorites) {
        const totalFavorites = fairFavorites.employerIds.length;
        if (totalFavorites !== numOfFavorites) {
          setNumOfFavorites(totalFavorites);
        }
      }
    }
  }, [favoritesData]);

  /** Query employer list from cache */
  const { refetch: getCache } = useQuery(EMPLOYERS_LOCAL, {
    skip: true,
  });

  /** Like */
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  const updateComponentState = employerList => {
    const { fair, companies } = employerList;
    const filteredByLikes = companies.filter(comp => comp.is_liked);
    const filteredByNotes = companies.filter(comp => comp.is_noted);
    const newNotes = [];
    const employerIds = [];
    filteredByLikes.forEach(item => employerIds.push(item.employer.id));
    filteredByNotes.forEach(item => newNotes.push(item.employer.id));

    setNumOfCompanies(companies.length);
    setNumOfFavorites(filteredByLikes.length);
    setNumOfNotes(filteredByNotes.length);
    setEmployerList(employerList);

    // update cache
    updateNoteCountMutation({
      variables: {
        mode: 'SETUP',
        newNotes,
        totalNotes: filteredByNotes.length
      }
    });
    updateFavoritesMutation({
      variables: {
        mode: 'SETUP',
        fairId: fair.id,
        employerIds,
      }
    });
  }

  /** update the employerList state after downloading */
  useEffect(() => {
    if (!loading && data.getEmployerList) {
      const { getEmployerList } = data;

      // if filter options are set, filter companies after refresh
      if (filterOptions || visaOption !== null) {
        getFilteredEmployersFromCache(filterOptions, visaOption);
      } else {
        updateComponentState(getEmployerList)
      }
    }
  }, [loading]);

  // ------------------------- Search Bar --------------------------------- //
  const searching = term => {
    if (term) {
      setSearchTerm(term.trim());
    } else {
      setSearchTerm(null);
    }
  }

  const cancelSearch = () => {
    setSearchTerm(null);
    const filters = filterOptions || {
      degree: [],
      majors: [],
      hiringTypes: []
    };

    getFilteredEmployersFromCache(filters, visaOption, '');
  }

  const focusSearchBar = () => {
    setSearchBarFocus(!searchBarFocus);
  }

  const search = () => {
    const filters = filterOptions || {
      degree: [],
      majors: [],
      hiringTypes: []
    };

    getFilteredEmployersFromCache(filters, visaOption, searchTerm);
  }
  // --------------------------------------------------------------------- //


  // --------------------------- Filter ---------------------------------- //
  const toggleFilterModal = ({ filterOptions, visaOption }) => {
    setOverlayVisible(!overlayVisible);

    if (filterOptions) {
      if (isFilterApplied(filterOptions, visaOption)) {
        setFilterApplied(true);
      } else {
        setFilterApplied(false);
      }

      setFilterOptions(filterOptions);
      setVisa(visaOption);
      setTimeout(() => {
        getFilteredEmployersFromCache(filterOptions, visaOption);
      }, 500);
    }
  };

  const isFilterApplied = (filterOptions, visaOption) => {
    return (
      filterOptions.degree.size
      || filterOptions.hiringTypes.size
      || filterOptions.majors.size
      || visaOption
    );
  };

  const getFilteredEmployersFromCache = async (filterOptions, visaOption, term) => {
    const { degree, majors, hiringTypes } = filterOptions;
    const { data: { getEmployerListCache } } = await Promise.resolve(
      getCache({
        fairId,
        isUser: socialProvider !== null,
        hiringFilter: [...hiringTypes],
        degreeFilter: [...degree],
        majorFilter: [...majors],
        visaFilter: visaOption,
        searchTerm: term === '' ? null : searchTerm,
      })
    );

    updateComponentState(getEmployerListCache);
  }
  // --------------------------------------------------------------------- //

  // ---------------------- Refresh Control logic ------------------------ //
  const refresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch({ fairId, isUser: socialProvider !== null, fetchPolicy: 'network-only' });
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  }
  // --------------------------------------------------------------------- //

  // ---------------------------- Toggle Like ---------------------------- //
  const toggleLike = async ({ employerId, name, liked }) => {
    const { fair: { id: fairId } } = employerListState;

    try {
      const {
        data: {
          likeEmployer: { message, status }
        },
      } = await toggleLikeMutation({
        variables: { fairId, employerId },
      });
      if (status) {
        console.log(`${message} ${name}`);
        // Update favorites cache
        if (liked) {
          updateFavoritesMutation({
            variables: {
              mode: 'LIKE',
              fairId,
              employerId,
            }
          });
        } else {
          updateFavoritesMutation({
            variables: {
              mode: 'UNLIKE',
              fairId,
              employerId,
            }
          });
        }
        return true;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
    return false;
  }
  // --------------------------------------------------------------------- //

  return (
    <EmployerListPresenter
      loading={loading}
      employerList={employerListState}
      error={error}
      numOfCompanies={numOfCompanies}
      numOfFavorites={numOfFavorites}
      numOfNotes={numOfNotes}
      searchTerm={searchTerm}
      searching={searching}
      cancelSearch={cancelSearch}
      focusSearchBar={focusSearchBar}
      searchBarFocus={searchBarFocus}
      search={search}
      isRefreshing={isRefreshing}
      refresh={refresh}
      toggleFilterModal={toggleFilterModal}
      overlayVisible={overlayVisible}
      filterApplied={filterApplied}
      toggleLike={toggleLike}
    />
  );
};
