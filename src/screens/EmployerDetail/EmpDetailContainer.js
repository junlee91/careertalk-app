import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { FAIRS_LOCAL, GET_NOTE, SAVE_NOTE, DELETE_NOTE } from './EmpDetailQueries';
import EmpDetailPresenter from './EmpDetailPresenter';

const Container = ({ companyInfo, state, actions }) => {
  const [fairInfo, setFairInfo] = useState(null);
  /** note state */
  const [isEditting, setIsEditting] = useState(false);
  const [note, setNote] = useState(null);
  const [originalNote, setOriginalNote] = useState(null);

  /** get current fair info from cache */
  const { data: { getFairCache } } = useQuery(FAIRS_LOCAL, { fetchPolicy: 'cache-only' });

  useEffect(() => {
    const filtered = getFairCache.filter(({ id }) => id === companyInfo.careerfair_id);
    if (filtered.length === 1) {
      setFairInfo(filtered[0]);
    }
  }, [getFairCache]);

  /** Note graphql */
  const [saveNoteMutation] = useMutation(SAVE_NOTE);
  const [deleteNoteMutation] = useMutation(DELETE_NOTE);
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

  const handleSave = async () => {
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
    />
  );
};

export default Container;
