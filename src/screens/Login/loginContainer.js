import React from 'react';
import LoginPage from './loginPresenter';

class Container extends React.Component {
  state = {
    username: '',
    password: '',
    isSubmitting: false
  };

  _changeUsername = (text) => {
    this.setState({ username: text });
  };

  _changePassword = (text) => {
    this.setState({ password: text });
  };

  _submit = async () => {
    console.log('login submit');
  };

  render() {
    return (
      <LoginPage
        {...this.state}
        changeUsername={this._changeUsername}
        changePassword={this._changePassword}
        submit={this._submit}
      />
    );
  }
}

export default Container;
