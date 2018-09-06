import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { LogoImage } from '../commons';

function getMonthName(month) {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'Fabruary';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    default:
      return 'December';
  }
}

function getTimeString(time) {
  let hour = Math.floor(time/60);
  const minutes = time % 60;
  let suffix = 'AM';
  let minString;
  if (hour >= 12) {
    if (hour > 12) {
      hour -= 12;
    }
    suffix = 'PM';
  }
  if (minutes < 10) {
    minString = `0${minutes.toString()}`;
  } else {
    minString = minutes.toString();
  }
  const timeString = `${hour.toString()}:${minString}${suffix}`;
  return timeString;
}

const FairItem = (props) => {
  fair = { company_url: 'uic.edu' };
  return (
    <TouchableOpacity onPress={() => props.navigateTo('companyList', props.fair.id)}>
      <View style={styles.bigCard}>
        <LogoImage {...fair} size="big" />
        <NumOfCompanies {...props} />
        <FairHeader {...props} />
      </View>
    </TouchableOpacity>
  );
};

const NumOfCompanies = (props) => {
  const { fair } = props;
  const numOfCompanies = fair.companies.length;
  return (
    <View style={styles.numOfCompaniesView}>
      <Text style={styles.numOfCompaniesText}>{numOfCompanies}</Text>
      <Text style={styles.numOfcompaniesSmallText}>  Employers</Text>
    </View>
  );
};

const FairHeader = (props) => {
  const { fair } = props;
  const month = getMonthName(fair.date.month);
  const startTime = getTimeString(fair.start_time_min);
  const endTime = getTimeString(fair.end_time);
  const timeString = `${startTime} - ${endTime}`;
  const dateString = `${month} ${fair.date.day}, ${fair.date.year} ${timeString}`;
  return (
    <View>
      <Text style={styles.fairHeaderText}>{fair.name}</Text>
      <Text style={styles.fairInfo}>{dateString}</Text>
      <Text style={styles.fairInfo}>{fair.location}</Text>
    </View>
  );
};

const styles = {
  bigCard: {
    backgroundColor: 'white',
    padding: 25,
    margin: 30,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#79818e',
    shadowOpacity: 1.0,
  },
  fairHeaderText: {
    paddingTop: 20,
    fontSize: 17,
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
    fontFamily: 'Avenir Next',
  },
  numOfcompaniesSmallText: {
    fontSize: 13,
    color: 'grey',
    fontFamily: 'Avenir Next',
    marginTop: 2,
  },
  numOfCompaniesView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
};

export default FairItem;
