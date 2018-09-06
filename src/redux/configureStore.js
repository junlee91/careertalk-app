import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // save store on disk
import thunk from 'redux-thunk';

import user from './modules/user';

const middlewares = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(persistConfig, {
  user,
});

const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
<<<<<<< 330a855d3ea55ceefb16f87aab6521f17737b27a
  //persistor.purge();
||||||| merged common ancestors
=======
  // persistor.purge();
>>>>>>> Added icons and splash icons.
  return { store, persistor };
};

export default configureStore;
