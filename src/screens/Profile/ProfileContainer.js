import React, { useState, useEffect } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';

import { GET_SOCIAL_PROVIDER, LOCAL_LOG_OUT, ME, GET_FAVORITES, UPDATE_FAVORITES } from '../../Apollo/sharedQueries';
import { EMPLOYERS } from '../EmployerList/EmployerListQueries';
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

  // Get employers in current fair from cache
  const { refetch: getEmployersCache } = useQuery(EMPLOYERS, {
    skip: true,
  });
  // Get favorite list from cache
  const { data: favoritesCache } = useQuery(GET_FAVORITES);
  // Update favorite cache
  const [updateFavoritesMutation] = useMutation(UPDATE_FAVORITES);

  // Compare two arrays and return true if they are different
  const isDifferent = (A, B) => {
    if (A.length !== B.length) return true;

    const diffOne = A.filter(x => !B.includes(x));
    const diffTwo = B.filter(x => !A.includes(x));

    if (diffOne.length || diffTwo.length) return true;

    return false;
  }

  // Reconstruct favorites list and update the list
  const updateFavoritesList = async (fairId, currentLikedEmployerIds, previousFavorites) => {
    const { data: { getEmployerList: { companies } } } = await getEmployersCache({
      fetchPolicy: 'cache-only',
      fairId,
      isUser: socialProvider !== null,
    });
    const currentLikedEmployerIdsSet = new Set(currentLikedEmployerIds);
    const newLikedEmployers = companies.filter(company => currentLikedEmployerIdsSet.has(company.employer.id));
    const { getFavoriteList } = favoriteListData;

    const newFavorites = {
      ...previousFavorites,
      liked_employers: newLikedEmployers
    };
    let newFavoriteList = [];

    for (let i = 0; i < getFavoriteList.length; i++) {
      if (getFavoriteList[i].careerfair.id === fairId) {
        newFavoriteList.push(newFavorites);
      } else {
        newFavoriteList.push(getFavoriteList[i])
      }
    }

    setFavoriteList(newFavoriteList);
  };

  // This part is called when favorite list is updated
  useEffect(() => {
    if (favoritesCache && favoriteListData) {
      const { getFavoriteList } = favoriteListData;
      const { favorites } = favoritesCache;

      favorites.forEach(({ id, employerIds }) => {
        const currentFairId = id;
        const currentLikedEmployerIds = employerIds;

        const previousFavorites = getFavoriteList.find(
          ({ careerfair }) => careerfair.id === currentFairId
        );

        if (previousFavorites) {
          const { liked_employers } = previousFavorites;
          const previousLikedEmployerIds = [];

          liked_employers.forEach(({ employer }) => previousLikedEmployerIds.push(employer.id));

          if (isDifferent(previousLikedEmployerIds, currentLikedEmployerIds)) {
            updateFavoritesList(currentFairId, currentLikedEmployerIds, previousFavorites);
          }
        }
      });
    }
  }, [favoritesCache]);

  // update name state
  useEffect(() => {
    if (!getMeLoading && getMe) {
      const { me: { full_name, profile_url } } = getMe;
      setFullName(full_name);
      setProfileUrl(profile_url);
    }
  }, [getMeLoading]);

  // update favorite list state
  useEffect(() => {
    if (!loading && favoriteListData) {
      const { getFavoriteList } = favoriteListData;
      setFavoriteLoading(false);
      setFavoriteList(getFavoriteList);

      getFavoriteList.forEach(async item => {
        const { careerfair: { id }, liked_employers } = item;
        const likedEmployerIds = [];

        liked_employers.forEach(({ employer }) => likedEmployerIds.push(employer.id));

        await updateFavoritesMutation({
          variables: {
            mode: 'SETUP',
            fairId: id,
            employerIds: likedEmployerIds,
          }
        });
      });

      if (getFavoriteList.length) {
        setIsFavoritePresent(true);
      }
    }
  }, [loading]);

  // handle signout
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

  // refresh control
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
