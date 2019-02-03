import { AsyncStorage } from 'react-native';
import { actionCreators as userActions } from './user';
import config from '../../../config.json';

// More info: https://facebook.github.io/react-native/docs/asyncstorage
_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
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
  { idToken },
  socialProvider
) {
  return (dispatch) => {
    return fetch(`${config.API_URL}/glogin`, {
      method: 'POST',
      headers: {
        Authorization: idToken,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const { headers: { map } } = response;

        if (map.usertoken) {
          dispatch(setLogIn(map.usertoken));
          dispatch(setProvider(socialProvider));
        }
        return response.json();
      })
      .then((json) => {
        const { user } = json;
        const { first_name, last_name, profile_url } = user;

        dispatch(
          userActions.setUser({
            firstName: first_name,
            lastName: last_name,
            profilePhoto: profile_url
          })
        );
      })
      .catch(error => alert('Something mysterious.. Please login with default.'));
  };
}

// Initial State
const initialState = {
  isLoggedIn: false,
  socialProvider: undefined
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
    token: null,
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
  logout
};

export { actionCreators };

// Default Reducer Export
export default reducer;
