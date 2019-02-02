import { connect } from 'react-redux';
import Container from './summaryContainer';

const mapStateToProps = (state) => {
  const { auth: { socialProvider } } = state;

  return {
    socialProvider,
  };
};

export default connect(mapStateToProps)(Container);
