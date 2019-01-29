import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
// import { LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { ListItem } from 'react-native-elements';

import { LoginButton as LogoutButton } from '../../components/commons';

const list = [
  {
    title: 'Manage Profile',
    icon: 'person-add'
  },
  {
    title: 'Password',
    icon: 'lock-outline'
  }
];

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
    const { socialProvider } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          {list.map((item, i) => (
            <ListItem
              onPress={() => alert('Sorry! This does not work yet!')}
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              rightIcon={{ name: 'chevron-right' }}
              bottomDivider
            />
          ))}
        </View>
        <View style={styles.logOutBoxStyle}>
          {Platform.OS === 'ios' ? (
            <LogoutButton
              onPress={socialProvider === 'google' ? this._googleSignOut : this.props.logout}
              title="Sign Out"
            />
          ) : (
            <TouchableOpacity style={styles.button} onPressOut={this.props.logout}>
              <Text
                style={{
                  fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir Next',
                  fontSize: 15,
                  fontWeight: '600'
                }}
              >
                Sign out
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logOutBoxStyle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 15
  },
  button: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 48,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default SettingsPage;
