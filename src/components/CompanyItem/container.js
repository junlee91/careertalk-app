import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import CompanyItem from './presenter';

class Container extends Component {
  _navigateTo = (key) => {
    const { company } = this.props;
    const params = { companyInfo: company };

    Actions.push(key, params);
  };

  render() {
    const { company } = this.props;

    return <CompanyItem company={company} navigateTo={this._navigateTo} />;
  }
}

export default Container;
