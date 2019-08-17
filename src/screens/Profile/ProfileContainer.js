import React, { useState, useEffect } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';

import { GET_SOCIAL_PROVIDER, LOCAL_LOG_OUT, ME } from '../../Apollo/sharedQueries';
import { FAVORITE_EMPLOYERS } from './ProfileQueries';
import Profile from './ProfilePresenter';

const ProfileContainer = ({ setIsLoggedInState }) => {
  const client = useApolloClient();
  const [fullName, setFullName] = useState('Anonymous User');
  const [profileUrl, setProfileUrl] = useState(null);
  const [favoriteList, setFavoriteList] = useState(null);
  const [isFavoritePresent, setIsFavoritePresent] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const [localLogoutMutation] = useMutation(LOCAL_LOG_OUT);
  const { data: { socialProvider } } = useQuery(GET_SOCIAL_PROVIDER);
  const { data: getMe, loading: getMeLoading } = useQuery(ME, {
    skip: !socialProvider,
  });
  const { data: favoriteListData, loading, refetch: refreshFavorites } = useQuery(
    FAVORITE_EMPLOYERS,
    {
      fetchPolicy: 'network-only',
      skip: !socialProvider
    }
  );

  useEffect(() => {
    if (!getMeLoading && getMe) {
      const { me: { full_name, profile_url } } = getMe;
      setFullName(full_name);
      setProfileUrl(profile_url);
    }
  }, [getMeLoading]);

  useEffect(() => {
    if (!loading && favoriteListData) {
      const { getFavoriteList } = favoriteListData;
      setFavoriteLoading(false);
      setFavoriteList(getFavoriteList);
      if (getFavoriteList.length) {
        setIsFavoritePresent(true);
      }
    }
  }, [loading]);

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

  const refresh = async () => {
    setFavoriteLoading(true);
    const { data: { getFavoriteList } } = await Promise.resolve(refreshFavorites());
    setFavoriteList(getFavoriteList);
    setIsFavoritePresent(getFavoriteList.length > 0);
    setFavoriteLoading(false);
  }

  return (
    <Profile
      fullName={fullName}
      profileUrl={profileUrl}
      getMeLoading={getMeLoading}
      favoriteLoading={favoriteLoading}
      favoriteList={favoriteList}
      isFavoritePresent={isFavoritePresent}
      logOutPressed={logOutPressed}
      socialProvider={socialProvider}
      refresh={refresh}
    />
  );
};

export default ProfileContainer;
