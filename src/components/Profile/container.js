import React from 'react';
import Profile from './presenter';

class Container extends React.Component {
  componentDidMount() {
    this._setComponentState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._setComponentState(nextProps);
  }

  _setComponentState(props) {
    const { fairs: { Careerfair }, favorites } = props;
    const filteredFairs = [];

    for (let i = 0; i < Careerfair.length; i += 1) {
      const { companies } = Careerfair[i];
      const filteredCompanies = companies.filter(company => favorites.includes(company.id));

      filteredFairs.push(filteredCompanies);
    }

    this.setState({
      filteredFairs
    });
  }

  render() {
    return <Profile {...this.state} />;
  }
}

export default Container;
