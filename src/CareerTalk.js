import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Linking, Platform } from 'react-native';

import { PublicRouter, PrivateRouter2 } from './Router';
import { Spinner } from './components/commons';
import config from '../config.json';
import pjson from '../package.json';

/** CareerTalk using React Hooks and Graphql */
const CareerTalk = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);

  const checkVersion = () => {
    fetch(`${config.API_URL}/careertalk/version`)
      .then(resp => resp.json())
      .then(json => {
        // TODO: change pjson.version
        if (json.version === '2.0.1') {
          setLoading(false);
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
  };

  useEffect(() => {
    checkVersion();
  });

  return (
    <>
      {loading ? (
        <View
          style={{
            minHeight: 500,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Spinner size="large" />
          <Text>Version checking...</Text>
        </View>
      ) : (
        <Router isLoggedInState={isLoggedInState} setIsLoggedInState={setIsLoggedInState} />
      )}
    </>
  );
};

const Router = ({ isLoggedInState, setIsLoggedInState }) => (isLoggedInState ? (
  <PrivateRouter2 setIsLoggedInState={setIsLoggedInState} />
) : (
  <PublicRouter setIsLoggedInState={setIsLoggedInState} />
));

export default CareerTalk;
