import React from 'react';
import { ScrollView, Text } from 'react-native';
import FairItem from '../FairItem';

const FairList = (props) => {
  const { fairs: { Careerfair } } = props;

  return (
    <ScrollView>
      {Careerfair.map(f => (
        <FairItem key={f.id} fair={f} />
      ))}
    </ScrollView>
  );
};

export default FairList;
