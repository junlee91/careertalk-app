import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';


const mapStateToProps = (state) => {
  const { company: { fairs, favorites } } = state;
  return {
    fairs,
    favorites,
  };
};

const mapDispatchToProps = dispatch => ({
  likeCompany: (cmpId) => {
    dispatch(companyActions.likeCompany(cmpId));
  },
  unlikeCompany: (cmpId) => {
    dispatch(companyActions.unlikeCompany(cmpId));
  },
  saveNote: (cmpId, note) => {
    dispatch(companyActions.setNote(cmpId, note));
  },
  deleteNote: (cmpId) => {
    dispatch(companyActions.popNote(cmpId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
