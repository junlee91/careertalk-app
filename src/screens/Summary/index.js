import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Actions } from 'react-native-router-flux';

class SummaryPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Summary Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SummaryPage;
