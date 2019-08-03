import React, { useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import CareerTalk from './src/CareerTalk';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#b3bec6',
    accent: '#f1c40f'
  }
};

export default () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <PaperProvider theme={theme}>
      <CareerTalk />
    </PaperProvider>
  );
};
