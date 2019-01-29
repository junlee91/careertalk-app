import React from 'react';
// import { LoginButton } from 'react-native-fbsdk';
import { GoogleSigninButton } from 'react-native-google-signin';
import { SafeAreaView, View, Button, StyleSheet, Text, Dimensions, Image } from 'react-native';
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
          <LoginButton title="Sign in with Default" onPress={props.login} />
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
  },
  image: {
    height: 200,
    width: 200,
    margin: 20
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
