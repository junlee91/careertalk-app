import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  RefreshControl,
  FlatList,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { SearchBar, Overlay } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import CompanyItem from '../../components/CompanyItem';
import {
  FavButton,
  NoteIcon,
  PoweredBy,
  BackArrowIcon,
  FilterIcon
} from '../../components/commons';

const { width } = Dimensions.get('window');

const CompanyList = (props) => {
  const { companiesForRender } = props;
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
          data={companiesForRender}
          keyExtractor={c => c.id.toString()}
          renderItem={c => <CompanyItem id={c.item.id} company={c.item} likeButton />}
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
    <FilterIcon />
  </TouchableOpacity>
);

const FilterOverlay = props => (
  <Overlay isVisible={props.overlayVisible} onBackdropPress={props.toggleFilter}>
    <Text>Hello from Overlay!</Text>
  </Overlay>
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
    marginLeft: 5,
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
  }
};

export default CompanyList;
