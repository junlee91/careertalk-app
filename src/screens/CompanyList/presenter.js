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

import CompanyItem from '../../components/CompanyItem';
import {
  FavButton,
  NoteIcon,
  PoweredBy,
  BackArrowIcon,
  FilterIcon,
  BackIcon,
  ChipButton
} from '../../components/commons';

const { width, height } = Dimensions.get('window');

const CompanyList = (props) => {
  const { employersForRender } = props;

  return (
    <SafeAreaView style={styles.companyListViewStyle}>
      <SearchBarHeader {...props} />
      <CompanyListHeader {...props} />
      <View style={{ flex: 7.5 }}>
        <FlatList
          refreshControl={(
            <RefreshControl
              refreshing={props.isFetching}
              onRefresh={props.refresh}
              tintColor="grey"
            />)}
          data={employersForRender}
          keyExtractor={c => c.id.toString()}
          renderItem={c => (
            <CompanyItem id={c.item.id} company={c.item} noteIcon likeButton showLabel />
          )}
        />
        <PoweredBy poweredby="Logos provided by Clearbit" />
      </View>
      <FilterOverlay {...props} />
    </SafeAreaView>
  );
};

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

const SearchBarComponent = (props) => {
  return (
    <SearchBar
      lightTheme
      onChangeText={props.search}
      value={props.searchText}
      onClear={props.cancel}
      onCancel={props.cancel}
      placeholder="Search"
      cancelButtonTitle="Cancel"
      autoCorrect={false}
      platform={Platform.OS}
      onFocus={props.searchBarFocusFn}
      onBlur={props.searchBarFocusFn}
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

const CompanyListHeader = (props) => {
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

const UserLikedCompany = (props) => {
  likes = { isLiked: true };
  const { numOfCompanies } = props;
  const likesPerCompanies = `${props.numOfFavorites}/${numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <FavButton {...likes} size={20} />
      <Text style={styles.HeaderContentsText}>{likesPerCompanies}</Text>
    </View>
  );
};

const UserNotedCompany = (props) => {
  const { numOfCompanies } = props;
  const notesPerCompanies = `${props.numOfNotes}/${numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <NoteIcon visible={{ isNote: true }} />
      <Text style={styles.HeaderContentsText}>{notesPerCompanies}</Text>
    </View>
  );
};

const FilterButton = props => (
  <TouchableOpacity onPressOut={props.toggleFilter}>
    <FilterIcon filterApply={props.filterApply} />
  </TouchableOpacity>
);

const FilterOverlay = props => (Platform.OS === 'android' ? <OverlayAndroid {...props} /> : <OverlayIOS {...props} />);

const OverlayAndroid = props => (
  <Overlay
    fullScreen
    overlayStyle={styles.overlayStyle}
    borderRadius={5}
    height={height - 150}
    isVisible={props.overlayVisible}
    onBackdropPress={props.toggleFilter}
  >
    <View style={styles.overlayHeader}>
      <TouchableOpacity onPressOut={props.toggleFilter}>
        <BackIcon />
      </TouchableOpacity>
    </View>
    <View>
      <ScrollView contentContainerStyle={styles.overlayContent}>
        <HiringOptions {...props} />

        <MajorOptions {...props} />

        <DegreeOptions {...props} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <Text style={styles.chipTitleText}>Sponsorship Needed?</Text>
          <CheckBox checked={props.sponsorChecked} onPress={props.toggleSponsor} />
        </View>
        <ApplyButton {...props} />
      </ScrollView>
    </View>
  </Overlay>
);

const OverlayIOS = props => (
  <Overlay
    overlayStyle={styles.overlayStyle}
    borderRadius={5}
    isVisible={props.overlayVisible}
    onBackdropPress={props.toggleFilter}
  >
    <View style={styles.overlayHeader}>
      <TouchableOpacity onPressOut={props.toggleFilter}>
        <BackIcon />
      </TouchableOpacity>
    </View>
    <View style={styles.overlayContent}>
      <HiringOptions {...props} />

      <MajorOptions {...props} />

      <DegreeOptions {...props} />

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
            name={props.sponsorChecked ? 'ios-checkbox' : 'ios-checkbox-outline'}
            color={props.sponsorChecked ? '#1abc9c' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <ApplyButton {...props} />
    </View>
  </Overlay>
);

const HiringOptions = props => (
  <>
    <Text style={styles.chipTitleText}>Hiring Types</Text>
    <View style={styles.chipContentStyle}>
      {props.filterFields.hiring_types.map(field => (
        <ChipButton
          type="hiringTypes"
          key={field.label}
          field={field}
          selected={props.filterOptions.hiringTypes.has(field.label)}
          onPress={props.toggleFilterOptions}
        />
      ))}
    </View>
  </>
);

const MajorOptions = props => (
  <>
    <Text style={styles.chipTitleText}>Majors</Text>
    <View style={styles.chipContentStyle}>
      <ScrollView style={{ height: height / 3.2 }}>
        {props.filterFields.majors.map(field => (
          <ChipButton
            key={field.label}
            type="majors"
            field={field}
            selected={props.filterOptions.majors.has(field.label)}
            onPress={props.toggleFilterOptions}
          />
        ))}
      </ScrollView>
    </View>
  </>
);

const DegreeOptions = props => (
  <>
    <Text style={styles.chipTitleText}>Degree</Text>
    <View style={styles.chipContentStyle}>
      {props.filterFields.degree.map(field => (
        <ChipButton
          type="degree"
          key={field.label}
          field={field}
          selected={props.filterOptions.degree.has(field.label)}
          onPress={props.toggleFilterOptions}
        />
      ))}
    </View>
  </>
);

const ApplyButton = props => (
  <TouchableOpacity style={styles.button} onPressOut={props.toggleFilter}>
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

const styles = {
  companyListViewStyle: {
    flex: 1
  },
  HeaderContentsText: {
    color: 'green',
    fontFamily: 'Avenir Next',
    alignItems: 'center'
  },
  userHeaderContentsWrapperStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  companyListHeaderStyle: {
    height: 30
  },
  companyListHeaderText: {
    size: 8,
    color: 'blue'
  },
  userHeaderInfoViewStyle: {
    marginLeft: 5,
    marginRight: 5
  },
  userHeaderStyle: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  backButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 2,
    marginLeft: 8
  },
  searchBarInputContainerStyle: {
    backgroundColor: '#FAFAFA',
    ...Platform.select({
      android: {
        borderRadius: 9,
        width: width - 25
      },
      ios: {
        width: width - 80
      }
    })
  },
  searchBarInputStyle: {
    ...Platform.select({
      ios: {
        paddingHorizontal: 15
      }
    })
  },
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        paddingHorizontal: 10
      }
    })
  },
  overlayStyle: {
    backgroundColor: '#f9f7f7'
  },
  overlayHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  overlayContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterOptionsStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chipTitleText: {
    fontSize: 18,
    fontFamily: 'Avenir Next',
    marginVertical: 8
  },
  chipContentStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 40,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  }
};

export default CompanyList;
