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
    const isLiked = favorites.includes(company.id);
    const isNote = notes[company.id] !== undefined;

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
    const isLiked = favorites.includes(company.id);
    const isNote = notes[company.id] !== undefined;

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
    const params = { companyInfo: company, note: notes[company.id] };

    Actions.push(key, params);
  };

  _handleLike = () => {
    const { isLiked, company, socialProvider } = this.state;
    const { likeCompany, unlikeCompany } = this.props;

    if (socialProvider) {
      if (!isLiked) {
        likeCompany(company.id, company.careerfair_id);
      } else {
        unlikeCompany(company.id, company.careerfair_id);
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
