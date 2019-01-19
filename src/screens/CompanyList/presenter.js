import React from 'react';
import { SafeAreaView, View, Text, RefreshControl, FlatList } from 'react-native';
// import Search from 'react-native-search-box';

import CompanyItem from '../../components/CompanyItem';
import { FavButton, NoteIcon, PoweredBy } from '../../components/commons';

const CompanyList = (props) => {
  const { companiesForRender } = props;
  return (
    <SafeAreaView style={styles.companyListViewStyle}>
      {/* <Search
        onChangeText={props.search}
        backgroundColor="#dcdde1"
        titleCancelColor="black"
        onCancel={props.cancel}
        onDelete={props.cancel}
      /> */}
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
    </SafeAreaView>
  );
};

const CompanyListHeader = (props) => {
  const { numOfFavorites, numOfNotes, numOfCompanies } = props;
  return (
    <View style={styles.companyListHeaderStyle}>
      <View style={styles.userHeaderStyle}>
        <UserLikedCompany numOfFavorites={numOfFavorites} numOfCompanies={numOfCompanies} />
        <UserNotedCompany numOfNotes={numOfNotes} numOfCompanies={numOfCompanies} />
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
      <FavButton {...likes} />
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

const styles = {
  headerView: {
    backgroundColor: '#dcdde1'
  },
  companyListViewStyle: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  HeaderContentsText: {
    color: 'green',
    fontFamily: 'Avenir Next',
    alignItems: 'center'
  },
  userHeaderContentsWrapperStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
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
  }
};

export default CompanyList;
