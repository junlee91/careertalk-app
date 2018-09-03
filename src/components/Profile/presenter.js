import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import CompanyItem from '../CompanyItem';
import { InfoBox } from '../commons';

const Profile = (props) => {
  const { filteredFairs } = props;

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <InfoBox>
        <Text>Profile Image</Text>
        <Text>This is Profile</Text>
      </InfoBox>
      <ScrollView>
        <InfoBox>
          {filteredFairs
            && filteredFairs.map((fair, index) => <FairsList key={index} fair={fair} />)}
        </InfoBox>
      </ScrollView>
    </View>
  );
};

const FairsList = (props) => {
  const { fair } = props;
  return (
    <View>
      <Text style={styles.fairNameText}>{fair[0].fair}</Text>
      <Divider />
      <ScrollView>
        {fair.map(company => (
          <CompanyItem key={company.id} company={company} likeButton={false} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fairNameText: {
    fontSize: 17,
    padding: 5
  }
});

export default Profile;
