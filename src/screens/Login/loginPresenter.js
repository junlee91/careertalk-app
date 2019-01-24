import React from 'react';
import { Actions } from 'react-native-router-flux';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSigninButton } from 'react-native-google-signin';
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput, Dimensions, Image } from 'react-native';

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
        <Button onPress={() => Actions.reset('fairs')} title="Direct Login" />

        <View style={{ paddingVertical: 15 }}>
          <GoogleSigninButton
            style={{ width: 230, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={props.googleSigin}
          />
        </View>

        <Text>OR</Text>

        <View style={{ paddingVertical: 15 }}>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.error(`login has error: ${result.error}`);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  // FB TOKEN
                  const token = data.accessToken.toString();
                  props.saveToken(token);

                  // Create a graph request asking for user information
                  // with a callback to handle the response.
                  const infoRequest = new GraphRequest(
                    '/me?fields=name,picture.type(large)',
                    null,
                    props.fbCallback
                  );

                  // Request for user data
                  new GraphRequestManager().addRequest(infoRequest).start();
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
        </View>

        {props.profilePhoto && <Image source={{ uri: props.profilePhoto }} style={styles.image} />}
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
