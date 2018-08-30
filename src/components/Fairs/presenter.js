import React from 'react';
import { ScrollView, Text } from 'react-native';

const FairList = (props) => {
  const { fairs: { Careerfair } } = props;

  return (
    <ScrollView>
      {Careerfair.map(f => (
        <Text>{f.name}</Text>
      ))}
    </ScrollView>
  );
};

export default FairList;
