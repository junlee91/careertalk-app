import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import CompanyItem from '../CompanyItem';
import { InfoBox, ProfileImage } from '../commons';

const Profile = (props) => {
  const { filteredFairs } = props;

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <InfoBox>
        <View style={styles.userInfoStyle}>
          <ProfileImage />
          <Text style={styles.userNameField}>Anonymous User</Text>
        </View>
      </InfoBox>
      <ScrollView>
        <InfoBox>
          {filteredFairs
            && filteredFairs.map((fair, index) => {
              if (fair.length) {
                return <FairsList key={index} fair={fair} />;
              }
              return null;
            })}
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
  userInfoStyle: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  userNameField: {
    marginHorizontal: 15
  },
  fairNameText: {
    fontSize: 17,
    padding: 5
  }
});

export default Profile;
