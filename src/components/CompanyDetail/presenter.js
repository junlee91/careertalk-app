import React from 'react';
import { View, Text } from 'react-native';

const CompanyDetail = (props) => {
  const { companyInfo } = props;

  return (
    <View>
      <Text>{companyInfo.name}</Text>
    </View>
  );
};

export default CompanyDetail;
