import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';

import {
  ISLOGGEDIN_QUERY,
  GET_SOCIAL_PROVIDER,
  GET_FAVORITES,
  UPDATE_FAVORITES,
  GET_NOTES,
  UPDATE_NOTES
} from '../../Apollo/sharedQueries';
import { EMPLOYERS, EMPLOYERS_LOCAL } from './EmployerListQueries';
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
  const { data: noteData } = useQuery(GET_NOTES);
  const [updateNotesMutation] = useMutation(UPDATE_NOTES);

  useEffect(() => {
    if (employerListState && noteData && noteData.notes) {
      const { fair: { id } } = employerListState;
      const { notes } = noteData;
      const fairNotes = notes.find(item => item.id === id);

      if (fairNotes) {
        const totalNotes = fairNotes.employerIds.length;
        if (totalNotes !== numOfNotes) {
          setNumOfNotes(totalNotes);
        }
      }
    }
  }, [noteData]);

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

  const updateComponentState = employerList => {
    const { fair, companies } = employerList;
    const filteredByLikes = companies.filter(comp => comp.is_liked);
    const filteredByNotes = companies.filter(comp => comp.is_noted);
    const likedEmployerIds = [];
    const notedEmployerIds = [];
    filteredByLikes.forEach(item => likedEmployerIds.push(item.employer.id));
    filteredByNotes.forEach(item => notedEmployerIds.push(item.employer.id));

    setNumOfCompanies(companies.length);
    setNumOfFavorites(filteredByLikes.length);
    setNumOfNotes(filteredByNotes.length);
    setEmployerList(employerList);

    // update cache
    updateNotesMutation({
      variables: {
        mode: 'SETUP',
        fairId: fair.id,
        employerIds: notedEmployerIds,
      }
    });
    updateFavoritesMutation({
      variables: {
        mode: 'SETUP',
        fairId: fair.id,
        employerIds: likedEmployerIds,
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
      const { data: { getEmployerList } } = await refetch({ fairId, isUser: socialProvider !== null, fetchPolicy: 'network-only' });
      // if filter options are set, filter companies after refresh
      if (filterOptions || visaOption !== null) {
        getFilteredEmployersFromCache(filterOptions, visaOption);
      } else {
        updateComponentState(getEmployerList)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
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
    />
  );
};
