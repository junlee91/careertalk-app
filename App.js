import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';

import configureStore from './src/redux/configureStore';
import AppContainer from './src/AppContainer';

const { persistor, store } = configureStore();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#b3bec6',
    accent: '#f1c40f',
  },
};

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <AppContainer />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
