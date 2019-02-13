// Imports

// Actions
const SET_USER = 'SET_USER';
const GET_USER = 'GET_USER';

// Action Creators
function setUser(userData) {
  return {
    type: SET_USER,
    userData
  };
}

// API Actions

// Initial State
const initialState = {
  firstName: '',
  lastName: '',
  profilePhoto: ''
};

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return applySetUser(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applySetUser(state, action) {
  const { userData } = action;

  if (userData) {
    const { firstName, lastName, profilePhoto } = userData;
    return {
      firstName,
      lastName,
      profilePhoto
    };
  }

  return { state };
}

// Exports
const actionCreators = {
  setUser
};

export { actionCreators };

// Default Reducer Export
export default reducer;
