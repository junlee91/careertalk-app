import { connect } from 'react-redux';
import Container from './loginContainer';
import { actionCreators as authActions } from '../../redux/modules/auth';

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state;

  return {
    isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => ({
  socialLogin: (info, socialProvider) => {
    dispatch(authActions.socialLogin(info, socialProvider));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
