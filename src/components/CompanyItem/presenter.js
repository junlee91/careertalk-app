import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import { Badge } from 'react-native-elements';

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
              <View style={{ flexDirection: 'row', marginBottom: 3, marginTop: 3 }}>
                <Badge containerStyle={{ marginLeft: 5, marginRight: 5, backgroundColor: '#487eb0' }} />
                <Badge containerStyle={{ marginLeft: 5, marginRight: 5, backgroundColor: '#e1b12c' }} />
                <Badge containerStyle={{ marginLeft: 5, marginRight: 5, backgroundColor: '#0097e6' }} />
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
