// Imports
import company from './company.json';

// Actions
const SET_COMPANY = 'SET_COMPANY';

// Action Creators
function setCompanyList(company) {
  return {
    type: SET_COMPANY,
    company
  };
}

// API Actions
function getCompanyList() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setCompanyList(company));
    }, 1500); // wait 1.5 seconds for fetching the data
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

// Exports
const actionCreators = {
  getCompanyList,
};

export { actionCreators };

// Default Reducer Export
export default reducer;
