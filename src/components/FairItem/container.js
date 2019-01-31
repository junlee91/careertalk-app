import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import FairItem from './presenter';

class Container extends Component {
  componentDidMount() {
    const { fair } = this.props;
    this.setState({
      fair
    });
  }

  _navigateTo = (id) => {
    this.props.setCurrentFair(id);
    Actions.companyList();
  };

  render() {
    const { fair } = this.props;
    return <FairItem {...this.state} fair={fair} navigateTo={this._navigateTo} />;
  }
}

export default Container;
