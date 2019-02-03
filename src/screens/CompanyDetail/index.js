import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapStateToProps = (state) => {
  const {
    company: { fairs, favorites },
    auth: { socialProvider }
  } = state;
  return {
    fairs,
    favorites,
    socialProvider
  };
};

const mapDispatchToProps = dispatch => ({
  likeCompany: (cmpId, fairId) => {
    return dispatch(companyActions.likeCompany(cmpId, fairId));
  },
  unlikeCompany: (cmpId, fairId) => {
    return dispatch(companyActions.unlikeCompany(cmpId, fairId));
  },
  saveNote: (cmpId, note) => {
    dispatch(companyActions.setNote(cmpId, note));
  },
  deleteNote: (cmpId) => {
    dispatch(companyActions.popNote(cmpId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
