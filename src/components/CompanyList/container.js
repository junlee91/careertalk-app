import React, { Component, Fragment } from 'react';

import CompanyList from './presenter';
import { Spinner } from '../commons';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isFetching: false,
      searching: false,
      companiesForRender: [],
    };

    this._searching = this._searching.bind(this);
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
      isFetching: true,
      searching: false,
    });

    getCompanyList(fair_id);
  };

  _searching = (text) => {
    const { companies, companiesForRender } = this.state;
    if (text === '' || companiesForRender.length === 0) {
      this.setState({
        searching: false,
        companiesForRender: companies,
      });
    } else {
      const filtered = companies.filter(c => c.name.toLowerCase().includes(text.toLowerCase()));
      this.setState({
        searching: true,
        companiesForRender: filtered,
      });
    }
  };

  _cancel = () => {
    const { companies } = this.state;
    this.setState({
      searching: false,
      companiesForRender: companies,
    });
  }

  _setComponentState(props) {
    const { favorites, notes, company: { Company } } = props;
    let { companiesForRender } = this.state;
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

    if (this.state.searching === false) {
      companiesForRender = Company;
    }
    this.setState({
      loading: false,
      isFetching: false,
      numOfFavorites: filteredFavorites,
      numOfNotes: filteredNotes,
      numOfCompanies: Company.length,
      companies: Company,
      companiesForRender,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        {loading ? (
          <Spinner size="large" />
        ) : (
          <CompanyList
            {...this.state}
            refresh={this._refresh}
            search={this._searching}
            cancel={this._cancel}
          />
        )}
      </Fragment>
    );
  }
}

export default Container;
