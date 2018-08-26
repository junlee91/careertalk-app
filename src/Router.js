import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import CompanyList from './components/CompanyList';

const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Scene key="companyList" component={CompanyList} title="Comapny List" />
    </Stack>
  </Router>
);

export default RouterComponent;
