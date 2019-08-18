import React, { useState, useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import { useQuery } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import { GET_NEW_NOTES } from '../../Apollo/sharedQueries';
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
  const [isLikedS, setIsLiked] = useState(props.is_liked);
  const [isNotedS, setIsNoted] = useState(props.is_noted);
  const { data: { newNotes } } = useQuery(GET_NEW_NOTES);
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
    const hasNote = newNotes.includes(employer.id);
    if (hasNote && !isNotedS) {
      setIsNoted(true);
    } else if (!hasNote && isNotedS) {
      setIsNoted(false);
    }
  }, [newNotes]);

  /** Heart button clicked */
  const likeCompany = async () => {
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
  };

  const navigateTo = key => {
    const params = {
      companyInfo: props,
      actions: { setIsLiked, setIsNoted },
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
