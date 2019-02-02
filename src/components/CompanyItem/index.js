import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapStateToProps = (state) => {
  const {
    company: { favorites, notes, numOfFavorites, numOfNotes },
    auth: { socialProvider }
  } = state;

  return {
    favorites,
    notes,
    numOfFavorites,
    numOfNotes,
    socialProvider
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
