import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';

import Summary from './summaryPresenter';
import { TOP_EMPLOYERS } from './summaryQueries';
import { GET_CURRENT_FAIR_ID } from '../../Apollo/sharedQueries';

const Container = () => {
  const [fairId, setFairId] = useState(null);
  const { data: { currentFairId } } = useQuery(GET_CURRENT_FAIR_ID);

  useEffect(() => {
    if (currentFairId) {
      setFairId(currentFairId);
    }
  }, [currentFairId])

  return <Summary />;
}

export default Container;
