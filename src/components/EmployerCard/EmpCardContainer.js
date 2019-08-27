import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import {
  GET_FAVORITES,
  GET_NOTES,
  GET_SOCIAL_PROVIDER,
  LOCAL_LOG_OUT,
  UPDATE_FAVORITES,
} from '../../Apollo/sharedQueries';
import { TOGGLE_LIKE } from '../../screens/EmployerList/EmployerListQueries';
import EmpCardPresenter from './EmpCardPresenter';

const propTypes = exact({
  id: PropTypes.string,
  careerfair_id: PropTypes.string,
  degree_requirements: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  employer: PropTypes.shape({
    company_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  hiring_majors: PropTypes.arrayOf(PropTypes.string).isRequired,
  hiring_types: PropTypes.arrayOf(PropTypes.string).isRequired,
  tables: PropTypes.arrayOf(PropTypes.number),
  visa_support: PropTypes.string.isRequired,
  size: PropTypes.string,
  featured: PropTypes.bool,
  is_liked: PropTypes.bool,
  is_noted: PropTypes.bool,
  showNote: PropTypes.bool,
  showLike: PropTypes.bool,
  showLabel: PropTypes.bool,
  __typename: PropTypes.string
});

const EmpCardContainer = props => {
  const client = useApolloClient();
  const [isLikedS, setIsLiked] = useState(props.is_liked);
  const [isNotedS, setIsNoted] = useState(props.is_noted);
  const { data: noteData } = useQuery(GET_NOTES);
  const { data: { socialProvider } } = useQuery(GET_SOCIAL_PROVIDER);
  const { data: favoritesData } = useQuery(GET_FAVORITES);
  const [localLogoutMutation] = useMutation(LOCAL_LOG_OUT);

  const {
    careerfair_id,
    employer,
    hiring_majors,
    hiring_types,
    visa_support,
    size,
    featured,
    showNote,
    showLike,
    showLabel,
  } = props;

  /** Like Mutation */
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  /** favorites cache */
  const [updateFavoritesMutation] = useMutation(UPDATE_FAVORITES);

  // recheck if this employer has note in cache and update the isNoted state
  useEffect(() => {
    if (noteData && noteData.notes) {
      const { notes } = noteData;
      const fairNotes = notes.find(item => item.id === careerfair_id);
      if (fairNotes) {
        const isInNotes = fairNotes.employerIds.includes(employer.id);
        if (isInNotes && !isNotedS) {
          setIsNoted(true);
        } else if (!isInNotes && isNotedS) {
          setIsNoted(false);
        }
      }
    }
  }, [noteData]);

  // recheck if this employer is in favorites cache and update the isLiked state
  useEffect(() => {
    if (favoritesData && favoritesData.favorites) {
      const { favorites } = favoritesData;
      const fairFavorites = favorites.find(item => item.id === careerfair_id);
      if (fairFavorites) {
        const isInFavorites = fairFavorites.employerIds.includes(employer.id);
        if (isInFavorites && !isLikedS) {
          setIsLiked(true);
        } else if (!isInFavorites && isLikedS) {
          setIsLiked(false);
        }
      }
    }
  }, [favoritesData]);

  const logOut = async () => {
    // Clear auth state
    // TODO: log out
    // await localLogoutMutation();
    // client.resetStore();
    console.log('Log out');
  }

  const showAlert = () => {
    Alert.alert(
      'No Access Rights',
      'Login with social account to use this feature.',
      [
        { text: 'OK', onPress: () => {} }
      ],
      { cancelable: false }
    );
  }

  // ---------------------------- Toggle Like ---------------------------- //
  /** Heart button clicked */
  const likeCompany = async () => {
    // only signed in users can like employer
    if (socialProvider !== 'google') {
      showAlert();
      return;
    }
    let shouldLike = !isLikedS;
    const fairId = careerfair_id;
    const employerId = employer.id;

    // update like state
    setIsLiked(!isLikedS);

    try {
      const {
        data: {
          likeEmployer: { message, status }
        },
      } = await toggleLikeMutation({
        variables: { fairId, employerId },
      });
      if (status) {
        console.log(`${message} ${employer.name}`);
        // Update favorites cache
        if (shouldLike) {
          updateFavoritesMutation({
            variables: {
              mode: 'LIKE',
              fairId,
              employerId,
            }
          });
        } else {
          updateFavoritesMutation({
            variables: {
              mode: 'UNLIKE',
              fairId,
              employerId,
            }
          });
        }
      }
      return;
    } catch (error) {
      console.error(error.message);
    }

    // if toggle like request fails, revert back to original state
    setIsLiked(isLikedS);
    return;
  };
  // --------------------------------------------------------------------- //

  const navigateTo = key => {
    const params = {
      companyInfo: props,
      actions: { likeCompany, setIsLiked, setIsNoted },
      state: { isLikedS, isNotedS }
    };

    Actions.push(key, params);
  };

  return (
    <EmpCardPresenter
      navigateTo={navigateTo}
      employer={employer}
      isLiked={isLikedS}
      isNoted={isNotedS}
      hiringMajors={hiring_majors}
      hiringTypes={hiring_types}
      visaSupport={visa_support}
      size={size}
      featured={featured}
      showNote={showNote}
      showLike={showLike}
      showLabel={showLabel}
      likeCompany={likeCompany}
    />
  );
};

EmpCardContainer.propTypes = propTypes;

export default EmpCardContainer;
