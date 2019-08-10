import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  RefreshControl,
  FlatList,
  Platform,
  TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import {
  FavButton,
  NoteIcon,
  PoweredBy,
  BackArrowIcon,
  FilterIcon,
  BackIcon,
  Spinner
} from '../../components/commons';
import EmployerCard from '../../components/EmployerCard';
import FilterOverlay from './FilterModal';

export default ({
  loading,
  employerList,
  error,
  numOfCompanies,
  numOfFavorites,
  numOfNotes,
  searchTerm,
  searching,
  cancelSearch,
  focusSearchBar,
  searchBarFocus,
  isRefreshing,
  refresh,
  toggleFilterModal,
  overlayVisible,
  filterApplied,
}) => {
  return (
    <SafeAreaView style={styles.companyListViewStyle}>
      <SearchBarHeader
        searchTerm={searchTerm}
        searching={searching}
        cancelSearch={cancelSearch}
        focusSearchBar={focusSearchBar}
        searchBarFocus={searchBarFocus}
      />
      <CompanyListHeader
        numOfCompanies={numOfCompanies}
        numOfFavorites={numOfFavorites}
        numOfNotes={numOfNotes}
        toggleFilterModal={toggleFilterModal}
        filterApplied={filterApplied}
      />
      <View style={{ flex: 7.5 }}>
        {!loading && employerList && employerList.companies ? (
          <CompanyList
            companies={employerList.companies}
            isRefreshing={isRefreshing}
            refresh={refresh}
          />
        ) : (
          <Spinner size="large" />
        )}
      </View>
      <FilterOverlay toggleFilterModal={toggleFilterModal} overlayVisible={overlayVisible} />
    </SafeAreaView>
  );
};

const CompanyList = ({ companies, isRefreshing, refresh }) => {
  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} tintColor="grey" />
        }
        data={companies}
        keyExtractor={c => c.employer.id}
        renderItem={c => {
          return <EmployerCard {...c.item} showNote showLike showLabel />;
        }}
      />
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </>
  );
};

// ------------------------------- Search Bar ------------------------------ //
const SearchBarHeader = props => (
  <View style={{ flexDirection: 'row' }}>
    {!props.searchBarFocus && Platform.OS === 'ios' && (
      <TouchableOpacity style={styles.backButtonStyle} onPressOut={() => Actions.pop()}>
        <BackArrowIcon />
      </TouchableOpacity>
    )}
    <SearchBarComponent {...props} />
  </View>
);

const SearchBarComponent = ({ searchTerm, searching, cancelSearch, focusSearchBar }) => {
  return (
    <SearchBar
      lightTheme
      onChangeText={searching}
      value={searchTerm}
      onClear={cancelSearch}
      onCancel={cancelSearch}
      placeholder="Search"
      cancelButtonTitle="Cancel"
      autoCorrect={false}
      platform={Platform.OS}
      onFocus={focusSearchBar}
      onBlur={focusSearchBar}
      returnKeyType="search"
      onSubmitEditing={() => console.log('should search!')}
      inputContainerStyle={styles.searchBarInputContainerStyle}
      inputStyle={styles.searchBarInputStyle}
      containerStyle={styles.searchBarContainerStyle}
      searchIcon={false}
      cancelIcon={null}
    />
  );
};
// ------------------------------------------------------------------------- //

// -------------------- Show num of likes and notes ------------------------ //
const CompanyListHeader = props => {
  const { numOfFavorites, numOfNotes, numOfCompanies } = props;
  return (
    <View style={styles.companyListHeaderStyle}>
      <View style={styles.userHeaderStyle}>
        <UserLikedCompany numOfFavorites={numOfFavorites} numOfCompanies={numOfCompanies} />
        <UserNotedCompany numOfNotes={numOfNotes} numOfCompanies={numOfCompanies} />
        <FilterButton {...props} />
      </View>
    </View>
  );
};

const UserLikedCompany = props => {
  const likes = { isLiked: true };
  const { numOfCompanies } = props;
  const likesPerCompanies = `${props.numOfFavorites}/${numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <FavButton {...likes} size={20} />
      <Text style={styles.HeaderContentsText}>{likesPerCompanies}</Text>
    </View>
  );
};

const UserNotedCompany = props => {
  const { numOfCompanies } = props;
  const notesPerCompanies = `${props.numOfNotes}/${numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <NoteIcon visible={{ isNote: true }} />
      <Text style={styles.HeaderContentsText}>{notesPerCompanies}</Text>
    </View>
  );
};

const FilterButton = ({ toggleFilterModal, filterApplied }) => (
  <TouchableOpacity onPressOut={toggleFilterModal}>
    <FilterIcon filterApply={filterApplied} />
  </TouchableOpacity>
);

// ------------------------------------------------------------------------- //
