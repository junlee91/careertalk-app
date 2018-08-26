import React, { Component } from 'react';
import { View, Text } from 'react-native';

class CompanyDetail extends Component {
  render() {
    const { companyInfo } = this.props;

    return (
      <View>
        <Text>
          {companyInfo.name}
        </Text>
      </View>
    );
  }
}

export default CompanyDetail;
