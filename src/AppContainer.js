import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PublicRouter, PrivateRouter } from './Router';

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state;

  return {
    isLoggedIn
  };
};

class App extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return this.props.isLoggedIn ? <PrivateRouter /> : <PublicRouter />;
  }
}

export default connect(mapStateToProps)(App);
