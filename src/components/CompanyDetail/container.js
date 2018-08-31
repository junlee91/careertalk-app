import React, { Component } from 'react';

import CompanyDetail from './presenter';

class Container extends Component {
  componentDidMount() {

  }


  render() {
    return (
      <CompanyDetail {...this.props} />
    );
  }
}

export default Container;
