import React from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

import { LogoImage } from '../commons';

const FairItem = (props) => {
  fair = { company_url: props.company_url || 'uic.edu' };

  return (
    <>
      {Platform.OS === 'ios' ? (
        <View style={styles.bigCard}>
          <TouchableOpacity onPress={() => { props.navigateTo(props.fair.id); }}>
            <LogoImage {...fair} size="big" wide />
          </TouchableOpacity>
          <NumOfCompanies {...props} />
          <FairHeader {...props} />
        </View>
      ) : (
        <Surface style={[stylesAndroid.surface, { elevation: 6 }]}>
          <TouchableOpacity onPress={() => { props.navigateTo(props.fair.id); }}>
            <LogoImage {...fair} size="big" wide />
          </TouchableOpacity>
          <NumOfCompanies {...props} />
          <FairHeader {...props} />
        </Surface>
      )}
    </>
  );
};

const NumOfCompanies = (props) => {
  const { fair } = props;
  return (
    <View style={styles.numOfCompaniesView}>
      <Text style={styles.numOfCompaniesText}>{fair.num_of_employers}</Text>
      <Text style={styles.numOfcompaniesSmallText}> Employers</Text>
    </View>
  );
};

const FairHeader = (props) => {
  const { fair } = props;
  const fairDate = new Date(fair.date).toDateString();
  const timeString = `${fair.start_time} - ${fair.end_time}`;
  const dateString = `${fairDate} ${timeString}`;

  return (
    <TouchableOpacity onPress={() => { props.navigateTo(fair.id); }}>
      <Text style={styles.fairHeaderText}>{fair.name}</Text>
      <Text style={styles.fairInfo}>{dateString}</Text>
      <Text style={styles.fairInfo}>{fair.location}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  bigCard: {
    backgroundColor: 'white',
    padding: 25,
    margin: 30,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#79818e',
    shadowOpacity: 1.0
  },
  fairHeaderText: {
    paddingTop: 20,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Avenir Next'
  },
  fairInfo: {
    color: '#48638c',
    fontSize: 13,
    paddingTop: 5,
    fontFamily: 'Avenir Next'
  },
  numOfCompaniesText: {
    fontSize: 17,
    color: '#3f7c55',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Avenir Next'
  },
  numOfcompaniesSmallText: {
    fontSize: 13,
    color: 'grey',
    fontFamily: 'Avenir Next',
    marginTop: 2
  },
  numOfCompaniesView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const stylesAndroid = StyleSheet.create({
  surface: {
    backgroundColor: 'white',
    padding: 25,
    margin: 30
  }
});

export default FairItem;
