import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

const { width } = Dimensions.get('window');

// TODO: Change this!!!
function _fbAuth() {
  LoginManager.logInWithReadPermissions(['public_profile']).then(
    function(result) {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        alert(`Login success with permissions: ${result.grantedPermissions.toString()}`);
      }
    },
    function(error) {
      alert(`Login fail with error: ${error}`);
    }
  );
}

const LoginPage = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../img/Icon-512.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={props.username}
          onChangeText={props.changeUsername}
        />

        <TextInput
          placeholder="Password"
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry
          value={props.password}
          onChangeText={props.changePassword}
          returnKeyType="send"
          onSubmitEditing={props.submit}
        />

        <Button onPress={() => Actions.reset('fairs')} title="Login" />

        {Platform.OS === 'android' && (
          <View>
            <LoginButton
              // TODO: Change this!!!
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log(`login has error: ${result.error}`);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log('logout.')}
            />
          </View>
        )}

        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={() => _fbAuth()}>
            <Text>Login with Facebook</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width
  },
  logo: {
    width: 180,
    height: 80
  },
  content: {
    flex: 4,
    backgroundColor: 'white',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textInput: {
    height: 50,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth,
    width: width - 80,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
    fontSize: 14
  }
});

export default LoginPage;
