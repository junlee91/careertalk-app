import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

import CompanyItem from '../../components/CompanyItem';
import { InfoBox, PoweredBy, Spinner, NoAccessText } from '../../components/commons';

const Summary = (props) => {
  console.log(props);

  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Top 5 Liked Companies</Text>
        </View>
      </InfoBox>
      <ScrollView>
        <InfoBox>
          {props.loading ? <Spinner size="large" /> : <ScrollViewContent {...props} />}
        </InfoBox>
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

const ScrollViewContent = (props) => {
  return props.anonUser ? (
    <NoAccessText />
  ) : (
    <View style={styles.contentStyle}>
      {props.company
        && props.company.map(c => (
          <CompanyItem id={c.id} company={c} noteIcon={false} likeButton={false} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerStyle: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Avenir Next'
  },
  contentStyle: {
    marginHorizontal: 10
  }
});

export default Summary;
