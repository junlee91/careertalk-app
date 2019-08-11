import React, { useState } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

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
  // toggleModal: PropTypes.func.isRequired,
  // toggleLike: PropTypes.func.isRequired,
  __typename: PropTypes.string
});

const EmpCardContainer = props => {
  const [isLikedS, setIsLiked] = useState(props.is_liked);
  const [isNotedS, setIsNoted] = useState(props.is_noted);
  const {
    employer,
    hiring_majors,
    hiring_types,
    visa_support,
    size,
    featured,
    showNote,
    showLike,
    showLabel
  } = props;

  const toggleLike = async () => {
    console.log('click like');
  };

  const navigateTo = key => {
    const params = { companyInfo: props };

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
    />
  );
};

EmpCardContainer.propTypes = propTypes;

export default EmpCardContainer;
