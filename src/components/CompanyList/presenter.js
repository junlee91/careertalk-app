import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import CompanyItem from '../CompanyItem';
import { FavButton, NoteIcon } from '../commons';

const CompanyList = (props) => {
  const { company: { Company } } = props;
  return (
    <View>
      <CompanyListHeader {...props} />
      <ScrollView contentContainerStyle={styles.companyListScrollStyle}>
        {Company.map(c => (
          <CompanyItem key={c.id} company={c} likeButton />
        ))}
      </ScrollView>
    </View>
  );
};

const CompanyListHeader = (props)=> {
  const { company: { Company } } = props;
  const { favorites } = props;
  const numOfCompanies = Company.length;
  const numOfFavorites = favorites.length;
  return (
    <View style={styles.companyListHeaderStyle}>
      <View style={styles.userHeaderStyle}>
        <UserLikedCompany
          numOfFavorites={numOfFavorites}
          numOfCompanies={numOfCompanies}
        />
        <UserNotedCompany />
      </View>
    </View>
  );
};


const UserLikedCompany = (props) => {
  likes = { isLiked: true };
  const likesPerCompanies = `${props.numOfFavorites}/${props.numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <View style={styles.userHeaderInfoViewStyle}>
        <FavButton {...likes} />
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text style={styles.likesPerCompaniesText}>{likesPerCompanies}</Text>
      </View>
    </View>
  );
};


// Todo
// This one is not done yet.
const UserNotedCompany = (props) => {
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <View style={styles.userHeaderInfoViewStyle}>
        <NoteIcon />
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text>note.</Text>
      </View>
    </View>
  );
};


const styles = {
  likesPerCompaniesText: {
    color: 'green'
  },
  userHeaderContentsWrapperStyle: {
    marginLeft: 65,
    flexDirection: 'row',
    width: 80
  },
  companyListHeaderStyle: {
    backgroundColor: '#bcf2ce',
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
    justifyContent: 'flex-start'
  }
};


export default CompanyList;
