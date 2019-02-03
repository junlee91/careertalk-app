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
const LOGOUT_CLEAN = 'LOGOUT_CLEAN';

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

function setLikeCompany(cmpId, fairId) {
  return {
    type: SET_LIKE,
    cmpId,
    fairId
  };
}

function setUnlikeCompany(cmpId, fairId) {
  return {
    type: SET_UNLIKE,
    cmpId,
    fairId
  };
}

function setNoteCompany(cmpId, fairId, note) {
  return {
    type: SET_NOTE,
    cmpId,
    fairId,
    note
  };
}

function popNoteCompany(cmpId, fairId) {
  return {
    type: POP_NOTE,
    cmpId,
    fairId
  };
}

function setCurrentFair(fairId) {
  return {
    type: SET_CURRENT_FAIR,
    fairId
  };
}

function logoutClean() {
  return {
    type: LOGOUT_CLEAN
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
    const {
      auth: { token }
    } = getState();

    if (token) {
      return fetch(`${config.API_URL}/v2/${fairId}/employers`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => dispatch(setCompanyList(fairId, json)));
    }

    return fetch(`${config.API_URL}/v2/${fairId}/anon_user/employers`, {
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
    const {
      auth: { token }
    } = getState();

    const result = await likeOrUnlikeAPI(cmpId, fairId, token, dispatch);

    if (result) {
      dispatch(setLikeCompany(cmpId, fairId));
    }

    return result;
  };
}

function unlikeCompany(cmpId, fairId) {
  return async (dispatch, getState) => {
    const {
      auth: { token }
    } = getState();

    const result = await likeOrUnlikeAPI(cmpId, fairId, token, dispatch);

    if (result) {
      dispatch(setUnlikeCompany(cmpId, fairId));
    }

    return result;
  };
}

function setNote(cmpId, fairId, note) {
  return (dispatch) => {
    return dispatch(setNoteCompany(cmpId, fairId, note));
  };
}

function popNote(cmpId, fairId) {
  return (dispatch) => {
    return dispatch(popNoteCompany(cmpId, fairId));
  };
}

// Initial State
const initialState = {
  favorites: {},
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
    case LOGOUT_CLEAN:
      return applySetLogoutClean(state, action);
    default:
      return state;
  }
}

// Reducer Functions
// TODO: We need to refactor this!!!
function applySetCompany(state, action) {
  const {
    fairId,
    company: { companies }
  } = action;
  state.employers[fairId] = companies;
  const newEmployers = state.employers;
  const currentFavs = [];

  companies.forEach((c) => {
    if (c.is_liked) {
      currentFavs.push(c.employer.id);
    }
  });

  state.favorites[fairId] = currentFavs;
  const downloadedFavs = state.favorites;

  return {
    ...state,
    employers: Object.assign({}, newEmployers),
    favorites: downloadedFavs
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
  const { cmpId, fairId } = action;
  const originalFavs = state.favorites[fairId];

  state.favorites[fairId] = [...originalFavs, cmpId];
  const newFavs = state.favorites;

  return {
    ...state,
    favorites: Object.assign({}, newFavs)
  };
}

function applyUnlikeCompany(state, action) {
  const { cmpId, fairId } = action;
  const originalFavs = state.favorites[fairId];

  state.favorites[fairId] = originalFavs.filter(item => item !== cmpId);
  const newFavs = state.favorites;

  return {
    ...state,
    favorites: Object.assign({}, newFavs)
  };
}

// we have to return a new object in order to detect a state change
function applySetNoteCompany(state, action) {
  const { cmpId, fairId, note } = action;

  // get current notes to update or set empty object
  const curNotes = state.notes[fairId] || {};

  // store note for the companyId
  curNotes[cmpId] = note;

  // update the notes for the fairId
  state.notes[fairId] = curNotes;

  return {
    ...state,
    notes: Object.assign({}, state.notes)
  };
}

function applyPopNoteCompany(state, action) {
  const { cmpId, fairId } = action;

  const curNotes = state.notes[fairId];

  if (curNotes) {
    delete curNotes[cmpId];

    const newNotes = state.notes;

    return {
      ...state,
      notes: Object.assign({}, newNotes)
    };
  }

  return { state };
}

function applySetCurrentFair(state, action) {
  const { fairId } = action;

  return {
    ...state,
    currentFair: fairId
  };
}

function applySetLogoutClean(state) {
  return {
    ...state,
    favorites: [],
    employers: {}
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
  setCurrentFair,
  logoutClean
};

export { actionCreators };

// Default Reducer Export
export default reducer;
