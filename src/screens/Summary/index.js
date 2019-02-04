import { connect } from 'react-redux';
import Container from './summaryContainer';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapStateToProps = (state) => {
  const { auth: { socialProvider }, company: { currentFair, topList } } = state;

  return {
    socialProvider,
    currentFair,
    topList,
  };
};

const mapDispatchToProps = dispatch => ({
  v2_getTop5: (fairId) => {
    dispatch(companyActions.v2_getTop5(fairId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
