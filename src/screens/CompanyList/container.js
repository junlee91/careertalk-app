import React, { Component, Fragment } from 'react';

import CompanyList from './presenter';
import { Spinner } from '../../components/commons';
import filterFields from '../../lib/fields.json';

class Container extends Component {
  state = {
    loading: false,
    isFetching: false,
    canSearch: false,
    searchText: '',
    searchBarFocus: false,
    companiesForRender: [],
    numOfFavorites: 0,
    numOfNotes: 0,
    numOfCompanies: 0,
    overlayVisible: false,
    filterOptions: {
      degree: new Set(),
      majors: new Set(),
      hiringTypes: new Set(),
    },
    sponsorChecked: false,
    filterFields,
  };

  componentDidMount() {
    const { demoGetCompany, company } = this.props;

    if (!(company && company.Company)) {
      demoGetCompany();
    } else {
      this._setComponentState(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      this._setComponentState(nextProps);
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
  };

  _toggleOverlayFilter = () => {
    const { overlayVisible } = this.state;
    this.setState({
      overlayVisible: !overlayVisible
    });
  };

  _toggleFilterOptions = (key, value) => {
    const { filterOptions } = this.state;

    if (filterOptions[key].has(value)) {
      filterOptions[key].delete(value);
    } else {
      filterOptions[key].add(value);
    }

    this.forceUpdate();
  }

  _toggleSponsor = () => {
    const { sponsorChecked } = this.state;

    this.setState({
      sponsorChecked: !sponsorChecked
    });
  }

  _setComponentState(props) {
    const { company: { Company }, favorites, notes } = props;
    const numOfCompanies = Company.length;
    const numOfFavorites = favorites.length;
    const numOfNotes = Object.keys(notes).length;

    this.setState({
      companiesForRender: Company,
      numOfCompanies,
      numOfFavorites,
      numOfNotes
    });
  }

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
            toggleFilter={this._toggleOverlayFilter}
            toggleFilterOptions={this._toggleFilterOptions}
            toggleSponsor={this._toggleSponsor}
          />
        )}
      </Fragment>
    );
  }
}

export default Container;
