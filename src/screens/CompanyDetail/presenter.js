import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, Caption } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

import { LogoImage, InfoBox, Tag, FavButton, PoweredBy, BackIcon } from '../../components/commons';
import { MapIcon } from '../../components/FairMap';

const CompanyDetail = (props) => {
  const { companyInfo, fairInfo } = props;
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
          <NoteInfo {...props} />
        </InfoBox>
        <InfoBox>
          {fairInfo && <EventInfo {...props} />}
        </InfoBox>
        <InfoBox>
          <DetailInfo {...companyInfo} />
        </InfoBox>
        <PoweredBy poweredby="Logos provided by Clearbit" />
      </ScrollView>
      {props.socialProvider && (
        <TouchableOpacity
          onPressOut={props.handleLike}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            position: 'absolute',
            bottom: 30,
            right: 15,
            backgroundColor: props.isLiked ? '#ffdde9' : '#fff',
            borderRadius: 100,
            zIndex: 5
          }}
        >
          <FavButton isLiked={props.isLiked} size={35} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const NoteInfo = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        mode={props.isEditting ? 'outlined' : null}
        label="Note"
        placeholder="Make note"
        placeholderTextColor="grey"
        value={props.new_note}
        onChangeText={props.handleEdit}
        autoCorrect={false}
        multiline
        onFocus={props.inputFocus}
        onBlur={props.inputFocus}
        onEndEditing={props.handleSave}
      />
    </View>
  );
};

const EventInfo = (props) => {
  const { companyInfo, fairInfo } = props;
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

const DetailInfo = (props) => {
  return (
    <View style={{ minHeight: 250, justifyContent: 'center' }}>
      <Text style={styles.detailTextStyle}>We are hiring</Text>
      <View style={styles.tagStyle}>
        {props.hiring_types.map(type => (
          <Tag key={type} type={type} color="#487eb0" />
        ))}
      </View>
      <Text style={styles.detailTextStyle}>Majors</Text>
      <View style={styles.tagStyle}>
        {props.hiring_majors.map(type => (
          <Tag key={type} type={type} color="#e1b12c" />
        ))}
      </View>
      <Text style={styles.detailTextStyle}>Degrees</Text>
      <View style={styles.tagStyle}>
        {props.degree_requirements.map(type => (
          <Tag key={type} type={type} color="#22a6b3" />
        ))}
      </View>
      {props.visa_support === 'yes' && (
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  titleContent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center'
  },
  titleTextStyle: {
    padding: 5,
    fontSize: 20,
    fontFamily: 'Avenir Next'
  },
  textStyle: {
    paddingVertical: 2,
    fontFamily: 'Avenir Next'
  },
  hrefTextStyle: {
    paddingVertical: 2,
    fontFamily: 'Avenir Next',
    color: 'blue'
  },
  detailTextStyle: {
    paddingVertical: 3,
    fontFamily: 'Avenir Next',
    fontSize: 16
  },
  tagStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 6
  },
  actionButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 1
  }
});

export default CompanyDetail;
