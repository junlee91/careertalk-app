import React from 'react';
import {
  View, Text, StyleSheet, StatusBar
} from 'react-native';

class AppContainer extends React.Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        {isLoggedIn ? <Text>Hello World!</Text> : <Text>No Login yet!</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default AppContainer;
