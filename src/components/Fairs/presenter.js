import React from 'react';
import { ScrollView, View } from 'react-native';
import FairItem from '../FairItem';
import { PoweredBy } from '../commons';

const FairList = (props) => {
  const { fairs: { Careerfair } } = props;

  return (
    <View>
      <PoweredBy poweredby="Logos provided by Clearbit" />
      <ScrollView>
        {Careerfair.map(f => (
          <FairItem key={f.id} fair={f} />
        ))}
      </ScrollView>
    </View>
  );
};

export default FairList;
