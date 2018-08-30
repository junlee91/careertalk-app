// Fairs index.
import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state) => {
  const { user: { fairs } } = state;

  return {
    fairs
  };
};

const mapDispatchToProps = dispatch => ({
  getFairs: () => {
    dispatch(userActions.getFairs());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
