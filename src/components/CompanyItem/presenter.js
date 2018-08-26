import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';

import { Card, CardSection } from '../commons';

const CompanyItem = (props) => {
  const { company, navigateTo } = props;

  return (
    <Card>
      <View style={styles.companyItemStyle}>
        <View style={{ flex: 1 }}>
          <CardSection>
            <Image source={require('../../img/google.png')} style={styles.imgStyle} />
          </CardSection>
        </View>
        <View style={{ flex: 4 }}>
          <CardSection>
            <TouchableOpacity onPress={() => navigateTo('companyDetail')}>
              <View style={styles.companyContentStyle}>
                <Text style={styles.companyNameTextStyle}>{company.name}</Text>
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
  imgStyle: {
    height: 50,
    width: 50
  },
  companyItemStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  companyNameTextStyle: {
    height: 30,
    fontSize: 15
  }
};

export default CompanyItem;
