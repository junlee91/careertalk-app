import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state) => {
  const { user: { company, fairs, favorites, notes } } = state;
  return {
    company,
    fairs,
    notes,
    favorites,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanyList: (fair_id) => {
    dispatch(userActions.getCompanyList(fair_id));
  },
  getFairs: () => {
    dispatch(userActions.getFairs());
  },
  demoGetCompany: () => {
    dispatch(userActions.demoGetCompany());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
