import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import CompanyItem from './presenter';

class Container extends Component {
  state = {
    isLiked: false
  };

  _navigateTo = (key) => {
    const { company } = this.props;
    const params = { companyInfo: company };

    Actions.push(key, params);
  };

  _handleLike = () => {
    const { isLiked } = this.state;

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
