import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapStateToProps = (state) => {
  const { company: { favorites, notes, numOfFavorites, numOfNotes } } = state;
  return {
    favorites,
    notes,
    numOfFavorites,
    numOfNotes
  };
};

const mapDispatchToProps = dispatch => ({
  likeCompany: (cmpId) => {
    dispatch(companyActions.likeCompany(cmpId));
  },
  unlikeCompany: (cmpId) => {
    dispatch(companyActions.unlikeCompany(cmpId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
