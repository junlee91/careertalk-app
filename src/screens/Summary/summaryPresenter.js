import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import EmployerCard from '../../components/EmployerCard';
import { InfoBox, PoweredBy, Spinner, NoAccessTop5Text } from '../../components/commons';

const Summary = ({ topList, socialProvider, onRefresh, refreshing }) => {
  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Top 5 Liked Companies</Text>
        </View>
      </InfoBox>
      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
        <InfoBox>
          {socialProvider !== 'google' ? (
            <NoAccessTop5Text />
          ) : (
            <ScrollViewContent topList={topList} />
          )}
        </InfoBox>
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

const ScrollViewContent = ({ topList }) => {
  return !topList ? (
    <Spinner size="large" />
  ) : (
    <View style={styles.contentStyle}>
      {topList
        && topList.map(c => (
          <EmployerCard
            {...c}
            key={c.employer.id}
            showLike={false}
            showNote={false}
            showLabel={false}
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
