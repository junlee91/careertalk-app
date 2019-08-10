import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Platform } from 'react-native';
import { Overlay, CheckBox, Icon } from 'react-native-elements';

import styles from './styles';
import filterFields from '../../lib/fields.json';
import { BackIcon, ChipButton } from '../../components/commons';

const { width, height } = Dimensions.get('window');

const FilterOverlay = props => {
  const initialFilterState = {
    degree: new Set(),
    majors: new Set(),
    hiringTypes: new Set()
  };

  /** Default state of Component */
  const [filterOptions, setFilterOptions] = useState(initialFilterState);
  const [visaOption, setVisa] = useState(false);
  const [compstate, setState] = useState(false);

  const toggleSponsor = () => {
    setVisa(!visaOption);
  };

  const toggleFilterOptions = (key, value) => {
    setFilterOptions(options => {
      const opts = options[key];
      if (opts.has(value)) {
        opts.delete(value);
      } else {
        opts.add(value);
      }
      return options;
    });

    setState(!compstate);
  };

  const closeModal = () => {
    const { toggleFilterModal } = props;

    toggleFilterModal({ filterOptions, visaOption });
  };

  /** wrapping state and props */
  const state = {
    ...props,
    visaOption,
    toggleSponsor,
    filterOptions,
    toggleFilterOptions,
    closeModal
  };

  return Platform.OS === 'android' ? <OverlayAndroid {...state} /> : <OverlayIOS {...state} />;
};
const OverlayAndroid = props => (
  <Overlay
    fullScreen
    overlayStyle={styles.overlayStyle}
    borderRadius={5}
    height={height - 150}
    isVisible={props.overlayVisible}
    onBackdropPress={props.closeModal}
  >
    <View style={styles.overlayHeader}>
      <TouchableOpacity onPressOut={props.closeModal}>
        <BackIcon />
      </TouchableOpacity>
    </View>
    <View>
      <ScrollView contentContainerStyle={styles.overlayContent}>
        <HiringOptions toggle={props.toggleFilterOptions} filterOptions={props.filterOptions} />

        <MajorOptions toggle={props.toggleFilterOptions} filterOptions={props.filterOptions} />

        <DegreeOptions toggle={props.toggleFilterOptions} filterOptions={props.filterOptions} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <Text style={styles.chipTitleText}>Sponsorship Needed?</Text>
          <CheckBox checked={props.visaOption} onPress={props.toggleSponsor} />
        </View>
        <ApplyButton toggleFilterModal={props.closeModal} />
      </ScrollView>
    </View>
  </Overlay>
);

const OverlayIOS = props => (
  <Overlay
    overlayStyle={styles.overlayStyle}
    borderRadius={5}
    isVisible={props.overlayVisible}
    onBackdropPress={props.closeModal}
    width={width - 40}
    height={height - 60}
  >
    <View style={styles.overlayHeader}>
      <TouchableOpacity onPressOut={props.closeModal}>
        <BackIcon />
      </TouchableOpacity>
    </View>
    <View style={styles.overlayContent}>
      <HiringOptions toggle={props.toggleFilterOptions} filterOptions={props.filterOptions} />

      <MajorOptions toggle={props.toggleFilterOptions} filterOptions={props.filterOptions} />

      <DegreeOptions toggle={props.toggleFilterOptions} filterOptions={props.filterOptions} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <Text style={styles.chipTitleText}>Sponsorship Needed?</Text>
        <TouchableOpacity onPress={props.toggleSponsor} style={{ padding: 5 }}>
          <Icon
            type="ionicon"
            name={props.visaOption ? 'ios-checkbox' : 'ios-checkbox-outline'}
            color={props.visaOption ? '#1abc9c' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <ApplyButton toggleFilterModal={props.closeModal} />
    </View>
  </Overlay>
);

const HiringOptions = ({ toggle, filterOptions }) => (
  <>
    <Text style={styles.chipTitleText}>Hiring Types</Text>
    <View style={styles.chipContentStyle}>
      {filterFields.hiring_types.map(field => (
        <ChipButton
          type="hiringTypes"
          key={field.label}
          field={field}
          selected={filterOptions.hiringTypes.has(field.label)}
          onPress={toggle}
        />
      ))}
    </View>
  </>
);

const MajorOptions = ({ toggle, filterOptions }) => (
  <>
    <Text style={styles.chipTitleText}>Majors</Text>
    <View style={styles.chipContentStyle}>
      <ScrollView style={{ height: height / 3.2 }}>
        {filterFields.majors.map(field => (
          <ChipButton
            key={field.label}
            type="majors"
            field={field}
            selected={filterOptions.majors.has(field.label)}
            onPress={toggle}
          />
        ))}
      </ScrollView>
    </View>
  </>
);

const DegreeOptions = ({ toggle, filterOptions }) => (
  <>
    <Text style={styles.chipTitleText}>Degree</Text>
    <View style={styles.chipContentStyle}>
      {filterFields.degree.map(field => (
        <ChipButton
          type="degree"
          key={field.label}
          field={field}
          selected={filterOptions.degree.has(field.label)}
          onPress={toggle}
        />
      ))}
    </View>
  </>
);

const ApplyButton = ({ toggleFilterModal }) => (
  <TouchableOpacity style={styles.button} onPressOut={toggleFilterModal}>
    <Text
      style={{
        fontFamily: 'Avenir Next',
        fontSize: 15,
        fontWeight: '600'
      }}
    >
      Apply
    </Text>
  </TouchableOpacity>
);

export default FilterOverlay;
