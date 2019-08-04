import React from 'react';
// import { LoginButton } from 'react-native-fbsdk';
import { GoogleSigninButton } from 'react-native-google-signin';
import {
  SafeAreaView,
  View,
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import { LoginButton } from '../../components/commons';

const { width } = Dimensions.get('window');

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
        <View style={{ paddingVertical: 15 }}>
          <GoogleSigninButton
            style={{ width: 230, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={props.googleSigin}
          />
        </View>

        <Text>OR</Text>

        {/* <View style={{ paddingVertical: 15 }}>
          <LoginButton
            readPermissions={['public_profile']}
            onLoginFinished={props.facebookLoginFinished}
            onLogoutFinished={() => console.log('logout.')}
          />
        </View> */}
        <View style={{ paddingVertical: 15 }}>
          {Platform.OS === 'ios' ? (
            <LoginButton title="Sign in as public user" onPress={props.login} />
          ) : (
            <TouchableOpacity style={styles.button} onPressOut={props.login}>
              <Text
                style={{
                  fontFamily: 'Avenir Next',
                  fontSize: 15,
                  fontWeight: '600'
                }}
              >
                Sign in with Default
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
    flex: 5,
    backgroundColor: '#fff',
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
  },
  image: {
    height: 200,
    width: 200,
    margin: 20
  },
  buttonStyle: {
    width: 220,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Avenir Next',
    fontSize: 15
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

export default LoginPage;

// Not used yet
/**
const LoginInput = props => (
  <View>
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
  </View>
);
 */
