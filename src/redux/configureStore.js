import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // save store on disk
import thunk from 'redux-thunk';

import auth from './modules/auth';
import user from './modules/user';

const middlewares = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(persistConfig, {
  auth,
  user,
});

const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  // persistor.purge();
  return { store, persistor };
};

export default configureStore;
