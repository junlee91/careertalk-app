import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

// import LoginPage from './components/LoginPage';
import Fairs from './components/Fairs';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import Profile, { ProfileIcon } from './components/Profile';
import FairMap from './components/FairMap';

const RouterComponent = () => (
  <Router>
    <Scene key="root" hideNavBar>
      {/* <Scene key="login" component={LoginPage} initial title="Login" /> */}
      <Stack key="root">
        <Scene key="fairs" component={Fairs} title="Career Fairs" renderRightButton={ProfileIcon} />
        <Scene
          key="companyList"
          component={CompanyList}
          title="Employer List"
          back
          renderRightButton={ProfileIcon}
        />
        <Scene
          key="companyDetail"
          component={CompanyDetail}
          title="Employer Detail"
          back
        />
        <Scene key="profile" component={Profile} title="Profile" back />
        <Scene key="fairMap" component={FairMap} title="Map" back hideNavBar />
      </Stack>
    </Scene>
  </Router>
);

export default RouterComponent;
