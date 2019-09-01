import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import Summary from './summaryPresenter';
import { TOP_EMPLOYERS } from './summaryQueries';

const Container = () => {
  return <Summary />;
}

export default Container;
