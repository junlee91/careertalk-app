import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

import CompanyItem from '../../components/CompanyItem';
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
      <ScrollView>
        {props.company
          && props.company.map(c => (
            <CompanyItem key={c.id} id={c.id} company={c} noteIcon={false} likeButton={false} />
          ))}
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
  }
});

export default Summary;
