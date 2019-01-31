// Imports
import sample from '../../lib/sample.json';
import config from '../../../config.json';
import { actionCreators as authActions } from './auth';

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
// ------------------------------------------------------------------------------
//                                V1 Endpoints
// ------------------------------------------------------------------------------
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

// ------------------------------------------------------------------------------
//                                V2 Endpoints
// ------------------------------------------------------------------------------
function v2_getFairs() {
  return (dispatch, _) => {
    return fetch(`${config.API_URL}/v2/careerfairs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(setFairs(json)));
  };
}

function v2_getEmployers(fairId) {
  return (dispatch, getState) => {
    return fetch(`${config.API_URL}/v2/${fairId}/employers`, {
      headers: {
        Authorization: 'token'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(setCompanyList(fairId, json)));
  };
}

function likeCompany(cmpId) {
  return (dispatch) => {
    // TODO: API CALL
    return dispatch(setLikeCompany(cmpId));
  };
}

function unlikeCompany(cmpId) {
  return (dispatch) => {
    // TODO: API CALL
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
  fairs: {},
  employers: {},
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
  return {
    ...state,
    favorites: [...state.favorites, cmpId],
  };
}

function applyUnlikeCompany(state, action) {
  const { cmpId } = action;
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
  demoGetCompany,
  v2_getFairs,
  v2_getEmployers,
  likeCompany,
  unlikeCompany,
  setNote,
  popNote,
};

export { actionCreators };

// Default Reducer Export
export default reducer;
