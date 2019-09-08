import React from 'react';
import { View, Text } from 'react-native';

const NoAccessText = () => (
  <View style={styles.noAccessContentStyle}>
    <Text style={styles.noAccessText}>Please sign in with google to view this field.</Text>
    <Text style={styles.noAccessText}>
      Click on the Sign out button on the top right, and click on the google sign in button.
    </Text>
    <Text style={styles.noAccessText}>
      You can like companies, take notes, and be more efficient during the career fair!
    </Text>
  </View>
);

const NoAccessTop5Text = () => (
  <View style={styles.noAccessContentStyle}>
    <Text style={styles.noAccessText}>Log in and check where your friends want to work for!</Text>
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
    fontFamily: 'Avenir Next',
    marginTop: 10
  }
};

export { NoAccessText, NoAccessTop5Text };
