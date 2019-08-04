import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import FairItem from '../../components/FairItem';
import { PoweredBy } from '../../components/commons';

export default ({ careerFairs }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {careerFairs.map(f => (
          <FairItem key={f.id} fair={f} />
        ))}
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </SafeAreaView>
  );
};
