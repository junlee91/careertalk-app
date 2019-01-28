import React from 'react';
import { Chip } from 'react-native-paper';

const ChipButton = (props) => {
  return (
    <Chip
      style={{ marginHorizontal: 5, marginVertical: 1, padding: 3 }}
      mode="outlined"
      onPress={() => props.onPress(props.type, props.field.label)}
      selected={props.selected}
    >
      {props.field.name}
    </Chip>
  );
};

export { ChipButton };
