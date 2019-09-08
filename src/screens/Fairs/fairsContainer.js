import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';

import FairList from './fairsPresenter';
import { Spinner } from '../../components/commons';

export const FAIRS = gql`
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
      map_url
    }
  }
`;

export default () => {
  const [fairs, setFairs] = useState(null);
  const { data, loading } = useQuery(FAIRS);

  useEffect(() => {
    if (!loading && data.getFair) {
      setFairs(data.getFair);
    }
  }, [loading]);

  return !loading && fairs ? <FairList careerFairs={fairs} /> : <Spinner size="large" />;
};
