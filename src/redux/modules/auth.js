// Actions
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SET_USER = 'SET_USER';

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

// API Actions
function socialLogin(...userInfo) {
  return (dispatch) => {
    console.log(userInfo);

    const token = 'Career Talk Token';

    return dispatch(setLogIn(token));
  };
}

// Initial State
const initialState = {
  isLoggedIn: false
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return applyLogIn(state, action);
    case LOG_OUT:
      return applyLogOut(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applyLogIn(state, action) {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applyLogOut(state, action) {
  AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: ''
  };
}

// Exports

const actionCreators = {
  socialLogin
};

export { actionCreators };

// Default Reducer Export
export default reducer;
