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
              <TouchableOpacity onPress={() => props.navigateTo('companyDetail')}>
                <LogoImage {...company.employer} size="small" />
              </TouchableOpacity>
            </View>
          </CardSection>
        </View>
        <View style={props.displayLabel ? { flex: 4 } : { flex: 3 }}>
          <CardSection>
            <EmployerField {...props} />
          </CardSection>
        </View>
        <View style={{ flex: 1 }}>
          <CardSection>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginRight: 10
              }}
            >
              {props.displayNote && <NoteIcon visible={props.isNote} />}
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
        {props.company.employer.name}
      </Text>
    </View>
    {props.displayLabel && (
      <View style={styles.labelContentStyle}>
        <Label {...props.company} />
      </View>
    )}
  </TouchableOpacity>
);

const FavIcon = props => (
  <TouchableOpacity onPressOut={props.handleLike}>
    <FavButton isLiked={props.isLiked} />
  </TouchableOpacity>
);

const styles = {
  companyContentStyle: {
    paddingVertival: 10
  },
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
