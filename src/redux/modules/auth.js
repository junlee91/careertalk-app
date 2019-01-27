import { AsyncStorage } from 'react-native';
import { actionCreators as userActions } from './user';

// More info: https://facebook.github.io/react-native/docs/asyncstorage
_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(key, value);
  } catch (error) {
    // Error saving data
    console.error(error);
  }
};

// Actions
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SET_PROVIDER = 'SET_PROVIDER';

// Action Creators
function setLogIn(token) {
  return {
    type: LOG_IN,
    token
  };
}

function logout() {
  return {
    type: LOG_OUT
  };
}

function setProvider(provider) {
  return {
    type: SET_PROVIDER,
    provider
  };
}

// API Actions
function login() {
  return (dispatch) => {
    // For anonymous login, we don't have a token and user data
    dispatch(setLogIn(null));
    dispatch(userActions.setUser(null));

    return true;
  };
}

function socialLogin(
  { email, firstName, lastName, profilePhoto, socialToken, idToken, socialId },
  socialProvider
) {
  return (dispatch) => {
    console.log(`Email: ${email}`);
    console.log(`First: ${firstName} Last: ${lastName}`);
    console.log(`Photo: ${profilePhoto}`);
    console.log(`Social Token: ${socialToken}`);

    if (idToken) {
      console.log(`Google Firebase Id Token: ${idToken}`);
    }

    if (socialId) {
      console.log(`Social Id: ${socialId}`);
    }

    const token = 'Career Talk Token';

    if (firstName && lastName) {
      dispatch(userActions.setUser({ firstName, lastName, profilePhoto }));
    }

    dispatch(setProvider(socialProvider));
    dispatch(setLogIn(token));

    return true;
  };
}

// Initial State
const initialState = {
  isLoggedIn: false,
  socialProvider: ''
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return applyLogIn(state, action);
    case LOG_OUT:
      return applyLogOut(state, action);
    case SET_PROVIDER:
      return applySetProvider(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applyLogIn(state, action) {
  const { token } = action;

  if (token) {
    _storeData('token', token);
  }

  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applyLogOut() {
  AsyncStorage.clear();
  return {
    isLoggedIn: false,
    token: ''
  };
}

function applySetProvider(state, action) {
  const { provider } = action;
  return {
    ...state,
    socialProvider: provider
  };
}

// Exports

const actionCreators = {
  socialLogin,
  login,
  logout,
};

export { actionCreators };

// Default Reducer Export
export default reducer;
