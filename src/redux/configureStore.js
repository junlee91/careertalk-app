import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // save store on disk
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import auth from './modules/auth';
import user from './modules/user';
import company from './modules/company';

const middlewares = [thunk, logger];

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(persistConfig, {
  auth,
  user,
  company,
});

const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  // persistor.purge();
  return { store, persistor };
};

export default configureStore;
