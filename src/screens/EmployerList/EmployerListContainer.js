import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { ISLOGGEDIN_QUERY } from '../../Apollo/sharedQueries';
import { EMPLOYERS, TOGGLE_LIKE, EMPLOYERS_LOCAL } from './EmployerListQueries';
import EmployerListPresenter from './EmployerListPresenter';

export default ({ fairId }) => {
  /** employer list state to be shown in the grid */
  const [employerListState, setEmployerList] = useState(null);

  /** graphql queries */
  const { data: { isLoggedIn } } = useQuery(ISLOGGEDIN_QUERY);
  const {
    data,
    error,
    loading
  } = useQuery(EMPLOYERS, {
    variables: { fairId, isUser: isLoggedIn === 'true' },
    fetchPolicy: 'network-only'
  });

  /** update the employerList state after downloading */
  useEffect(() => {
    if (!loading && data.getEmployerList) {
      setEmployerList(data.getEmployerList);
    }
  }, [loading]);

  // --------------------------- Filter ---------------------------------- //
  // TODO
  // --------------------------------------------------------------------- //

  return <EmployerListPresenter loading={loading} employerList={employerListState} error={error} />;
};
