import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene, Modal } from 'react-native-router-flux';

import LoginPage from './screens/Login';
import Fairs from './screens/Fairs';
import CompanyList from './screens/CompanyList';
import CompanyDetail from './screens/CompanyDetail';
import Profile from './screens/Profile';
import SummaryPage from './screens/Summary';
import Settings from './screens/Settings';

import FairMap from './components/FairMap';
import { TabIcon } from './components/commons';

const PublicRouter = () => (
  <Router key="public">
    <Scene key="root" hideNavBar>
      <Scene key="login" component={LoginPage} initial title="Login" />
    </Scene>
  </Router>
);

const PrivateRouter = () => (
  <Router key="private">
    <Scene key="root" hideNavBar>

      <Scene key="fairs" component={Fairs} initial title="Career Fairs" hideNavBar />

      {/* Inner Router for Tabs */}
      <Router key="modalRouter">
        <Modal key="modalScene" hideNavBar>
          <Scene key="tabber" tabs hideNavBar tabBarStyle={styles.tabBarStyle} showLabel={false}>
            {/* Tab 1 */}
            <Scene
              key="companyList"
              initial
              component={CompanyList}
              hideNavBar
              title="Employer"
              icon={TabIcon}
            />

            {/* Tab 2 */}
            <Scene key="profile" component={Profile} hideNavBar title="Profile" icon={TabIcon} />

            {/* Tab 3 */}
            <Scene
              key="summary"
              component={SummaryPage}
              title="Summary"
              hideNavBar
              icon={TabIcon}
            />

            {/* Tab 4 */}
            {/* Remove settings screen for v2 */}
            {/* <Scene
              key="settings"
              component={Settings}
              title="Settings"
              hideNavBar
              icon={TabIcon}
            /> */}

            {/* TODO: more tabs here!! */}
          </Scene>

          {/* Modal goes here!! */}
        </Modal>
      </Router>

      <Scene key="companyDetail" component={CompanyDetail} hideNavBar />
      <Scene key="fairMap" component={FairMap} title="Map" back hideNavBar />

    </Scene>
  </Router>
);

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee'
  }
});

export { PublicRouter, PrivateRouter };
