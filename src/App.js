import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';

import Router from './Router';
import configureStore from './redux/configureStore';

const { persistor, store } = configureStore();

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <Router />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
