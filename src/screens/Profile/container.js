import React from 'react';
import { GoogleSignin } from 'react-native-google-signin';

import Profile from './presenter';

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      profilePhoto: ''
    };
  }

  componentDidMount() {
    this._setComponentState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._setComponentState(nextProps);
  }

  _googleSignOut = async () => {
    try {
      // Finish Google Session
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Clear auth state
      this.props.logout();
    } catch (error) {
      console.error(error);
    }
  };

  _logOutPressed = () => {
    const { socialProvider, logout } = this.props;

    if (socialProvider === 'google') {
      this._googleSignOut();
    } else {
      logout();
    }
  };

  _setComponentState(props) {
    const {
      firstName,
      lastName,
      profilePhoto,
      favorites,
      fairs: { fairs },
      employers,
      socialProvider
    } = props;

    if (socialProvider) {
      const keys = Object.keys(employers);
      const filteredEmployers = [];
      let isFavoritePresent = false;

      for (let i = 0; i < keys.length; i += 1) {
        const fairId = keys[i];
        let employersList = employers[fairId];

        employersList = employersList.filter(e => favorites[fairId].includes(e.employer.id));

        if (employersList.length) {
          isFavoritePresent = true;
        }

        filteredEmployers.push(
          Object.assign(
            {
              fair: fairs.filter(f => f.id === parseInt(fairId, 10))[0]
            },
            { employersList }
          )
        );
      }

      this.setState({
        firstName,
        lastName,
        profilePhoto,
        filteredEmployers,
        isFavoritePresent
      });
    } else {
      this.setState({
        firstName,
        lastName,
        profilePhoto,
        anonUser: true
      });
    }
  }

  render() {
    return <Profile {...this.state} logOutPressed={this._logOutPressed} />;
  }
}

export default Container;
