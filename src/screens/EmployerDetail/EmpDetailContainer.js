import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';

import { FAIRS_LOCAL, GET_NOTE } from './EmpDetailQueries';
import EmpDetailPresenter from './EmpDetailPresenter';

const Container = ({ companyInfo, state }) => {
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

  const { data: noteData, loading: noteLoading } = useQuery(GET_NOTE, {
    variables: {
      fairId: companyInfo.careerfair_id,
      employerId: companyInfo.employer.id
    },
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

  const handleSave = () => {
    if ((note === null || note === '') && originalNote) {
      console.log('Should delete the note');

      setOriginalNote(null);
    }

    if (originalNote !== note && note !== '') {
      console.log('Should save the note', note);

      setOriginalNote(note);
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
