import React, { useState, useEffect } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';

import { ISLOGGEDIN_QUERY, LOCAL_LOG_OUT, ME } from '../../Apollo/sharedQueries';
import Profile from './ProfilePresenter';

const ProfileContainer = () => {
  const client = useApolloClient();
  const [fullName, setFullName] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);

  const { data: { isLoggedIn } } = useQuery(ISLOGGEDIN_QUERY);
  const { data: getMe, loading: getMeLoading } = useQuery(ME, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (!getMeLoading && getMe) {
      const { me: { full_name, profile_url } } = getMe;
      setFullName(full_name);
      setProfileUrl(profile_url);
    }
  }, [getMeLoading]);

  return <Profile fullName={fullName} profileUrl={profileUrl} getMeLoading={getMeLoading} />
};

export default ProfileContainer;
