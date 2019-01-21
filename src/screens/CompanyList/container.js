import React, { Component, Fragment } from 'react';

import CompanyList from './presenter';
import { Spinner } from '../../components/commons';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFetching: false,
      canSearch: false,
      searchText: '',
      searchBarFocus: false,
      companiesForRender: [],
      numOfFavorites: 0,
      numOfNotes: 0,
      numOfCompanies: 0
    };
  }

  componentDidMount() {
    const { demoGetCompany, company } = this.props;

    if (!(company && company.Company)) {
      demoGetCompany();
    } else {
      this.setState({
        companiesForRender: company.Company
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      this.setState({
        companiesForRender: nextProps.company.Company
      });
    }
  }

  _refresh = () => {
    console.log('refreshing..');
  };

  _searching = (text) => {
    this.setState({
      canSearch: false,
      searchText: text
    });

    this.searchTimeout = setTimeout(() => {
      this.setState({ canSearch: true });
    }, 500);
  };

  _cancel = () => {
    this.setState({
      searchText: ''
    });
  };

  _searchBarFocusFn = () => {
    const { searchBarFocus } = this.state;
    this.setState({
      searchBarFocus: !searchBarFocus
    });
  }

  // _setComponentState(props) {
  //   const {
  //     favorites,
  //     notes,
  //     company: { Company }
  //   } = props;
  //   let { companiesForRender } = this.state;
  //   const numOfCompanies = Company.length;
  //   let filteredFavorites = 0;
  //   let filteredNotes = 0;
  //   const notesIds = Object.keys(notes);
  //   for (let i = 0; i < numOfCompanies; i += 1) {
  //     if (favorites.includes(Company[i].id)) {
  //       filteredFavorites += 1;
  //     }
  //     if (notesIds.includes(Company[i].id.toString())) {
  //       filteredNotes += 1;
  //     }
  //   }

  //   if (this.state.searching === false) {
  //     companiesForRender = Company;
  //   }
  //   this.setState({
  //     loading: false,
  //     isFetching: false,
  //     numOfFavorites: filteredFavorites,
  //     numOfNotes: filteredNotes,
  //     numOfCompanies: Company.length,
  //     companies: Company,
  //     companiesForRender
  //   });
  // }

  render() {
    const { loading } = this.state;

    if (this.state.canSearch) {
      console.log(`searching for ${this.state.searchText}`);
    }

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
            searchBarFocusFn={this._searchBarFocusFn}
          />
        )}
      </Fragment>
    );
  }
}

export default Container;
