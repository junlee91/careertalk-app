import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
// import { Actions } from 'react-native-router-flux';

class SummaryPage extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Summary Page</Text>
      </SafeAreaView>
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
