import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Alert } from 'react-native';

import { FAIRS } from '../Fairs/fairsContainer';
import { GET_NOTE, SAVE_NOTE, DELETE_NOTE } from './EmpDetailQueries';
import { UPDATE_NUM_OF_NOTES, GET_SOCIAL_PROVIDER, LOCAL_LOG_OUT } from '../../Apollo/sharedQueries';
import EmpDetailPresenter from './EmpDetailPresenter';

const Container = ({ companyInfo, state, actions }) => {
  const [fairInfo, setFairInfo] = useState(null);
  /** note state */
  const [isEditting, setIsEditting] = useState(false);
  const [note, setNote] = useState(null);
  const [originalNote, setOriginalNote] = useState(null);

  /** Sign out state */
  const { data: { socialProvider } } = useQuery(GET_SOCIAL_PROVIDER);
  const [localLogoutMutation] = useMutation(LOCAL_LOG_OUT);

  /** Like State */
  const [isLikedS, setIsLiked] = useState(state.isLikedS);

  /** get current fair info from cache */
  const { data: { getFair } } = useQuery(FAIRS, { fetchPolicy: 'cache-only' });

  useEffect(() => {
    const filtered = getFair.filter(({ id }) => id === companyInfo.careerfair_id);
    if (filtered.length === 1) {
      setFairInfo(filtered[0]);
    }
  }, [getFair]);

  /** Note graphql */
  const [saveNoteMutation] = useMutation(SAVE_NOTE);
  const [deleteNoteMutation] = useMutation(DELETE_NOTE);
  const [updateNoteCountMutation] = useMutation(UPDATE_NUM_OF_NOTES);
  const { data: noteData, loading: noteLoading } = useQuery(GET_NOTE, {
    variables: {
      fairId: companyInfo.careerfair_id,
      employerId: companyInfo.employer.id
    },
    fetchPolicy: 'network-only',
    skip: !state.isNotedS,
  });

  // update the note state when it's ready
  useEffect(() => {
    if (noteData) {
      setNote(noteData.getNote);
      setOriginalNote(noteData.getNote);
    }
  }, [noteLoading]);

  const onInputFocus = () => {
    setIsEditting(!isEditting);
  };

  const onInputChange = text => {
    setNote(text);
  };

  const logOut = async () => {
    // Clear auth state
    // TODO: log out
    // await localLogoutMutation();
    // client.resetStore();
    console.log('Log out');
  }

  const showAlert = () => {
    Alert.alert(
      'Oops!',
      'Please sign in with Google to take note',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Sign out', onPress: logOut }
      ],
      { cancelable: false }
    );
  }

  const toggleLike = async () => {
    setIsLiked(!isLikedS);
    const result = await actions.likeCompany();

    // if toggle like request fails, revert back to original state
    if (!result) {
      setIsLiked(isLikedS);
    }
  }

  const handleSave = async () => {
    // only signed in users can take note
    if (socialProvider !== 'google') {
      showAlert();
      return;
    }

    const { setIsNoted } = actions;

    if ((note === null || note === '') && originalNote) {
      const { data: { deleteNote }, error: deleteError } = await deleteNoteMutation({
        variables: {
          fairId: companyInfo.careerfair_id,
          employerId: companyInfo.employer.id,
        },
      });
      // TODO: show toast message & handle error
      if (deleteError) {
        console.error(deleteError.message);
      } else {
        console.log(deleteNote.message);
        updateNoteCountMutation({
          variables: {
            mode: 'DELETE',
            employerId: companyInfo.employer.id
          }
        });
      }

      // clear the original note
      setOriginalNote(null);

      // update the employer card note icon
      setIsNoted(false);
    }

    if (originalNote !== note && note !== '') {
      const { data: { saveNote }, error: saveError } = await saveNoteMutation({
        variables: {
          fairId: companyInfo.careerfair_id,
          employerId: companyInfo.employer.id,
          content: note.trim()
        },
      });
      // TODO: show toast message & handle error
      if (saveError) {
        console.error(saveError.message);
      } else {
        console.log(saveNote.message);
        updateNoteCountMutation({
          variables: {
            mode: 'SAVE',
            employerId: companyInfo.employer.id
          }
        });
      }

      // update the original note to the saved note
      setOriginalNote(note);

      // update the employer card note icon
      setIsNoted(true);
    }
  };

  return (
    <EmpDetailPresenter
      companyInfo={companyInfo}
      fairInfo={fairInfo}
      note={note}
      isEditting={isEditting}
      onInputFocus={onInputFocus}
      onInputChange={onInputChange}
      handleSave={handleSave}
      noteLoading={noteLoading}
      isLikedS={isLikedS}
      socialProvider={socialProvider}
      toggleLike={toggleLike}
    />
  );
};

export default Container;
