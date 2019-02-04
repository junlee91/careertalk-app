import React from 'react';
import Summary from './summaryPresenter';

class Container extends React.Component {
  state = {
    loading: true,
    topList: {}
  }

  componentDidMount() {
    const { socialProvider, v2_getTop5, currentFair } = this.props;

    // Make call only when user is logged in with social account
    if (socialProvider) {
      v2_getTop5(currentFair);
    } else {
      this.setState({
        loading: false,
        anonUser: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { topList } = nextProps;

    if (topList) {
      this.setState({
        loading: false,
        topList
      });
    }
  }

  render() {
    return <Summary {...this.state} />;
  }
}

export default Container;
