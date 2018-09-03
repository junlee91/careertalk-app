import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import CompanyItem from './presenter';

class Container extends Component {
  componentDidMount() {
    const { company, favorites, likeButton } = this.props;
    const isLiked = favorites.includes(company.id);

    this.setState({
      company,
      isLiked,
      displayLike: likeButton,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { favorites } = nextProps;
    const { company } = this.state;
    const isLiked = favorites.includes(company.id);

    if (isLiked !== this.state.isLiked) {
      this.setState({
        isLiked
      });
    }
  }

  _navigateTo = (key) => {
    const { company } = this.state;
    const params = { companyInfo: company };

    Actions.push(key, params);
  };

  _handleLike = () => {
    const { isLiked, company } = this.state;
    const { likeCompany, unlikeCompany } = this.props;

    if (!isLiked) {
      likeCompany(company.id);
    } else {
      unlikeCompany(company.id);
    }

    this.setState({
      isLiked: !isLiked
    });
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
