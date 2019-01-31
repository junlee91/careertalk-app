import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/company';

const mapStateToProps = (state) => {
  const { company: { fairs } } = state;

  return {
    fairs
  };
};

const mapDispatchToProps = dispatch => ({
  v2_getFairs: () => {
    dispatch(companyActions.v2_getFairs());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
