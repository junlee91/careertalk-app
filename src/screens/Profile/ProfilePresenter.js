import React from 'react';
import { SafeAreaView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';

import {
  InfoBox,
  ProfileImage,
  PoweredBy,
  NoAccessText,
  LogoutActionSheet
} from '../../components/commons';
import styles from './styles';

const Profile = ({ fullName, profileUrl, getMeLoading }) => {
  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.userInfoStyle}>
          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
            {getMeLoading  ? (
              <ActivityIndicator />
            ) : (
              <>
                <ProfileImage profilePhoto={profileUrl} />
                <Text style={styles.textField}>{fullName}</Text>
              </>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <LogoutActionSheet onPressLogOut={() => console.log('log out press')} />
          </View>
        </View>
      </InfoBox>
      {/* <ScrollView>
        {anonUser ? (
          <InfoBox>
            <NoAccessText />
          </InfoBox>
        ) : (
          <FavoriteList {...props} />
        )}
      </ScrollView> */}
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

export default Profile;
