import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Card, CardSection, Label, LogoImage } from '../commons';

const CompanyItem = (props) => {
  const { company, navigateTo } = props;

  return (
    <Card>
      <View style={styles.companyItemStyle}>
        <View style={{ flex: 1 }}>
          <CardSection>
            <LogoImage {...company} />
          </CardSection>
        </View>
        <View style={{ flex: 4 }}>
          <CardSection>
            <TouchableOpacity onPress={() => navigateTo('companyDetail')}>
              <View style={styles.companyContentStyle}>
                <Text style={styles.companyNameTextStyle}>{company.name}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 3, marginTop: 3 }}>
                <Label {...company} />
              </View>
            </TouchableOpacity>
          </CardSection>
        </View>
        <View style={{ flex: 1 }}>
          <CardSection>
            <TouchableOpacity>
              <Text>Add</Text>
            </TouchableOpacity>
          </CardSection>
        </View>
      </View>
    </Card>
  );
};

const styles = {
  companyItemStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  companyNameTextStyle: {
    height: 30,
    fontSize: 22,
    fontFamily: 'Avenir Next'
  }
};

export default CompanyItem;
