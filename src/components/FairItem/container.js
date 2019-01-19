import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import FairItem from './presenter';

class Container extends Component {
  state = {
    isLiked: false
  };

  componentDidMount() {
    const { fair } = this.props;
    this.setState({
      fair
    });
  }

  _navigateTo = (key) => {
    const { fair } = this.props;
    const param = { fair_id: fair.id };

    Actions.jump(key, param);
  };

  render() {
    const { fair } = this.props;
    return <FairItem {...this.state} fair={fair} navigateTo={this._navigateTo} />;
  }
}

export default Container;
