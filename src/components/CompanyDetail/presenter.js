import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { LogoImage, InfoBox } from '../commons';

const CompanyDetail = (props) => {
  const { companyInfo, date } = props;

  return (
    <View style={styles.container}>
      <InfoBox>
        <View style={styles.titleContent}>
          <LogoImage {...companyInfo} size="medium" />
          <Text style={styles.titleTextStyle}>{companyInfo.name}</Text>
        </View>
      </InfoBox>
      <InfoBox>
        <EventInfo {...companyInfo} date={date} />
      </InfoBox>
      <InfoBox>
        <DetailInfo />
      </InfoBox>
      <InfoBox>
        <Text>Actions</Text>
      </InfoBox>
    </View>
  );
};

const EventInfo = (props) => {
  const eventDate = `${props.date.month}/${props.date.day}/${props.date.year}`;
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Icon name="calendar" type="entypo" />
        <Text style={{ marginLeft: 20, letterSpacing: 1 }}>{eventDate}</Text>
      </View>
      <Text style={{ padding: 2 }}>{props.fair}</Text>
    </View>
  );
};

const DetailInfo = () => {
  return (
    <View>
      <Text>Detail Info.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  titleContent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center'
  },
  titleTextStyle: {
    padding: 5,
    height: 30,
    fontSize: 20,
    fontFamily: 'Avenir Next'
  }
});

export default CompanyDetail;
