import React from 'react';
import { Actions } from 'react-native-router-flux';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { SafeAreaView, View, Button, StyleSheet, TextInput, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

GoogleSignin.configure();

signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    alert(JSON.stringify(userInfo));
    // this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

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

        <View>
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

        <View>
          <GoogleSigninButton
            style={{ width: 250, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => signIn()}
            // disabled={this.state.isSigninInProgress}
          />
        </View>

        {props.profilePhoto && <Image source={{ uri: props.profilePhoto }} style={styles.image} />}
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
  },
  image: {
    height: 200,
    width: 200,
    margin: 20
  }
});

export default LoginPage;
