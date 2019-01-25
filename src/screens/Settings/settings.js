import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

class SettingsPage extends React.Component {
  _googleSignOut = async () => {
    try {
      // Finish Google Session
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Clear auth state
      this.props.logout();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { socialProvider, logout } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Text>Settings Page</Text>
        {socialProvider && socialProvider === 'facebook' ? (
          <LoginButton onLogoutFinished={logout} />
        ) : (
          <Button onPress={this._googleSignOut} title="Google Logout" />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SettingsPage;
