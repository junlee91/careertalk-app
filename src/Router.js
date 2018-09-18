import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

// import LoginPage from './screens/Login';
import Fairs from './screens/Fairs';
import CompanyList from './screens/CompanyList';
import CompanyDetail from './screens/CompanyDetail';
import Profile, { ProfileIcon } from './screens/Profile';
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
