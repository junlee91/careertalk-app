import React, { Component } from 'react';

import CompanyDetail from './presenter';

class Container extends Component {
  componentWillMount() {
    const { companyInfo, favorites, note, fairs: { fairs }, socialProvider } = this.props;
    const isLiked = favorites.includes(companyInfo.id);
    const fairInfo = fairs[companyInfo.careerfair_id - 1];

    this.setState({
      companyInfo,
      isLiked,
      isEditting: false,
      new_note: note,
      fairInfo,
      socialProvider
    });
  }

  _handleLike = () => {
    const { isLiked, companyInfo } = this.state;
    const { likeCompany, unlikeCompany } = this.props;

    if (!isLiked) {
      likeCompany(companyInfo.id);
    } else {
      unlikeCompany(companyInfo.id);
    }

    this.setState({
      isLiked: !isLiked
    });
  };

  _handleEdit = (text) => {
    this.setState({
      new_note: text
    });
  };

  componentWillUnmount = () => {
    this._handleSave();
  };

  _inputFocus = () => {
    const { isEditting } = this.state;

    this.setState({
      isEditting: !isEditting
    });
  };

  _handleSave = () => {
    const { new_note, companyInfo } = this.state;
    const { saveNote, deleteNote } = this.props;

    if (!new_note) {
      deleteNote(companyInfo.id);
      return;
    }
    const noteToSave = new_note.trim();

    if (noteToSave.length === 0) {
      deleteNote(companyInfo.id);
    } else {
      saveNote(companyInfo.id, noteToSave);
    }
  };

  render() {
    return (
      <CompanyDetail
        {...this.state}
        {...this.props}
        inputFocus={this._inputFocus}
        handleLike={this._handleLike}
        handleEdit={this._handleEdit}
        handleSave={this._handleSave}
      />
    );
  }
}

export default Container;
