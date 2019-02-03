import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import CompanyItem from './presenter';

class Container extends Component {
  componentDidMount() {
    const {
      company,
      favorites,
      notes,
      showLabel,
      noteIcon,
      likeButton,
      socialProvider
    } = this.props;
    const isLiked = favorites[company.careerfair_id].includes(company.employer.id);
    let isNote = false;

    const curNotes = notes[company.careerfair_id];
    if (curNotes) {
      isNote = Object.keys(curNotes).includes(company.employer.id.toString());
    }

    this.setState({
      company,
      isLiked,
      isNote,
      displayLabel: showLabel,
      displayNote: noteIcon,
      displayLike: likeButton,
      socialProvider
    });
  }

  componentWillReceiveProps(nextProps) {
    const { favorites, notes } = nextProps;
    const { company } = this.state;
    const isLiked = favorites[company.careerfair_id].includes(company.employer.id);
    let isNote = false;

    const curNotes = notes[company.careerfair_id];
    if (curNotes) {
      isNote = Object.keys(curNotes).includes(company.employer.id.toString());
    }

    if (isLiked !== this.state.isLiked) {
      this.setState({
        isLiked,
      });
    }
    if (isNote !== this.state.isNote) {
      this.setState({
        isNote,
      });
    }
  }

  _navigateTo = (key) => {
    const { company } = this.state;
    const { notes } = this.props;

    const curNotes = notes[company.careerfair_id] || {};
    const note = curNotes[company.employer.id];

    const params = { companyInfo: company, note };

    Actions.push(key, params);
  };

  _handleLike = () => {
    const { isLiked, company, socialProvider } = this.state;
    const { likeCompany, unlikeCompany } = this.props;

    if (socialProvider) {
      if (!isLiked) {
        likeCompany(company.employer.id, company.careerfair_id);
      } else {
        unlikeCompany(company.employer.id, company.careerfair_id);
      }

      this.setState({
        isLiked: !isLiked
      });
    } else {
      Alert.alert(
        'No Access Rights',
        'Login with social account to use this feature.',
        [
          { text: 'OK', onPress: () => {} }
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    const { company } = this.props;
    return (
      <CompanyItem
        {...this.state}
        company={company}
        navigateTo={this._navigateTo}
        handleLike={this._handleLike}
      />
    );
  }
}

export default Container;
