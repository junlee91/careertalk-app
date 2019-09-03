import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

import CompanyItem from '../../components/CompanyItem';
import { InfoBox, PoweredBy, Spinner, NoAccessTop5Text } from '../../components/commons';

const Summary = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Top 5 Liked Companies</Text>
        </View>
      </InfoBox>
      {/* <ScrollView>
        <InfoBox>
          {props.loading ? <Spinner size="large" /> : <ScrollViewContent {...props} />}
        </InfoBox>
      </ScrollView> */}
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

const ScrollViewContent = (props) => {
  const { topList } = props;

  return props.anonUser ? (
    <NoAccessTop5Text />
  ) : (
    <View style={styles.contentStyle}>
      {topList.filteredEmpls
        && topList.filteredEmpls.map(c => (
          <CompanyItem
            key={c.employer.id}
            id={c.employer.id}
            company={c}
            likeButton={false}
            showLabel={false}
            noteIcon={false}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
