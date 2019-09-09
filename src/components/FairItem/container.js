import React from 'react';
import { Actions } from 'react-native-router-flux';
import { useMutation } from 'react-apollo-hooks';

import { SET_CURRENT_FAIR_ID } from '../../Apollo/sharedQueries';
import FairItem from './presenter';

export default ({ fair }) => {
  const [setCurrentFairMutation] = useMutation(SET_CURRENT_FAIR_ID);

  _navigateTo = id => {
    setTimeout(() => {
      Actions.jump('_employerList', { fairId: id });
      setCurrentFairMutation({ variables: { fairId: id }});
    }, 50);
  };

  return <FairItem fair={fair} navigateTo={_navigateTo} />;
};
