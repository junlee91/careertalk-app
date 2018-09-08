import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';

import { Card, CardSection, Label, LogoImage, FavButton, NoteIcon } from '../commons';

const CompanyItem = (props) => {
  const { company } = props;

  return (
    <Card>
      <View style={styles.companyItemStyle}>
        <View style={{ flex: 1 }}>
          <CardSection>
            <View style={styles.logoStyle}>
              <LogoImage {...company} size="small" />
            </View>
          </CardSection>
        </View>
        <View style={{ flex: 4 }}>
          <CardSection>
            <EmployerField {...props} />
          </CardSection>
        </View>
        <View style={{ flex: 1 }}>
          <CardSection>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginRight: 10 }}>
              <NoteIcon visible={props.isNote} />
              {props.displayLike && <FavIcon {...props} />}
            </View>
          </CardSection>
        </View>
      </View>
    </Card>
  );
};

const EmployerField = props => (
  <TouchableOpacity onPress={() => props.navigateTo('companyDetail')}>
    <View style={styles.companyContentStyle}>
      <Text style={styles.companyNameTextStyle} numberOfLines={1} ellipsizeMode="tail">
        {props.company.name}
      </Text>
    </View>
    <View style={styles.labelContentStyle}>
      <Label {...props.company} />
    </View>
  </TouchableOpacity>
);

const FavIcon = props => (
  <TouchableOpacity onPressOut={props.handleLike}>
    <FavButton isLiked={props.isLiked} />
  </TouchableOpacity>
);

const styles = {
  companyContentStyle: {},
  companyItemStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  logoStyle: {
    ...Platform.select({
      android: {
        alignSelf: 'center'
      }
    })
  },
  companyNameTextStyle: {
    height: 30,
    fontSize: 20,
    fontFamily: 'Avenir Next'
  },
  labelContentStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
    marginTop: 3
  }
};

export default CompanyItem;
