import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Card, CardSection, Label, LogoImage, FavButton, NoteIcon } from '../commons';
import styles from './styles';

export default ({
  navigateTo,
  employer,
  isLiked,
  isNoted,
  hiringMajors,
  hiringTypes,
  visaSupport,
  featured,
  showNote,
  showLike,
  showLabel,
  likeCompany,
}) => {
  return (
    <Card>
      <View style={styles.companyItemStyle}>
        <View style={{ flex: 1 }}>
          <CardSection>
            <View style={styles.logoStyle}>
              <TouchableOpacity onPress={() => navigateTo('employerDetail')}>
                <LogoImage {...employer} size="small" />
              </TouchableOpacity>
            </View>
          </CardSection>
        </View>
        <View style={showLabel ? { flex: 4 } : { flex: 3 }}>
          <CardSection>
            <EmployerField
              navigateTo={navigateTo}
              employer={employer}
              showLabel={showLabel}
              hiringMajors={hiringMajors}
              hiringTypes={hiringTypes}
              visaSupport={visaSupport}
            />
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
              {showNote && <NoteIcon visible={isNoted} />}
              {showLike && <FavIcon isLiked={isLiked} likeCompany={likeCompany} />}
            </View>
          </CardSection>
        </View>
      </View>
    </Card>
  );
};

const EmployerField = ({ navigateTo, employer, showLabel, hiringMajors, hiringTypes, visaSupport }) => (
  <TouchableOpacity onPress={() => navigateTo('employerDetail')}>
    <View style={styles.companyContentStyle}>
      <Text style={styles.companyNameTextStyle} numberOfLines={1} ellipsizeMode="tail">
        {employer.name}
      </Text>
    </View>
    {showLabel && (
      <View style={styles.labelContentStyle}>
        <Label hiringMajors={hiringMajors} hiringTypes={hiringTypes} visaSupport={visaSupport} />
      </View>
    )}
  </TouchableOpacity>
);

const FavIcon = ({ isLiked, likeCompany }) => (
  <TouchableOpacity onPressOut={likeCompany}>
    <FavButton isLiked={isLiked} />
  </TouchableOpacity>
);
