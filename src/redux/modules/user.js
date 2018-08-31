// Imports
import company from './company2.json';

// Actions
const SET_COMPANY = 'SET_COMPANY';
const SET_FAIRS = 'SET_FAIRS';

// Action Creators
function setCompanyList(company) {
  return {
    type: SET_COMPANY,
    company
  };
}

function setFairs(fairs) {
  return {
    type: SET_FAIRS,
    fairs
  };
}

// API Actions
function getCompanyList(fair_id) {
  console.log(fair_id);
  return (dispatch) => {
    return fetch(`https://enigmatic-shore-88931.herokuapp.com/${fair_id}/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(setCompanyList(json)));
  };
}

function getFairs() {
  return (dispatch) => {
    return fetch('https://enigmatic-shore-88931.herokuapp.com/careerfairs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(setFairs(json)));
  };
}

// Initial State
const initialState = {
  isLoggedIn: true // set TRUE for development
};

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANY:
      return applySetCompany(state, action);
    case SET_FAIRS:
      return applySetFairs(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applySetCompany(state, action) {
  const { company } = action;

  return {
    ...state,
    company
  };
}

function applySetFairs(state, action) {
  const { fairs } = action;

  return {
    ...state,
    fairs
  };
}

// Exports
const actionCreators = {
  getCompanyList,
  getFairs,
};

export { actionCreators };

// Default Reducer Export
export default reducer;
