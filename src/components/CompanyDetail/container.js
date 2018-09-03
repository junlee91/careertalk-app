import React, { Component } from 'react';

import CompanyDetail from './presenter';

class Container extends Component {
  componentWillMount() {
    const {
      fairs: { Careerfair },
      companyInfo,
      favorites
    } = this.props;
    const fair = Careerfair.filter(fair => fair.id === companyInfo.fair_id);
    const { start_date_min } = fair[0];
    const isLiked = favorites.includes(companyInfo.id);

    this.setState({
      date: start_date_min,
      companyInfo,
      isLiked,
      isEditting: false
    });
  }

  _handleLike = () => {
    const { isLiked, companyInfo } = this.state;
    const { likeCompany, unlikeCompany } = this.props;

    if (!isLiked) {
      likeCompany(companyInfo.id);
    } else {
      unlikeCompany(companyInfo.id);
    }

    this.setState({
      isLiked: !isLiked
    });
  };

  _handleEdit = () => {
    const { isEditting } = this.state;

    if (!isEditting) {
      this.setState({
        isEditting: true
      });
    }
  };

  _handleSave = () => {
    this.setState({
      isEditting: false
    });
  }

  render() {
    return (
      <CompanyDetail
        {...this.state}
        {...this.props}
        handleLike={this._handleLike}
        handleEdit={this._handleEdit}
        handleSave={this._handleSave}
      />
    );
  }
}

export default Container;
