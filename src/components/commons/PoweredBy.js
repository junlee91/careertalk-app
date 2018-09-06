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
    backgroundColor: '#dcdde1'
  },
  poweredByText: {
    textAlign: 'center',
    fontSize: 11,
    color: 'black',
    fontFamily: 'Avenir Next'
  }
};

export { PoweredBy };
