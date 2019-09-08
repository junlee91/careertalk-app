import React, { useState } from 'react';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
// import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import { GOOGLE_SIGN_IN, LOCAL_LOG_IN } from './loginQueries';
import LoginPage from './loginPresenter';
import config from '../../../config.json';

// Follow the link for more info:
// https://github.com/react-native-community/react-native-google-signin/issues/263#issuecomment-320611997
GoogleSignin.configure({
  webClientId: config.webClientId,
  iosClientId: config.iosClientId,
});

export default ({ setIsLoggedInState }) => {
  const [loading, setLoading] = useState(false);
  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);
  const [googleSiginMutation] = useMutation(GOOGLE_SIGN_IN);

  const loginFn = async (token) => {
    await localLoginMutation({ variables: { token } });

    // Update the LoggedIn state in CareerTalk.js
    // this will change to use private router
    setIsLoggedInState(true);
  };

  // Public signin
  _publicSignIn = async = () => {
    Alert.alert(
      'Hi there',
      'If you log in, you can like companies, take notes, and be more efficient during the career fair! Do you want to sign in instead?',
      [
        {
          text: 'No, continue anonymously',
          onPress: () => loginFn(null),
        },
        { text: 'Yes, sign in with Google', onPress: () => _googleSignIn() }
      ],
      { cancelable: false }
    );
  };

  _googleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user: { id } } = userInfo;
      const { data: { userLogin: token } } = await googleSiginMutation({
        variables: {
          tokenId: idToken,
          googleId: id
        }
      });
      loginFn(token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('Google Play services is not available.');
      } else {
        // some other error happened
      }
    }
  };

  return (
    <LoginPage
      facebookLoginFinished={this._facebookLoginFinished}
      googleSigin={_googleSignIn}
      login={_publicSignIn}
      loading={loading}
    />
  );
};

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
