import React from 'react';
import { View, Text } from 'react-native';

import { InfoBox } from '../commons';

const Profile = () => {
  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <InfoBox>
        <Text>This is Profile</Text>
      </InfoBox>
      <InfoBox>
        <Text>My List</Text>
      </InfoBox>
    </View>
  );
};

export default Profile;
