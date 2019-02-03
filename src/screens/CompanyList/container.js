import React, { Component, Fragment } from 'react';

import CompanyList from './presenter';
import { Spinner } from '../../components/commons';
import filterFields from '../../lib/fields.json';

class Container extends Component {
  state = {
    loading: true,
    isFetching: false,
    searchText: '',
    searchBarFocus: false,
    numOfFavorites: 0,
    numOfNotes: 0,
    numOfCompanies: 0,
    overlayVisible: false,
    filterOptions: {
      degree: new Set(),
      majors: new Set(),
      hiringTypes: new Set()
    },
    sponsorChecked: false,
    filterFields,
    filterApply: false
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
      searchText: text
    });

    this.searchTimeout = setTimeout(() => {
      this._filterEmployers();
    }, 500);
  };

  _cancel = () => {
    this.setState({
      searchText: ''
    });

    this.searchTimeout = setTimeout(() => {
      this._filterEmployers();
    }, 500);
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

    if (this.state.overlayVisible) {
      this.filterTimeout = setTimeout(() => {
        this._filterEmployers();
      }, 500);
    }
  };

  _toggleFilterOptions = (key, value) => {
    const { filterOptions } = this.state;

    if (filterOptions[key].has(value)) {
      filterOptions[key].delete(value);
    } else {
      filterOptions[key].add(value);
    }

    this.forceUpdate();
  };

  _toggleSponsor = () => {
    const { sponsorChecked } = this.state;

    this.setState({
      sponsorChecked: !sponsorChecked
    });
  };

  _filterBySponsor = (employers) => {
    return employers.filter(e => e.visa_support === 'yes');
  };

  _filterEmployers = () => {
    // Keep an eye on filtering performance..
    const { searchText, filterOptions, sponsorChecked, originalEmployers } = this.state;
    let filteredEmployers = originalEmployers;
    let employerOptSet;
    let filterOptSet;
    let intersection;

    filteredEmployers = filteredEmployers.filter(
      e => e.employer.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filterOptions.hiringTypes.size) {
      filteredEmployers = filteredEmployers.filter((e) => {
        employerOptSet = new Set(e.hiring_types);
        filterOptSet = filterOptions.hiringTypes;
        intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

        return intersection.size;
      });
    }

    if (filterOptions.degree.size) {
      filteredEmployers = filteredEmployers.filter((e) => {
        employerOptSet = new Set(e.degree_requirements);
        filterOptSet = filterOptions.degree;
        intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

        return intersection.size;
      });
    }

    if (filterOptions.majors.size) {
      filteredEmployers = filteredEmployers.filter((e) => {
        employerOptSet = new Set(e.hiring_majors);
        filterOptSet = filterOptions.majors;
        intersection = new Set([...employerOptSet].filter(x => filterOptSet.has(x)));

        return intersection.size;
      });
    }

    if (sponsorChecked) {
      filteredEmployers = this._filterBySponsor(filteredEmployers);
    }

    this.setState({
      employersForRender: filteredEmployers
    });

    this._isFilterApplied();
  };

  _isFilterApplied() {
    const { filterOptions, sponsorChecked } = this.state;

    if (
      filterOptions.degree.size
      || filterOptions.hiringTypes.size
      || filterOptions.majors.size
      || sponsorChecked
    ) {
      this.setState((prevState, _) => {
        return {
          ...prevState,
          filterApply: true
        };
      });
    } else {
      this.setState((prevState, _) => {
        return {
          ...prevState,
          filterApply: false
        };
      });
    }
  }

  _setComponentState(props) {
    const { currentFair, favorites, notes, employers } = props;
    let { employersForRender } = this.state;
    const originalEmployers = employers[currentFair];
    const numOfCompanies = originalEmployers.length;
    const numOfFavorites = favorites[currentFair].length;
    const curNotes = notes[currentFair] || {};
    const numOfNotes = Object.keys(curNotes).length;

    if (!employersForRender) {
      employersForRender = originalEmployers;
    }

    this.setState({
      loading: false,
      employersForRender,
      originalEmployers,
      numOfCompanies,
      numOfFavorites,
      numOfNotes
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
