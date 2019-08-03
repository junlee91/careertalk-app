import React, { useEffect, useState } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import { ApolloProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';

import CareerTalk from './src/CareerTalk';
import apolloOptions from './Apollo';

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
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage // TODO: this is deprecated
      });
      const client = new ApolloClient({
        cache,
        ...apolloOptions
      });
      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
    SplashScreen.hide();
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <CareerTalk />
      </PaperProvider>
    </ApolloProvider>
  ) : (
    <View
      style={{
        minHeight: 500,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Text>Loading...</Text>
    </View>
  );
};
