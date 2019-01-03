import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import FairItem from '../../components/FairItem';
import { PoweredBy } from '../../components/commons';

const FairList = (props) => {
  const { fairs: { Careerfair } } = props;

  return (
    <SafeAreaView style={{ paddingBottom: 16 }}>
      <ScrollView>
        {Careerfair.map(f => (
          <FairItem key={f.id} fair={f} />
        ))}
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};

export default FairList;
