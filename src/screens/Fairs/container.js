import React, { Component, Fragment } from 'react';

import FairList from './presenter';
import { Spinner } from '../../components/commons';

import hard_fairs from '../../lib/sample_fairs.json';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      fairs: []
    };
  }

  componentDidMount() {
    const { v2_getFairs, fairs } = this.props;

    if (fairs) {
      this.setState({
        loading: false,
        fairs
      });
    } else {
      v2_getFairs();
    }

    this.setState({
      loading: false,
      fairs: hard_fairs.Fairs
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.fairs) {
  //     this.setState({
  //       loading: false,
  //       fairs: nextProps.fairs
  //     });
  //   }
  // }

  render() {
    const { loading } = this.state;
    return <Fragment>{loading ? <Spinner size="large" /> : <FairList {...this.state} />}</Fragment>;
  }
}

export default Container;
