import React from 'react';
import Summary from './summaryPresenter';

class Container extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const { socialProvider } = this.props;

    if (socialProvider) {
      this.setState({
        loading: false,
        employers: []
      });
    } else {
      this.setState({
        loading: false,
        anonUser: true
      });
    }
  }

  render() {
    return <Summary {...this.state} />;
  }
}

export default Container;
