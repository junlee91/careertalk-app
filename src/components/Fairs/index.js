import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Spinner } from '../commons';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state) => {
  const { user: { fairs } } = state;

  return {
    fairs
  };
};

const mapDispatchToProps = dispatch => ({
  getFairs: () => {
    dispatch(userActions.getFairs());
  }
});

// This is just base implementation of Fairs component.
// Fill free to restructure files and components!!
class Fairs extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { getFairs } = this.props;

    getFairs();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.fairs) {
      this.setState({
        loading: false,
        fairs: nextProps.fairs
      });

      // Check it on Debug console
      console.log(nextProps.fairs);
    }
  };

  render() {
    const { loading } = this.state;

    return <Fragment>{loading ? <Spinner size="large" /> : null }</Fragment>; // TODO: null -> List of career fairs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fairs);
