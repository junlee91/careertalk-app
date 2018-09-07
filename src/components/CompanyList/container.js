import React, { Component, Fragment } from 'react';

import CompanyList from './presenter';
import { Spinner } from '../commons';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isFetching: false
    };
  }

  componentDidMount() {
    const { getCompanyList, fair_id } = this.props;

    getCompanyList(fair_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      this._setComponentState(nextProps);
    }
  }

  _refresh = () => {
    const { getCompanyList, fair_id } = this.props;

    this.setState({
      isFetching: true
    });

    getCompanyList(fair_id);
  };

  _setComponentState(props) {
    const { favorites, notes, company: { Company } } = props;
    const numOfCompanies = Company.length;
    let filteredFavorites = 0;
    let filteredNotes = 0;
    const notesIds = Object.keys(notes);
    for (let i = 0; i < numOfCompanies; i += 1) {
      if (favorites.includes(Company[i].id)) {
        filteredFavorites += 1;
      }
      if (notesIds.includes(Company[i].id.toString())) {
        filteredNotes += 1;
      }
    }
    this.setState({
      loading: false,
      isFetching: false,
      numOfFavorites: filteredFavorites,
      numOfNotes: filteredNotes,
      companies: Company
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        {loading ? (
          <Spinner size="large" />
        ) : (
          <CompanyList {...this.state} refresh={this._refresh} />
        )}
      </Fragment>
    );
  }
}

export default Container;
