import React, { Component } from 'react';

import CompanyDetail from './presenter';

class Container extends Component {
  state = {
    isLiked: false
  };

  componentWillMount() {
    const {
      fairs: { Careerfair },
      companyInfo
    } = this.props;
    const fair = Careerfair.filter(fair => fair.id === companyInfo.fair_id);
    const { start_date_min } = fair[0];

    this.setState({
      date: start_date_min,
      companyInfo,
    });
  }

  _handleLike = () => {
    const { isLiked, companyInfo } = this.state;

    console.log(`Just liked ${companyInfo.id}!!`);

    this.setState({
      isLiked: !isLiked
    });
  };

  render() {
    return <CompanyDetail {...this.state} {...this.props} handleLike={this._handleLike} />;
  }
}

export default Container;
