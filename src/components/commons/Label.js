import React, { Fragment } from 'react';
import { Badge } from 'react-native-elements';

const Label = (props) => {
  const hiringTypes = props.hiringTypes.join(', ');
  const hiringMajors = props.hiringMajors.join(', ');
  const sponsor = props.visaSupport === 'yes';

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

const Tag = (props) => {
  return (
    <Badge
      value={props.type}
      containerStyle={{ marginVertical: 1, marginHorizontal: 5, backgroundColor: props.color }}
      textStyle={{ fontSize: 15 }}
    />
  );
};

export { Label, Tag };
