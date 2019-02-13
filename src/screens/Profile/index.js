import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { actionCreators as authActions } from '../../redux/modules/auth';

import Container from './container';

const mapStateToProps = (state) => {
  const {
    auth: { isLoggedIn, socialProvider },
    company: { employers, fairs, favorites },
    user: { firstName, lastName, profilePhoto }
  } = state;
  return {
    employers,
    favorites,
    fairs,
    firstName,
    lastName,
    profilePhoto,
    socialProvider,
    isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(authActions.logout());
  }
});

export const ProfileIcon = () => {
  return (
    <TouchableOpacity onPressOut={() => Actions.push('profile')}>
      <Icon
        name="md-person"
        type="ionicon"
        containerStyle={{ paddingHorizontal: 10, marginHorizontal: 5 }}
      />
    </TouchableOpacity>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
