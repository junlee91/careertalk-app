import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';

import FairList from './fairsPresenter';
import { Spinner } from '../../components/commons';

const FAIRS = gql`
  {
    getFair {
      id
      name
      address
      num_of_employers
      date
      start_time
      end_time
      location
    }
  }
`;

export default () => {
  const {
    data: { getFair: fairs },
    loading,
    error // TODO: error handle
  } = useQuery(FAIRS);

  return loading ? <Spinner size="large" /> : <FairList fairs={fairs} />;
};
