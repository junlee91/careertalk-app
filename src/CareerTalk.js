import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Linking, Platform } from 'react-native';

import { Spinner } from './components/commons';
import config from '../config.json';
import pjson from '../package.json';

/** CareerTalk using React Hooks and Graphql */
const CareerTalk = () => {
  const [loading, setLoading] = useState(true);
  const checkVersion = () => {
    fetch(`${config.API_URL}/careertalk/version`)
      .then(resp => resp.json())
      .then(json => {
        if (json.version === pjson.version) {
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
        <Text>Version Checked!</Text>
      )}
    </>
  );
};

export default CareerTalk;
