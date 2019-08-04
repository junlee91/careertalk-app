import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import FairItem from '../../components/FairItem';
import { PoweredBy } from '../../components/commons';

export default ({ fairs }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {fairs.map(f => (
          <FairItem key={f.id} fair={f} />
        ))}
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};
