import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import LoginPage from './screens/Login';
import Fairs from './screens/Fairs';
import CompanyList from './screens/CompanyList';
import CompanyDetail from './screens/CompanyDetail';
import Profile, { ProfileIcon } from './screens/Profile';
import FairMap from './components/FairMap';

const RouterComponent = () => (
  <Router>
    <Scene key="root" hideNavBar tabBarStyle={{ backgroundColor: '#eee' }}>
      <Scene key="login" component={LoginPage} initial title="Login" />

      <Scene key="tabbar" tabs>
        <Stack key="Employers" hideNavBar>
          <Scene key="fairs" component={Fairs} title="Career Fairs" initial hideNavBar />
          <Router key="modalRoot">
            <Scene modal hideNavBar>
              <Scene key="companyList" component={CompanyList} hideNavBar />
              <Scene key="companyDetail" component={CompanyDetail} hideNavBar />
            </Scene>
          </Router>
        </Stack>

        <Stack key="Profile" hideNavBar>
          <Router key="modalRoot">
            <Scene modal hideNavBar>
              <Scene key="profile" component={Profile} hideNavBar />
              <Scene key="companyDetail" component={CompanyDetail} title="" hideNavBar />
            </Scene>
          </Router>
        </Stack>
      </Scene>

      <Scene key="fairMap" component={FairMap} title="Map" back hideNavBar />
    </Scene>
  </Router>
);

export default RouterComponent;
