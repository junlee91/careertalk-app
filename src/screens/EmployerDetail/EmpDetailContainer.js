import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';

import { FAIRS_LOCAL } from './EmpDetailQueries';
import EmpDetailPresenter from './EmpDetailPresenter';

const Container = props => {
  const [fairInfo, setFairInfo] = useState(null);
  /** note state */
  const [isEditting, setIsEditting] = useState(false);
  const [note, setNote] = useState(null);

  const { companyInfo } = props;
  const { data: { getFairCache } } = useQuery(FAIRS_LOCAL, { fetchPolicy: 'cache-only' });

  useEffect(() => {
    const filtered = getFairCache.filter(({ id }) => id === companyInfo.careerfair_id);
    if (filtered.length === 1) {
      setFairInfo(filtered[0]);
    }
  }, [getFairCache]);

  const onInputFocus = () => {
    setIsEditting(!isEditting);
  };

  const onInputChange = text => {
    setNote(text);
  };

  const handleSave = () => {
    console.log('Should save or delete note');
    console.log(note);
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
    />
  );
};

export default Container;
