import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';


const mapStateToProps = (state) => {
  const { user: { fairs, favorites, notes } } = state;
  return {
    fairs,
    favorites,
    notes,
  };
};

const mapDispatchToProps = dispatch => ({
  likeCompany: (cmpId) => {
    dispatch(userActions.likeCompany(cmpId));
  },
  unlikeCompany: (cmpId) => {
    dispatch(userActions.unlikeCompany(cmpId));
  },
  saveNote: (cmpId, note) => {
    dispatch(userActions.setNote(cmpId, note));
  },
  deleteNote: (cmpId) => {
    dispatch(userActions.popNote(cmpId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
