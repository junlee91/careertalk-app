// Imports
import sample from '../../lib/sample.json';

// Actions
const SET_COMPANY = 'SET_COMPANY';
const SET_FAIRS = 'SET_FAIRS';
const SET_LIKE = 'SET_LIKE';
const SET_UNLIKE = 'SET_UNLIKE';
const SET_NOTE = 'SET_NOTE';
const POP_NOTE = 'POP_NOTE';

// Action Creators
function setCompanyList(company) {
  return {
    type: SET_COMPANY,
    company,
  };
}

function setFairs(fairs) {
  return {
    type: SET_FAIRS,
    fairs,
  };
}

function setLikeCompany(cmpId) {
  return {
    type: SET_LIKE,
    cmpId,
  };
}

function setUnlikeCompany(cmpId) {
  return {
    type: SET_UNLIKE,
    cmpId,
  };
}

function setNoteCompany(cmpId, note) {
  return {
    type: SET_NOTE,
    cmpId,
    note,
  };
}

function popNoteCompany(cmpId) {
  return {
    type: POP_NOTE,
    cmpId,
  };
}

// API Actions
function getCompanyList(fair_id) {
  return (dispatch) => {
    return fetch(`https://reactcareertalk.herokuapp.com/${fair_id}/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => dispatch(setCompanyList(json)));
  };
}

function demoGetCompany() {
  return (dispatch) => {
    return dispatch(setCompanyList(sample));
  };
}

function getFairs() {
  return (dispatch) => {
    return fetch('https://reactcareertalk.herokuapp.com/careerfairs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => dispatch(setFairs(json)));
  };
}

// TODO: This is not needed for V2 (when we have Like DB)
function likeCompany(cmpId) {
  return (dispatch) => {
    return dispatch(setLikeCompany(cmpId));
  };
}

function unlikeCompany(cmpId) {
  return (dispatch) => {
    return dispatch(setUnlikeCompany(cmpId));
  };
}

function setNote(cmpId, note) {
  return (dispatch) => {
    return dispatch(setNoteCompany(cmpId, note));
  };
}

function popNote(cmpId) {
  return (dispatch) => {
    return dispatch(popNoteCompany(cmpId));
  };
}

// Initial State
const initialState = {
  favorites: [],
  notes: {},
};

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANY:
      return applySetCompany(state, action);
    case SET_FAIRS:
      return applySetFairs(state, action);
    case SET_LIKE:
      return applyLikeCompany(state, action);
    case SET_UNLIKE:
      return applyUnlikeCompany(state, action);
    case SET_NOTE:
      return applySetNoteCompany(state, action);
    case POP_NOTE:
      return applyPopNoteCompany(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applySetCompany(state, action) {
  const { company } = action;

  return {
    ...state,
    company,
  };
}

function applySetFairs(state, action) {
  const { fairs } = action;

  return {
    ...state,
    fairs,
  };
}

function applyLikeCompany(state, action) {
  const { cmpId } = action;
  console.log(`Like company: ${cmpId}`);
  return {
    ...state,
    favorites: [...state.favorites, cmpId],
  };
}

function applyUnlikeCompany(state, action) {
  const { cmpId } = action;
  console.log(`Unlike company: ${cmpId}`);
  return {
    ...state,
    favorites: state.favorites.filter(item => item !== cmpId),
  };
}

// we have to return a new object in order to detect a state change
function applySetNoteCompany(state, action) {
  const { cmpId, note } = action;
  state.notes[cmpId] = note;
  const newNotes = state.notes;
  return {
    ...state,
    notes: Object.assign({}, newNotes),
  };
}

function applyPopNoteCompany(state, action) {
  const { cmpId } = action;
  delete state.notes[cmpId];
  const newNotes = state.notes;
  return {
    ...state,
    notes: Object.assign({}, newNotes),
  };
}

// Exports
const actionCreators = {
  getCompanyList,
  demoGetCompany,
  getFairs,
  likeCompany,
  unlikeCompany,
  setNote,
  popNote,
};

export { actionCreators };

// Default Reducer Export
export default reducer;
