import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';

import { GET_SOCIAL_PROVIDER, LOCAL_LOG_OUT, ME } from '../../Apollo/sharedQueries';
import Profile from './ProfilePresenter';

const ProfileContainer = ({ setIsLoggedInState }) => {
  const client = useApolloClient();
  const [fullName, setFullName] = useState('Anonymous User');
  const [profileUrl, setProfileUrl] = useState(null);

  const [localLogoutMutation] = useMutation(LOCAL_LOG_OUT);
  const { data: { socialProvider } } = useQuery(GET_SOCIAL_PROVIDER);
  const { data: getMe, loading: getMeLoading } = useQuery(ME, {
    skip: !socialProvider,
  });

  useEffect(() => {
    if (!getMeLoading && getMe) {
      const { me: { full_name, profile_url } } = getMe;
      setFullName(full_name);
      setProfileUrl(profile_url);
    }
  }, [getMeLoading]);

  logOutPressed = async () => {
    if (socialProvider === 'google') {
      try {
        // Finish Google Session
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (error) {
        console.error(error);
      }
    }
    // Clear auth state
    await localLogoutMutation();
    setIsLoggedInState(false);
    client.resetStore();
  }

  return (
    <Profile
      fullName={fullName}
      profileUrl={profileUrl}
      getMeLoading={getMeLoading}
      logOutPressed={logOutPressed}
    />
  );
};

export default ProfileContainer;
