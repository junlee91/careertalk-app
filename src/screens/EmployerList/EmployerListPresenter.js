import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  RefreshControl,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { SearchBar, Overlay, CheckBox, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import {
  FavButton,
  NoteIcon,
  PoweredBy,
  BackArrowIcon,
  FilterIcon,
  BackIcon,
  ChipButton,
  Spinner
} from '../../components/commons';

export default ({ loading, employerList, error }) => {
  return (
    <SafeAreaView style={styles.companyListViewStyle}>
      {/* Search Bar */}
      {/* Company List Header */}
      <View style={{ flex: 7.5 }}>
        {loading && !employerList ? (
          <Spinner size="large" />
        ) : (
          <Text>Employer List Loaded</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
