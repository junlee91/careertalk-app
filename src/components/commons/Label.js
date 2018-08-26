import React, { Fragment } from 'react';
import { Badge } from 'react-native-elements';

const Label = (props) => {
  const hiring = props.hiring.join(' ');
  const degrees = props.degrees.join(' ');
  const sponsor = props.visasponser;

  return (
    <Fragment>
      <Badge value={hiring} containerStyle={{ marginRight: 5, backgroundColor: '#487eb0' }} />
      <Badge value={degrees} containerStyle={{ marginRight: 5, backgroundColor: '#e1b12c' }} />
      {sponsor && <Badge value="F1" containerStyle={{ marginRight: 5, backgroundColor: '#0097e6' }} />}
    </Fragment>
  );
};

export { Label };
