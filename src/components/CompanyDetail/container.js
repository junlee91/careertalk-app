import React, { Component } from 'react';

import CompanyDetail from './presenter';

class Container extends Component {
  componentWillMount() {
    const { fairs: { Careerfair }, companyInfo } = this.props;
    const fair = Careerfair.filter(fair => fair.id === companyInfo.fair_id);
    const { date } = fair[0];

    this.setState({
      date
    });
  }

  render() {
    return (
      <CompanyDetail {...this.state} {...this.props} />
    );
  }
}

export default Container;
