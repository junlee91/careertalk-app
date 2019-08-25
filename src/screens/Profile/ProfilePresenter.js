import React from 'react';
import { SafeAreaView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Divider, Button } from 'react-native-elements';

import {
  InfoBox,
  ProfileImage,
  PoweredBy,
  NoAccessText,
  LogoutActionSheet
} from '../../components/commons';
import EmployerCard from '../../components/EmployerCard';
import styles from './styles';

const Profile = ({
  fullName,
  profileUrl,
  getMeLoading,
  logOutPressed,
  socialProvider,
  favoriteLoading,
  favoriteList,
  isFavoritePresent,
  refresh
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <InfoBox>
        <View style={styles.userInfoStyle}>
          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
            {getMeLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                <ProfileImage profilePhoto={profileUrl} />
                <Text style={styles.textField}>{fullName}</Text>
              </>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <LogoutActionSheet onPressLogOut={logOutPressed} />
          </View>
        </View>
      </InfoBox>
      <ScrollView>
        {socialProvider === null ? (
          <InfoBox>
            <NoAccessText />
          </InfoBox>
        ) : (
          <FavoriteListLayer
            isFavoritePresent={isFavoritePresent}
            favoriteLoading={favoriteLoading}
            favoriteList={favoriteList}
          />
        )}
      </ScrollView>
      {socialProvider && <Button title="Refresh" onPress={refresh} />}
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

const FavoriteListLayer = ({ isFavoritePresent, favoriteLoading, favoriteList }) => (
  <>
    {favoriteLoading ? (
      <InfoBox>
        <ActivityIndicator size="large" />
      </InfoBox>
    ) : (
      <FavoriteList favoriteList={favoriteList} isFavoritePresent={isFavoritePresent} />
    )}
  </>
);

const FavoriteList = ({ isFavoritePresent, favoriteList }) => {
  return (
    <>
      {isFavoritePresent && favoriteList ? (
        <InfoBox>
          {favoriteList.map(({ careerfair, liked_employers }) => (
            <FairsList key={careerfair.id} employers={liked_employers} fair={careerfair} />
          ))}
        </InfoBox>
      ) : (
        <InfoBox>
          <View style={{ minHeight: 600, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textField}>Add companies to your list!</Text>
          </View>
        </InfoBox>
      )}
    </>
  );
};

const FairsList = props => {
  const { fair, employers } = props;
  return (
    <View>
      {fair && <Text style={styles.fairNameText}>{fair.name}</Text>}
      <Divider />
      <View style={{ flex: 1 }}>
        <ScrollView>
          {employers.map(c => (
            <EmployerCard {...c} key={c.employer.id} showLike={false} showNote showLabel />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;
