import React from 'react';
import { View, Text } from 'react-native';

const NoAccessText = () => (
  <View style={styles.noAccessContentStyle}>
    <Text style={styles.noAccessText}>
      You have no access to this page. Please login with social account to view this field.
    </Text>
  </View>
);

const NoAccessTop5Text = () => (
  <View style={styles.noAccessContentStyle}>
    <Text style={styles.noAccessText}>
      Log in and check where your friends want to work for!
    </Text>
  </View>
);

const styles = {
  noAccessContentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginHorizontal: 50
  },
  noAccessText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Avenir Next'
  }
};

export { NoAccessText, NoAccessTop5Text };
