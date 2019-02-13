import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapStateToProps = (state) => {
  const { company: { employers, favorites, notes, currentFair } } = state;
  return {
    employers,
    notes,
    favorites,
    currentFair,
  };
};

const mapDispatchToProps = dispatch => ({
  v2_getEmployers: (fairId) => {
    dispatch(companyActions.v2_getEmployers(fairId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
