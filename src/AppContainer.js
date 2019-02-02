import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Alert, Linking, Platform } from 'react-native';

import { PublicRouter, PrivateRouter } from './Router';
import { Spinner } from './components/commons';
import config from '../config.json';

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state;

  return {
    isLoggedIn
  };
};

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    Alert.alert(
      'New version is available!',
      'Follow the link to update the app.',
      [
        {
          text: 'Update',
          onPress: () => {
            Linking.openURL(Platform.OS === 'ios' ? config.app_store : config.google_play);

            // TODO: move this method to componentWillMount
            this.setState({ loading: false });
          }
        }
      ],
      { cancelable: false }
    );

    console.log(`Current Version is ${config.version}`);
  }

  render() {
    const { loading } = this.state;

    return <Fragment>{loading ? <Spinner size="large" /> : <Router {...this.props} />}</Fragment>;
  }
}

const Router = props => (props.isLoggedIn ? <PrivateRouter /> : <PublicRouter />);

export default connect(mapStateToProps)(App);
