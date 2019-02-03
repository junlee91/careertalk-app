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
  likeCompany: (cmpId, fairId) => {
    return dispatch(companyActions.likeCompany(cmpId, fairId));
  },
  unlikeCompany: (cmpId, fairId) => {
    return dispatch(companyActions.unlikeCompany(cmpId, fairId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
