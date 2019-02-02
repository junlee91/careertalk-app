import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import CompanyItem from '../../components/CompanyItem';
import { InfoBox, ProfileImage, PoweredBy } from '../../components/commons';

const Profile = (props) => {
  const { filteredEmployers, isFavoritePresent, firstName, lastName, profilePhoto } = props;
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : 'Anonymous User';

  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.userInfoStyle}>
          <ProfileImage profilePhoto={profilePhoto} />
          <Text style={styles.textField}>{displayName}</Text>
        </View>
      </InfoBox>
      <ScrollView>
        {isFavoritePresent ? (
          <InfoBox>
            {filteredEmployers.map((fairMap) => {
              if (fairMap.employersList.length) {
                return (
                  <FairsList
                    key={fairMap.fair.id}
                    employers={fairMap.employersList}
                    fair={fairMap.fair}
                  />
                );
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
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

const FairsList = (props) => {
  const { fair, employers } = props;
  return (
    <View>
      <Text style={styles.fairNameText}>{fair.name}</Text>
      <Divider />
      <View style={{ flex: 1 }}>
        <ScrollView>
          {employers.map(c => (
            <CompanyItem key={c.id} id={c.id} company={c} likeButton={false} noteIcon showLabel />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
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
