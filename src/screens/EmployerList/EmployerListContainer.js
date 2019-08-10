import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { ISLOGGEDIN_QUERY } from '../../Apollo/sharedQueries';
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

  /** refresh control state */
  const [isRefreshing, setIsRefreshing] = useState(false);

  /** graphql queries */
  const { data: { isLoggedIn } } = useQuery(ISLOGGEDIN_QUERY);
  const { data, error, loading, refetch } = useQuery(EMPLOYERS, {
    variables: { fairId, isUser: isLoggedIn === 'true' }
  });

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
    setSearchTerm(term);
  }

  const cancelSearch = () => {
    setSearchTerm(null);
  }

  const focusSearchBar = () => {
    setSearchBarFocus(!searchBarFocus);
  }
  // --------------------------------------------------------------------- //


  // --------------------------- Filter ---------------------------------- //
  const toggleFilterModal = ({ filterOptions, visaOption }) => {
    setOverlayVisible(!overlayVisible);

    if (filterOptions || visaOption) {
      console.log('TODO: Apply Filter from Apollo Cache!!');

      console.log(filterOptions);
      console.log('visaOption', visaOption);

      isFilterApplied(filterOptions, visaOption);
    }
  }

  const isFilterApplied = (filterOptions, visaOption) => {
    if (
      filterOptions.degree.size
      || filterOptions.hiringTypes.size
      || filterOptions.majors.size
      || visaOption
    ) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }
  // --------------------------------------------------------------------- //

  // ---------------------- Refresh Control logic ------------------------ //
  const refresh = async () => {
    setIsRefreshing(true);
    const { data: { getEmployerList } } = await Promise.resolve(refetch({ fairId, isUser: isLoggedIn === 'true' }));

    updateComponentState(getEmployerList)
    setIsRefreshing(false);
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
      isRefreshing={isRefreshing}
      refresh={refresh}
      toggleFilterModal={toggleFilterModal}
      overlayVisible={overlayVisible}
      filterApplied={filterApplied}
    />
  );
};
