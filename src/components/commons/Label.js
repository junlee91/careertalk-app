import React, { Fragment } from 'react';
import { Badge } from 'react-native-elements';

const Label = (props) => {
  const hiringTypes = props.hiring_types.join(', ');
  const hiringMajors = props.hiring_majors.join(', ');
  const sponsor = props.visa === 'yes';

  return (
    <Fragment>
      <Badge
        value={hiringTypes}
        containerStyle={{ marginRight: 5, marginBottom: 3, backgroundColor: '#487eb0' }}
        textStyle={{ fontSize: 11 }}
      />
      <Badge
        value={hiringMajors}
        containerStyle={{ marginRight: 5, marginBottom: 3, backgroundColor: '#e1b12c' }}
        textStyle={{ fontSize: 11 }}
      />
      {sponsor && (
        <Badge
          value="F1"
          containerStyle={{ marginRight: 5, marginBottom: 3, backgroundColor: '#1abc9c' }}
          textStyle={{ fontSize: 11 }}
        />
      )}
    </Fragment>
  );
};

export { Label };
