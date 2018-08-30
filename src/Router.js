import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import Fairs from './components/Fairs';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';

const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Scene key="fairs" initial component={Fairs} title="Career Fairs" />
      <Scene key="companyList" component={CompanyList} title="Employer List" />
      <Scene key="companyDetail" component={CompanyDetail} title="Employer Detail" />
    </Stack>
  </Router>
);

export default RouterComponent;
