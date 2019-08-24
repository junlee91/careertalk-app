import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, Caption } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

import { LogoImage, InfoBox, Tag, FavButton, PoweredBy, BackIcon } from '../../components/commons';
import { MapIcon } from '../../components/FairMap';
import styles from './styles';

const CompanyDetail = ({
  companyInfo,
  fairInfo,
  note,
  isEditting,
  onInputFocus,
  onInputChange,
  handleSave,
  noteLoading,
  toggleLike,
  isLikedS,
  socialProvider
}) => {
  const tables = companyInfo.tables.join(', ');

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'android' && <CrossButton />}
      <ScrollView keyboardDismissMode="on-drag">
        {Platform.OS === 'ios' && <CrossButton />}
        <InfoBox>
          <View style={styles.titleContent}>
            <LogoImage {...companyInfo.employer} size="medium" wide />
            <Text style={styles.titleTextStyle}>{companyInfo.employer.name}</Text>
            {companyInfo.tables.length > 0 && fairInfo && fairInfo.map_url && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Caption>
                  {companyInfo.tables.length === 1 ? `Table: ${tables}` : `Tables: ${tables}`}
                </Caption>
                <MapIcon
                  fairId={fairInfo.id}
                  companyName={companyInfo.employer.name}
                  tables={tables}
                  mapUrl={fairInfo.map_url}
                />
              </View>
            )}
          </View>
        </InfoBox>
        <InfoBox>
          <NoteInfo
            note={note}
            isEditting={isEditting}
            onInputFocus={onInputFocus}
            onInputChange={onInputChange}
            handleSave={handleSave}
            noteLoading={noteLoading}
          />
        </InfoBox>
        <InfoBox>{fairInfo && <EventInfo companyInfo={companyInfo} fairInfo={fairInfo} />}</InfoBox>
        <InfoBox>
          <DetailInfo {...companyInfo} />
        </InfoBox>
        <PoweredBy poweredby="Logos provided by Clearbit" />
      </ScrollView>
      {socialProvider && (
        <TouchableOpacity
          onPressOut={toggleLike}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            position: 'absolute',
            bottom: 40,
            right: 15,
            backgroundColor: isLikedS ? '#ffdde9' : '#fff',
            borderRadius: 100,
            zIndex: 5
          }}
        >
          <FavButton isLiked={isLikedS} size={35} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const NoteInfo = ({ note, noteLoading, isEditting, onInputFocus, onInputChange, handleSave }) => {
  return (
    <View style={{ flex: 1 }}>
      {noteLoading ? (
        <ActivityIndicator />
      ) : (
        <TextInput
          mode={isEditting ? 'outlined' : null}
          label="Note"
          placeholder="Make note"
          placeholderTextColor="grey"
          value={note}
          onChangeText={onInputChange}
          autoCorrect={false}
          multiline
          onFocus={onInputFocus}
          onBlur={onInputFocus}
          onEndEditing={handleSave}
        />
      )}
    </View>
  );
};

const EventInfo = ({ companyInfo, fairInfo }) => {
  const fairDate = new Date(fairInfo.date).toDateString();
  const timeString = `${fairInfo.start_time} - ${fairInfo.end_time}`;
  const dateString = `${fairDate} ${timeString}`;

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Icon name="calendar" type="entypo" />
        <Text style={{ marginLeft: 20 }}>{dateString}</Text>
      </View>
      <Text style={styles.textStyle}>{fairInfo.name}</Text>
      <Text
        style={styles.hrefTextStyle}
        onPress={() => Linking.openURL(`http://${companyInfo.employer.company_url}`)}
      >
        http://
        {companyInfo.employer.company_url}
      </Text>
    </View>
  );
};

const DetailInfo = ({ hiring_majors, hiring_types, degree_requirements, visa_support }) => {
  return (
    <View style={{ minHeight: 250, justifyContent: 'center' }}>
      <Text style={styles.detailTextStyle}>We are hiring</Text>
      <View style={styles.tagStyle}>
        {hiring_types.map(type => (
          <Tag key={type} type={type} color="#487eb0" />
        ))}
      </View>
      <Text style={styles.detailTextStyle}>Majors</Text>
      <View style={styles.tagStyle}>
        {hiring_majors.map(type => (
          <Tag key={type} type={type} color="#e1b12c" />
        ))}
      </View>
      <Text style={styles.detailTextStyle}>Degrees</Text>
      <View style={styles.tagStyle}>
        {degree_requirements.map(type => (
          <Tag key={type} type={type} color="#22a6b3" />
        ))}
      </View>
      {visa_support === 'yes' && (
        <Text style={styles.detailTextStyle}>F1/H1B Sponsor Supported</Text>
      )}
    </View>
  );
};

const CrossButton = () => (
  <TouchableOpacity
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      position: 'absolute',
      right: 1,
      borderRadius: 50,
      zIndex: 5
    }}
    onPressOut={() => Actions.pop()}
  >
    <BackIcon />
  </TouchableOpacity>
);

export default CompanyDetail;
