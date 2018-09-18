import React, { Component, Fragment } from 'react';

import FairList from './presenter';
import { Spinner } from '../../components/commons';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { getFairs } = this.props;
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
    const { loading } = this.state;
    return <Fragment>{loading ? <Spinner size="large" /> : <FairList {...this.state} />}</Fragment>;
  }
}

export default Container;
