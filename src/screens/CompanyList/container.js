import React, { Component, Fragment } from 'react';

import CompanyList from './presenter';
import { Spinner } from '../../components/commons';
import filterFields from '../../lib/fields.json';

class Container extends Component {
  state = {
    loading: true,
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
    const { v2_getEmployers, employers, currentFair } = this.props;

    if (employers[currentFair]) {
      this._setComponentState(this.props);
    } else {
      v2_getEmployers(currentFair);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentFair, employers } = nextProps;
    if (employers[currentFair]) {
      this._setComponentState(nextProps);
    }
  }

  _refresh = () => {
    const { v2_getEmployers, currentFair } = this.props;

    v2_getEmployers(currentFair);
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
    const { currentFair, favorites, notes, employers } = props;
    const employersForRender = employers[currentFair];
    const numOfCompanies = employersForRender.length;
    const numOfFavorites = favorites.length;
    const numOfNotes = Object.keys(notes).length;

    this.setState({
      loading: false,
      employersForRender,
      numOfCompanies,
      numOfFavorites,
      numOfNotes,
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
