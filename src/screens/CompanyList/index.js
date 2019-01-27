import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapStateToProps = (state) => {
  const { company: { company, fairs, favorites, notes } } = state;
  return {
    company,
    fairs,
    notes,
    favorites,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanyList: (fair_id) => {
    dispatch(companyActions.getCompanyList(fair_id));
  },
  getFairs: () => {
    dispatch(companyActions.getFairs());
  },
  demoGetCompany: () => {
    dispatch(companyActions.demoGetCompany());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
