import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import CompanyItem from '../../components/CompanyItem';
import { InfoBox, ProfileImage, PoweredBy, NoAccessText, LogoutActionSheet } from '../../components/commons';

const Profile = (props) => {
  const { firstName, lastName, profilePhoto, anonUser } = props;
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : 'Anonymous User';

  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.userInfoStyle}>
          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
            <ProfileImage profilePhoto={profilePhoto} />
            <Text style={styles.textField}>{displayName}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <LogoutActionSheet onPressLogOut={props.logOutPressed} />
          </View>
        </View>
      </InfoBox>
      <ScrollView>
        {anonUser ? (
          <InfoBox>
            <NoAccessText />
          </InfoBox>
        ) : (
          <FavoriteList {...props} />
        )}
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

const FavoriteList = props => (
  <>
    {props.isFavoritePresent ? (
      <InfoBox>
        {props.filteredEmployers.map((fairMap, index) => {
          if (fairMap.employersList.length) {
            return (
              <FairsList
                key={index}
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
          <View style={{ minHeight: 600, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textField}>Add companies to your list!</Text>
          </View>
        </InfoBox>
      </View>
    )}
  </>
);

const FairsList = (props) => {
  const { fair, employers } = props;
  return (
    <View>
      <Text style={styles.fairNameText}>{fair.name}</Text>
      <Divider />
      <View style={{ flex: 1 }}>
        <ScrollView>
          {employers.map(c => (
            <CompanyItem
              key={c.employer.id}
              id={c.employer.id}
              company={c}
              likeButton={false}
              noteIcon
              showLabel
            />
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
