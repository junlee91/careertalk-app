import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { ISLOGGEDIN_QUERY, GET_SOCIAL_PROVIDER } from '../../Apollo/sharedQueries';
import { EMPLOYERS, TOGGLE_LIKE, EMPLOYERS_LOCAL } from './EmployerListQueries';
import EmployerListPresenter from './EmployerListPresenter';

export default ({ fairId }) => {
  /** employer list state to be shown in the grid */
  const [employerListState, setEmployerList] = useState(null);

  /** state for showing number of likes and notes */
  const [numOfCompanies, setNumOfCompanies] = useState(0);
  const [numOfFavorites, setNumOfFavorites] = useState(0);
  const [numOfNotes, setNumOfNotes] = useState(0);
  const [newNotes, setNewNotes] = useState(new Set());

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

  /** Query employer list from cache */
  const { refetch: getCache } = useQuery(EMPLOYERS_LOCAL, {
    skip: true,
  });

  /** Like */
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  const updateComponentState = employerList => {
    const { companies } = employerList;
    const filteredByLikes = companies.filter(comp => comp.is_liked);
    const filteredByNotes = companies.filter(comp => comp.is_noted);

    setNumOfCompanies(companies.length);
    setNumOfFavorites(filteredByLikes.length);
    setNumOfNotes(filteredByNotes.length);
    setEmployerList(employerList);
  }

  /** update the employerList state after downloading */
  useEffect(() => {
    if (!loading && data.getEmployerList) {
      const { getEmployerList } = data;
      updateComponentState(getEmployerList)
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
        isUser: isLoggedIn === 'true',
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
    setIsRefreshing(true);
    const { data: { getEmployerList } } = await Promise.resolve(
      refetch({ fairId, isUser: socialProvider !== null, fetchPolicy: 'network-only' })
    );

    // if filter options are set, filter companies after refresh
    if (filterOptions || visaOption !== null) {
      getFilteredEmployersFromCache(filterOptions, visaOption);
    } else {
      updateComponentState(getEmployerList)
    }

    setIsRefreshing(false);
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
        // Increment/Decrement numOfFavorites
        if (liked) {
          setNumOfFavorites(numOfFavorites + 1);
        } else {
          setNumOfFavorites(numOfFavorites - 1);
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

  /** Update the total number of notes on saving & deleting notes */
  const changeNumOfNotes = ({ mode, employerId }) => {
    if (mode === 'DELETE') {
      setNewNotes(notes => {
        if (notes.has(employerId)) {
          notes.delete(employerId);
        }
        return notes;
      });
      setNumOfNotes(numOfNotes - 1);
    } else if (mode === 'SAVE') {
      if (!newNotes.has(employerId)) {
        setNewNotes(notes => notes.add(employerId));
        setNumOfNotes(numOfNotes + 1);
      }
    }
  };

  return (
    <EmployerListPresenter
      loading={loading}
      employerList={employerListState}
      error={error}
      numOfCompanies={numOfCompanies}
      numOfFavorites={numOfFavorites}
      numOfNotes={numOfNotes}
      changeNumOfNotes={changeNumOfNotes}
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
