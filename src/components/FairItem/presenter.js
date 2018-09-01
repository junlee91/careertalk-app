import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Card, CardSection } from '../commons';

const FairItem = (props) => {
  return (
    <Card>
      <CardSection>
        <FairHeader {...props} />
      </CardSection>
    </Card>
  );
};

const FairHeader = props => (
  <TouchableOpacity onPress={() => props.navigateTo('companyList', props.fair.id)}>
    <View>
      <Text>{props.fair.name}</Text>
    </View>
  </TouchableOpacity>
);

export default FairItem;
