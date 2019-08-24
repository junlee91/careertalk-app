import React from 'react';
import { Actions } from 'react-native-router-flux';

import FairItem from './presenter';

export default ({ fair }) => {
  _navigateTo = id => {
    setTimeout(() => {
      Actions.jump('_employerList', { fairId: id });
    }, 250);
  };

  return <FairItem fair={fair} navigateTo={_navigateTo} />;
};
