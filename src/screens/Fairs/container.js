import React, { Component, Fragment } from 'react';

import FairList from './presenter';
import { Spinner } from '../../components/commons';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      fairs: []
    };
  }

  componentDidMount() {
    const { v2_getFairs } = this.props;

    v2_getFairs();
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
