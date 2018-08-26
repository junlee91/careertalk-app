import React, { Component, Fragment } from 'react';

import CompanyList from './presenter';
import { Spinner } from '../commons';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { getCompanyList } = this.props;

    getCompanyList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      this.setState({
        loading: false,
        company: nextProps.company
      });
    }
  }

  render() {
    const { loading } = this.state;
    return <Fragment>{loading ? <Spinner size="large" /> : <CompanyList {...this.state} />}</Fragment>;
  }
}

export default Container;
