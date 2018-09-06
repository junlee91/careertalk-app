import React from 'react';
import { ScrollView, View } from 'react-native';
import FairItem from '../FairItem';
import { PoweredBy } from '../commons';

const FairList = (props) => {
  const { fairs: { Careerfair } } = props;

  return (
    <View style={{ paddingBottom: 16 }}>
      <ScrollView>
        {Careerfair.map(f => (
          <FairItem key={f.id} fair={f} />
        ))}
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </View>
  );
};

export default FairList;
