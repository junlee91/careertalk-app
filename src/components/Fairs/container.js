import React, { Component, Fragment } from 'react';

import FairList from './presenter';
import { Spinner } from '../commons';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { getFairs } = this.props;
    console.log(getFairs);
    getFairs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fairs) {
      this.setState({
        loading: false,
        fairs: nextProps.fairs
      });
    }
  }

  render() {
    console.log(this.state.fairs);
    const { loading } = this.state;
    return <Fragment>{loading ? <Spinner size="large" /> : <FairList {...this.state} />}</Fragment>;
  }
}

export default Container;
