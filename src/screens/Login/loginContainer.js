import React from 'react';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import LoginPage from './loginPresenter';

GoogleSignin.configure();

class Container extends React.Component {
  state = {
    username: '',
    password: '',
  };

  componentWillMount() {
    this._googleIsSignedIn();
  }

  // Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.error(error.toString());
    } else {
      // send userInfo with token to store
      this.props.socialLogin(result);
    }
  };

  _facebookLoginFinished = (error, result) => {
    if (error) {
      console.error(`login has error: ${result.error}`);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        // FB TOKEN
        const token = data.accessToken.toString();

        this.setState({ token });

        // Create a graph request asking for user information
        // with a callback to handle the response.
        const infoRequest = new GraphRequest(
          '/me?fields=name,first_name,last_name,picture.type(large)',
          null,
          this._responseInfoCallback
        );

        // Request for user data
        new GraphRequestManager().addRequest(infoRequest).start();
      });
    }
  };

  _googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // send userInfo to store
      this.props.socialLogin(userInfo);
      this.setState({ isGoogleSignedIn: true });
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

  _googleIsSignedIn = async () => {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    this.setState({ isGoogleSignedIn });
  };

  _gooogleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ isGoogleSignedIn: false });
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <LoginPage
        {...this.state}
        facebookLoginFinished={this._facebookLoginFinished}
        googleSigin={this._googleSignIn}
        googleSignOut={this._gooogleSignOut}
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
