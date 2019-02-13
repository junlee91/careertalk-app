import React from 'react';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { Alert } from 'react-native';
// import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import LoginPage from './loginPresenter';
import config from '../../../config.json';

// Follow the link for more info:
// https://github.com/react-native-community/react-native-google-signin/issues/263#issuecomment-320611997
GoogleSignin.configure({
  webClientId: config.webClientId,
});

class Container extends React.Component {
  state = {
    username: '',
    password: '',
  };

  // Anonymous login
  _login = (async = () => {
    Alert.alert(
      'Attention!',
      'Using an anonymous account will have limitations using the app.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.props.login() }
      ],
      { cancelable: false }
    );
  });

  //         FACEBOOK       //
  // Create facebook signin response callback.
  // _responseInfoCallback = (error, result) => {
  //   if (error) {
  //     console.error(error.toString());
  //   } else {
  //     const { fbToken } = this.state;
  //     const {
  //       email,
  //       first_name,
  //       last_name,
  //       id,
  //       picture,
  //     } = result;

  //     // send userInfo with token to store
  //     this.props.socialLogin(
  //       {
  //         email,
  //         firstName: first_name,
  //         lastName: last_name,
  //         profilePhoto: picture.data.url,
  //         socialToken: fbToken,
  //         socialId: id
  //       },
  //       'facebook'
  //     );
  //   }
  // };

  // _facebookLoginFinished = (error, result) => {
  //   if (error) {
  //     console.error(`login has error: ${result.error}`);
  //   } else if (result.isCancelled) {
  //     console.log('login is cancelled.');
  //   } else {
  //     AccessToken.getCurrentAccessToken().then((data) => {
  //       // FB TOKEN
  //       const token = data.accessToken.toString();

  //       this.setState({ fbToken: token });

  //       // Create a graph request asking for user information
  //       // with a callback to handle the response.
  //       const infoRequest = new GraphRequest(
  //         '/me?fields=email,name,first_name,last_name,picture.type(large)',
  //         null,
  //         this._responseInfoCallback
  //       );

  //       // Request for user data
  //       new GraphRequestManager().addRequest(infoRequest).start();
  //     });
  //   }
  // };

  //         GOOGLE       //
  // Google Siginin
  _googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken, idToken, user } = userInfo;
      const { email, givenName, familyName, name, id, photo } = user;

      // send userInfo to store
      this.props.socialLogin(
        {
          email,
          givenName,
          familyName,
          photo,
          accessToken,
          idToken,
          id,
          name
        },
        'google'
      );
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

  render() {
    return (
      <LoginPage
        {...this.state}
        facebookLoginFinished={this._facebookLoginFinished}
        googleSigin={this._googleSignIn}
        login={this._login}
      />
    );
  }
}

export default Container;

/** Not used
  _changeUsername = (text) => {
    this.setState({ username: text });
  };

  _changePassword = (text) => {
    this.setState({ password: text });
  };

  _submit = async () => {
    console.log('login submit');
  };

  _saveToken = (token) => {
    this.setState({
      token
    });
  };
*/
