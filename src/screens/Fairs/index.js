import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as companyActions } from '../../redux/modules/user';

const mapStateToProps = (state) => {
  const { company: { fairs } } = state;

  return {
    fairs
  };
};

const mapDispatchToProps = dispatch => ({
  getFairs: () => {
    dispatch(companyActions.getFairs());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
