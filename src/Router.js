import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';

const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Scene key="companyList" initial component={CompanyList} title="Employer List" />
      <Scene key="companyDetail" component={CompanyDetail} title="Employer Detail" />
    </Stack>
  </Router>
);

export default RouterComponent;
