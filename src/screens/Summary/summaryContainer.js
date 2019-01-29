import React from 'react';
import Summary from './summaryPresenter';

import sample from '../../lib/sample.json';

class Container extends React.Component {
  componentDidMount() {
    this.setState({
      company: sample.Company
    });
  }

  render() {
    return <Summary {...this.state} />;
  }
}

export default Container;
