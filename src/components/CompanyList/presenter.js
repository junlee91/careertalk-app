import React from 'react';
import { ScrollView } from 'react-native';

import CompanyDetail from '../CompanyDetail';

const CompanyList = (props) => {
  const { company } = props;

  return (
    <ScrollView>
      {company.map(c => (
        <CompanyDetail key={c.id} company={c} />
      ))}
    </ScrollView>
  );
};

export default CompanyList;
