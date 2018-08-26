import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state) => {
  const {
    user: { company }
  } = state;

  return {
    company
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanyList: () => {
    dispatch(userActions.getCompanyList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
