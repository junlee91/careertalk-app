import React from 'react';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

import LoginPage from './loginPresenter';

GoogleSignin.configure();

class Container extends React.Component {
  state = {
    username: '',
    password: '',
    isSubmitting: false,
    profilePhoto: null,
    fbId: null,
    token: null
  };

  // Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.error(error.toString());
    } else {
      // result.picture.data.url => profile photo
      // result.id => fbId
      // result.name => username
      this.setState({
        profilePhoto: result.picture.data.url
      });
    }
  };

  _googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);
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
        saveToken={this._saveToken}
        fbCallback={this._responseInfoCallback}
        googleSigin={this._googleSignIn}
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
