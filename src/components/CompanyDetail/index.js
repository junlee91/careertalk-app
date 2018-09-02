import { connect } from 'react-redux';
import Container from './container';

const mapStateToProps = (state) => {
  const { user: { fairs } } = state;
  return {
    fairs
  };
};

export default connect(mapStateToProps)(Container);
