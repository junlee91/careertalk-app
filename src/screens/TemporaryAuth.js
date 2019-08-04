import React from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { useMutation } from 'react-apollo-hooks';

import { LOCAL_LOG_OUT } from '../Apollo/sharedQueries';

/**
 * This is a tempory file for handling logout
 */
export default ({ setIsLoggedInState }) => {
  const [localLogoutMutation] = useMutation(LOCAL_LOG_OUT);

  const logout = async () => {
    const socialProvider = await AsyncStorage.getItem('socialProvider');

    if (socialProvider === 'google') {
      try {
        // Finish Google Session
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (error) {
        console.error(error);
      }
    }
    // Clear auth state
    await localLogoutMutation();
    setIsLoggedInState(false);
  }

  return (
    <View
      style={{
        minHeight: 500,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Text>Private Page</Text>
      <Button title="log out" onPress={() => logout()} />
    </View>
  );
};
