import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';

import { Card, CardSection, Label, LogoImage, FavButton, NoteIcon } from '../commons';
import styles from './styles';

export default ({
  employer,
  isLiked,
  isNoted,
  hiringMajors,
  hiringTypes,
  visaSupport,
  featured,
  showNote,
  showLike,
  showLabel
}) => {
  return (
    <Card>
      <View style={styles.companyItemStyle}>
        <View style={{ flex: 1 }}>
          <CardSection>
            <View style={styles.logoStyle}>
              <TouchableOpacity onPress={() => console.log('navigate to employer detail')}>
                <LogoImage {...employer} size="small" />
              </TouchableOpacity>
            </View>
          </CardSection>
        </View>
        <View style={showLabel ? { flex: 4 } : { flex: 3 }}>
          <CardSection>
            <EmployerField
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
              {showLike && <FavIcon isLiked={isLiked} />}
            </View>
          </CardSection>
        </View>
      </View>
    </Card>
  );
};

const EmployerField = ({ employer, showLabel, hiringMajors, hiringTypes, visaSupport }) => (
  <TouchableOpacity onPress={() => console.log('navigate to employer detail')}>
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

const FavIcon = ({ isLiked }) => (
  <TouchableOpacity onPressOut={() => console.log('toggle like')}>
    <FavButton isLiked={isLiked} />
  </TouchableOpacity>
);