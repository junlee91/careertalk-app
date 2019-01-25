import { connect } from 'react-redux';
import { actionCreators as authActions } from '../../redux/modules/auth';
import settings from './settings';

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn, socialProvider } } = state;

  return {
    isLoggedIn,
    socialProvider,
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(authActions.logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(settings);
