import React from 'react';
import { ScrollView } from 'react-native';

import CompanyItem from '../CompanyItem';

const CompanyList = (props) => {
  const { company: { Company } } = props;

  return (
    <ScrollView>
      {Company.map(c => (
        <CompanyItem key={c.id} company={c} />
      ))}
    </ScrollView>
  );
};

export default CompanyList;
