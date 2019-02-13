import React from 'react';
import { Button } from 'react-native-elements';

const LoginButton = props => (
  <Button
    style={{ width: 220, height: 48 }}
    titleStyle={{ fontFamily: 'Avenir Next', fontSize: 15 }}
    raised
    title={props.title}
    type="outline"
    onPress={props.onPress}
  />
);

export { LoginButton };
