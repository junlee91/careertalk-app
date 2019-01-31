import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapDispatchToProps = dispatch => ({
  setCurrentFair: (fairId) => {
    dispatch(companyActions.setCurrentFair(fairId));
  },
});

export default connect(null, mapDispatchToProps)(Container);
