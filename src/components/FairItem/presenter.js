import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Card, CardSection, Label, LogoImage, FavButton } from '../commons';

const FairItem = (props) => {
  const { fair } = props;

  return (
    <Card>
      <CardSection>
        <Text>{fair.name}</Text>
      </CardSection>
    </Card>
  );
};

export default FairItem;
