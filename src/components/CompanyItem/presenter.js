import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Card, CardSection, Label, LogoImage, FavButton } from '../commons';

const CompanyItem = (props) => {
  const { company } = props;

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
            <EmployerField {...props} />
          </CardSection>
        </View>
        <View style={{ flex: 1 }}>
          <CardSection>
            <AddIcon {...props} />
          </CardSection>
        </View>
      </View>
    </Card>
  );
};

const EmployerField = props => (
  <TouchableOpacity onPress={() => props.navigateTo('companyDetail')}>
    <View style={styles.companyContentStyle}>
      <Text style={styles.companyNameTextStyle}>{props.company.name}</Text>
    </View>
    <View style={styles.labelContentStyle}>
      <Label {...props.company} />
    </View>
  </TouchableOpacity>
);

const AddIcon = props => (
  <TouchableOpacity onPressOut={props.handleLike}>
    <FavButton isLiked={props.isLiked} />
  </TouchableOpacity>
);

const styles = {
  companyItemStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  companyNameTextStyle: {
    height: 30,
    fontSize: 22,
    fontFamily: 'Avenir Next'
  },
  labelContentStyle: {
    flexDirection: 'row',
    marginBottom: 3,
    marginTop: 3
  }
};

export default CompanyItem;
