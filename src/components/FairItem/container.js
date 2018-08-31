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
    const params = { fair_id: fair.id };

    Actions.push(key, params);
  };

  _handleLike = () => {
    const { isLiked, company } = this.state;
    console.log(`Just liked ${company.id}`);

    this.setState({
      isLiked: !isLiked
    });
  };

  render() {
    const { fair } = this.props;
    return (
      <FairItem
        {...this.state}
        fair={fair}
      />
    );
  }
}

export default Container;
