import React from 'react';
import { View, Text } from 'react-native';

const PoweredBy = (props) => {
  const { poweredby } = props;

  return (
    <View style={styles.poweredByView}>
      <Text style={styles.poweredByText}>{poweredby}</Text>
    </View>
  );
};

const styles = {
  poweredByView: {
    backgroundColor: '#dcdde1',
  },
  poweredByText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#99a8a8',
    fontFamily: 'Avenir Next',
  },
};

export { PoweredBy };
