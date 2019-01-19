import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class LoginPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => Actions.reset('fairs')} title="Login" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});


export default LoginPage;
