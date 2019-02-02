import React from 'react';
import Summary from './summaryPresenter';

class Container extends React.Component {
  componentDidMount() {
    this.setState({
      company: []
    });
  }

  render() {
    return <Summary {...this.state} />;
  }
}

export default Container;
