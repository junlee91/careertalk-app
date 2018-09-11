import React from 'react';
import { View, Text, RefreshControl, FlatList } from 'react-native';
import Search from 'react-native-search-box';
import CompanyItem from '../CompanyItem';
import { FavButton, NoteIcon, PoweredBy } from '../commons';

const CompanyList = (props) => {
  const { companiesForRender } = props;
  return (
    <View style={styles.companyListViewStyle}>
      <View style={styles.headerView}>
        <Search
          onChangeText={props.search}
          backgroundColor="#dcdde1"
          titleCancelColor="black"
          onCancel={props.cancel}
          onDelete={props.cancel}
        />
        <CompanyListHeader {...props} />
      </View>
      <View style={{ flex: 7.5 }}>
        <FlatList
          refreshControl={(
            <RefreshControl
              refreshing={props.isFetching}
              onRefresh={props.refresh}
              tintColor="grey"
            />
          )}
          data={companiesForRender}
          keyExtractor={c => c.id.toString()}
          renderItem={c => <CompanyItem id={c.item.id} company={c.item} likeButton />}
        />
        <PoweredBy poweredby="Logos provided by Clearbit" />
      </View>
    </View>
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
      <View style={styles.userHeaderInfoViewStyle}>
        <FavButton {...likes} />
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text style={styles.HeaderContentsText}>{likesPerCompanies}</Text>
      </View>
    </View>
  );
};

const UserNotedCompany = (props) => {
  const { numOfCompanies } = props;
  const notesPerCompanies = `${props.numOfNotes}/${numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <View style={styles.userHeaderInfoViewStyle}>
        <NoteIcon visible={{ isNote: true }} />
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text style={styles.HeaderContentsText}>{notesPerCompanies}</Text>
      </View>
    </View>
  );
};

const styles = {
  headerView: {
    backgroundColor: '#dcdde1',
    height: 68,
    flex: 1,
  },
  companyListViewStyle: {
    flex: 1,
  },
  HeaderContentsText: {
    color: 'green',
    fontFamily: 'Avenir Next',
  },
  userHeaderContentsWrapperStyle: {
    marginLeft: 65,
    flexDirection: 'row',
    width: 80,
    alignItems: 'center',
  },
  companyListHeaderStyle: {
    height: 30,
  },
  companyListHeaderText: {
    size: 8,
    color: 'blue',
  },
  userHeaderInfoViewStyle: {
    marginLeft: 5,
    marginRight: 5,
  },
  userHeaderStyle: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

export default CompanyList;
