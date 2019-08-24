import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import { GET_NEW_NOTES, GET_SOCIAL_PROVIDER, LOCAL_LOG_OUT } from '../../Apollo/sharedQueries';
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
  toggleLike: PropTypes.func.isRequired,
  __typename: PropTypes.string
});

const EmpCardContainer = props => {
  const client = useApolloClient();
  const [isLikedS, setIsLiked] = useState(props.is_liked);
  const [isNotedS, setIsNoted] = useState(props.is_noted);
  const { data: noteData} = useQuery(GET_NEW_NOTES);
  const { data: { socialProvider } } = useQuery(GET_SOCIAL_PROVIDER);
  const [localLogoutMutation] = useMutation(LOCAL_LOG_OUT);

  const {
    employer,
    hiring_majors,
    hiring_types,
    visa_support,
    size,
    featured,
    showNote,
    showLike,
    showLabel,
    toggleLike,
  } = props;

  // recheck if this employer has note in cache and update the isNoted state
  useEffect(() => {
    if (noteData && noteData.newNotes) {
      const hasNote = noteData.newNotes.includes(employer.id);
      if (hasNote && !isNotedS) {
        setIsNoted(true);
      } else if (!hasNote && isNotedS) {
        setIsNoted(false);
      }
    }
  }, [noteData]);

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

  /** Heart button clicked */
  const likeCompany = async () => {
    // only signed in users can like employer
    if (socialProvider !== 'google') {
      showAlert();
      return;
    }
    let result;
    if (isLikedS) {
      setIsLiked(!isLikedS);
      result = await toggleLike({ employerId: employer.id, name: employer.name, liked: false });
    } else {
      setIsLiked(!isLikedS);
      result = await toggleLike({ employerId: employer.id, name: employer.name, liked: true });
    }

    // if toggle like request fails, revert back to original state
    if (!result) {
      setIsLiked(isLikedS);
    }

    return result;
  };

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
