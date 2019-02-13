import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert, Linking, Platform } from 'react-native';

import { PublicRouter, PrivateRouter } from './Router';
import { Spinner } from './components/commons';
import config from '../config.json';
import pjson from '../package.json';

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
    fetch(`${config.API_URL}/careertalk/version`)
      .then(resp => resp.json())
      .then((json) => {
        if (json.version === pjson.version) {
          this.setState({ loading: false });
        } else {
          Alert.alert(
            'New version is available!',
            'Follow the link to update the app.',
            [
              {
                text: 'Update',
                onPress: () => {
                  Linking.openURL(Platform.OS === 'ios' ? config.app_store : config.google_play);
                }
              }
            ],
            { cancelable: false }
          );
        }
      });
  }

  render() {
    const { loading } = this.state;

    return (
      <Fragment>
        {loading ? (
          <View style={{ minHeight: 500, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Spinner size="large" />
            <Text>Version checking...</Text>
          </View>
        ) : (
          <Router {...this.props} />
        )}
      </Fragment>
    );
  }
}

const Router = props => (props.isLoggedIn ? <PrivateRouter /> : <PublicRouter />);

export default connect(mapStateToProps)(App);
