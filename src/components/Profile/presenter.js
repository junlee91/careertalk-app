import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import CompanyItem from '../CompanyItem';
import { InfoBox, ProfileImage } from '../commons';

const Profile = (props) => {
  const { filteredFairs, isFavoritePresent } = props;

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <InfoBox>
        <View style={styles.userInfoStyle}>
          <ProfileImage />
          <Text style={styles.textField}>Anonymous User</Text>
        </View>
      </InfoBox>
      <ScrollView>
        {isFavoritePresent ? (
          <InfoBox>
            {filteredFairs
              && filteredFairs.map((fair, index) => {
                if (fair.length) {
                  return <FairsList key={index} fair={fair} />;
                }
                return null;
              })}
          </InfoBox>
        ) : (
          <View>
            <InfoBox>
              <Text style={styles.textField}>Add companies to your list!</Text>
            </InfoBox>
          </View>
        )}
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
      <View style={{ flex: 1 }}>
        <ScrollView>
          {fair.map(company => (
            <CompanyItem key={company.id} company={company} likeButton={false} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoStyle: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  textField: {
    marginHorizontal: 15,
    fontFamily: 'Avenir Next'
  },
  fairNameText: {
    fontSize: 17,
    padding: 5
  }
});

export default Profile;
