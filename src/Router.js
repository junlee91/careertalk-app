import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import LoginPage from './screens/Login';
import Fairs from './screens/Fairs';
import CompanyList from './screens/CompanyList';
import CompanyDetail from './screens/CompanyDetail';
import Profile from './screens/Profile';
import FairMap from './components/FairMap';

const RouterComponent = () => (
  <Router>
    <Scene key="root" hideNavBar tabBarStyle={{ backgroundColor: '#eee' }}>
      <Scene key="login" component={LoginPage} initial title="Login" />
      <Scene key="fairs" component={Fairs} title="Career Fairs" hideNavBar />

      <Scene key="tabbar" tabs>
        <Router key="company_list_router_modal" title="Employer">
          <Scene modal hideNavBar>
            <Scene key="companyList" initial component={CompanyList} hideNavBar />
            <Scene key="companyDetail" component={CompanyDetail} hideNavBar />
          </Scene>
        </Router>

        <Router key="profile_router_modal" title="Profile">
          <Scene modal hideNavBar>
            <Scene key="profile" component={Profile} hideNavBar />
            <Scene key="companyDetail" component={CompanyDetail} title="" hideNavBar />
          </Scene>
        </Router>
      </Scene>

      <Scene key="fairMap" component={FairMap} title="Map" back hideNavBar />
    </Scene>
  </Router>
);

export default RouterComponent;
