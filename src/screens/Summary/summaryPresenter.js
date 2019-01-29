import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

import { InfoBox, PoweredBy } from '../../components/commons';

const Summary = (props) => {
  console.log(props);

  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.headerStyle}>
          <Text>Top 5 Liked Companies</Text>
        </View>
      </InfoBox>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <Text>List goes here</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    padding: 15
  },
  scrollStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Summary;
