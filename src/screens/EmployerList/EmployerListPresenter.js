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
import EmployerCard from '../../components/EmployerCard';

export default ({ loading, employerList, error }) => {
  return (
    <SafeAreaView style={styles.companyListViewStyle}>
      {/* Search Bar */}
      {/* Company List Header */}
      <View style={{ flex: 7.5 }}>
        {!loading && employerList && employerList.companies ? (
          <CompanyList companies={employerList.companies} />
        ) : (
          <Spinner size="large" />
        )}
      </View>
    </SafeAreaView>
  );
};

const CompanyList = ({ companies }) => {
  return (
    <FlatList
      refreshControl={null}
      data={companies}
      keyExtractor={c => c.employer.id}
      renderItem={c => {
        return <EmployerCard {...c.item} showNote showLike showLabel />;
      }}
    />
  );
};
