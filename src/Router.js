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

      <Router>
        <Scene modal hideNavBar>
          <Scene key="tabber" tabs>
            {/* Tab 1 */}
            <Scene key="companyList" initial component={CompanyList} hideNavBar title="Employer" />

            {/* Tab 2 */}
            <Scene key="profile" component={Profile} hideNavBar title="Profile" />

            {/* TODO: more tabs here!! */}
          </Scene>

          <Scene key="companyDetail" component={CompanyDetail} hideNavBar />
        </Scene>
      </Router>

      {/* Modal goes here!! */}
      <Scene key="fairMap" component={FairMap} title="Map" back hideNavBar />
    </Scene>
  </Router>
);

export default RouterComponent;
