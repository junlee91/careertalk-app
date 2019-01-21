import React from 'react';
import LoginPage from './loginPresenter';

class Container extends React.Component {
  state = {
    username: '',
    password: '',
    isSubmitting: false,
    profilePhoto: null,
    fbId: null,
    token: null
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

  _saveToken = (token) => {
    this.setState({
      token
    });
  };

  // Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.error(error.toString());
    } else {
      // result.picture.data.url => profile photo
      // result.id => fbId
      // result.name => username
      this.setState({
        profilePhoto: result.picture.data.url
      });
    }
  };

  render() {
    return (
      <LoginPage
        {...this.state}
        changeUsername={this._changeUsername}
        changePassword={this._changePassword}
        submit={this._submit}
        saveToken={this._saveToken}
        fbCallback={this._responseInfoCallback}
      />
    );
  }
}

export default Container;
