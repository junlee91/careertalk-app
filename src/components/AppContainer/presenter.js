import React from 'react';
import {
  View, Text, StyleSheet, StatusBar
} from 'react-native';
import LoggedOutNavigation from '../../navigations/LoggedOutNavigation';

class AppContainer extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        {isLoggedIn ? <Text>Hello World!</Text> : <LoggedOutNavigation />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

export default AppContainer;
