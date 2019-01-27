import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { Button, ListItem } from 'react-native-elements';

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
    const { socialProvider, logout } = this.props;

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
          <View style={styles.logOutStyle}>
            {socialProvider && socialProvider === 'facebook' ? (
              <LoginButton onLogoutFinished={logout} />
            ) : (
              <Button
                buttonStyle={styles.logOutButtonStyle}
                onPress={socialProvider === 'google' ? this._googleSignOut : this.props.logout}
                title="Sign Out"
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  logOutBoxStyle: {
    borderRadius: 1,
    padding: 15,
    justifyContent: 'flex-end',
    backgroundColor: '#FAFAFA'
  },
  logOutStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logOutButtonStyle: {
    width: 230,
    height: 48
  }
});

export default SettingsPage;
