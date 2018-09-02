import React from 'react';
import { View, Text } from 'react-native';

import { InfoBox } from '../commons';

const Profile = (props) => {
  const { filteredFairs } = props;

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <InfoBox>
        <Text>This is Profile</Text>
      </InfoBox>
      <InfoBox>
        {filteredFairs && filteredFairs.map((fair, index) => <FairsList key={index} fair={fair} />)}
      </InfoBox>
    </View>
  );
};

const FairsList = (props) => {
  const { fair } = props;
  return (
    <View>
      <Text>{fair[0].fair}</Text>
      {fair.map(company => (
        <CompanyItem key={company.id} {...company} />
      ))}
    </View>
  );
};

const CompanyItem = (props) => {
  return <Text>{props.name}</Text>;
};

export default Profile;
