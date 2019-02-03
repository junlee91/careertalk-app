// Imports
import config from '../../../config.json';
import { actionCreators as authActions } from './auth';

// Actions
const SET_COMPANY = 'SET_COMPANY';
const SET_FAIRS = 'SET_FAIRS';
const SET_LIKE = 'SET_LIKE';
const SET_UNLIKE = 'SET_UNLIKE';
const SET_NOTE = 'SET_NOTE';
const POP_NOTE = 'POP_NOTE';
const SET_CURRENT_FAIR = 'SET_CURRENT_FAIR';

// Action Creators
function setCompanyList(fairId, company) {
  return {
    type: SET_COMPANY,
    fairId,
    company
  };
}

function setFairs(fairs) {
  return {
    type: SET_FAIRS,
    fairs
  };
}

function setLikeCompany(cmpId) {
  return {
    type: SET_LIKE,
    cmpId
  };
}

function setUnlikeCompany(cmpId) {
  return {
    type: SET_UNLIKE,
    cmpId
  };
}

function setNoteCompany(cmpId, note) {
  return {
    type: SET_NOTE,
    cmpId,
    note
  };
}

function popNoteCompany(cmpId) {
  return {
    type: POP_NOTE,
    cmpId
  };
}

function setCurrentFair(fairId) {
  return {
    type: SET_CURRENT_FAIR,
    fairId
  };
}

// API Actions
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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(setCompanyList(fairId, json)));
  };
}

function likeOrUnlikeAPI(cmpId, fairId, token, dispatch) {
  return fetch(`${config.API_URL}/v2/like/${fairId}/${cmpId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status === 401) {
        // Normally we should logout, but not for now.
        // dispatch(authActions.logout());
        return false;
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      return json;
    });
}

function likeCompany(cmpId, fairId) {
  return async (dispatch, getState) => {
    const { auth: { token } } = getState();

    const result = await likeOrUnlikeAPI(cmpId, fairId, token, dispatch);

    if (result) {
      dispatch(setLikeCompany(cmpId));
    }

    return result;
  };
}

function unlikeCompany(cmpId, fairId) {
  return async (dispatch, getState) => {
    const { auth: { token } } = getState();

    const result = await likeOrUnlikeAPI(cmpId, fairId, token);

    if (result) {
      dispatch(setUnlikeCompany(cmpId));
    }

    return result;
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
  employers: {}
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
    case SET_CURRENT_FAIR:
      return applySetCurrentFair(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applySetCompany(state, action) {
  const {
    fairId,
    company: { companies }
  } = action;
  state.employers[fairId] = companies;
  const newEmployers = state.employers;

  return {
    ...state,
    employers: Object.assign({}, newEmployers)
  };
}

function applySetFairs(state, action) {
  const { fairs } = action;

  return {
    ...state,
    fairs
  };
}

function applyLikeCompany(state, action) {
  const { cmpId } = action;
  return {
    ...state,
    favorites: [...state.favorites, cmpId]
  };
}

function applyUnlikeCompany(state, action) {
  const { cmpId } = action;
  return {
    ...state,
    favorites: state.favorites.filter(item => item !== cmpId)
  };
}

// we have to return a new object in order to detect a state change
function applySetNoteCompany(state, action) {
  const { cmpId, note } = action;
  state.notes[cmpId] = note;
  const newNotes = state.notes;
  return {
    ...state,
    notes: Object.assign({}, newNotes)
  };
}

function applyPopNoteCompany(state, action) {
  const { cmpId } = action;
  delete state.notes[cmpId];
  const newNotes = state.notes;
  return {
    ...state,
    notes: Object.assign({}, newNotes)
  };
}

function applySetCurrentFair(state, action) {
  const { fairId } = action;

  return {
    ...state,
    currentFair: fairId
  };
}

// Exports
const actionCreators = {
  v2_getFairs,
  v2_getEmployers,
  likeCompany,
  unlikeCompany,
  setNote,
  popNote,
  setCurrentFair
};

export { actionCreators };

// Default Reducer Export
export default reducer;
