import React, { Fragment } from 'react';
import Profile from './presenter';

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      filteredFairs: [],
      firstName: '',
      lastName: '',
      profilePhoto: '',
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { firstName, lastName, profilePhoto } = this.props;

    this.setState({
      firstName,
      lastName,
      profilePhoto,
    });
    // this._setComponentState(this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   this._setComponentState(nextProps);
  // }

  // _setComponentState(props) {
  //   const { fairs: { Careerfair }, favorites } = props;
  //   const filteredFairs = [];
  //   let isFavoritePresent = false;

  //   for (let i = 0; i < Careerfair.length; i += 1) {
  //     const { companies } = Careerfair[i];
  //     const filteredCompanies = companies.filter(company => favorites.includes(company.id));

  //     if (filteredCompanies.length > 0) {
  //       isFavoritePresent = true;
  //     }
  //     filteredFairs.push(filteredCompanies);
  //   }

  //   this.setState({
  //     filteredFairs,
  //     isFavoritePresent
  //   });
  // }

  render() {
    const { filteredFairs } = this.state;
    return <Fragment>{filteredFairs && <Profile {...this.state} />}</Fragment>;
  }
}

export default Container;
