import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import CompanyItem from '../CompanyItem';
import { FavButton } from '../commons';
import { Icon } from 'react-native-elements';

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

const CompanyListHeader = props => (
  <View style={styles.companyListHeaderStyle}>
    <View style={styles.userHeaderStyle}>
      <UserLikedCompany />
      <UserNotedCompany />
    </View>
  </View>
);


const UserLikedCompany = (props) => {
  likes = { isLiked: true };
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <View style={styles.userHeaderInfoViewStyle}>
        <FavButton {...likes} />
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text>hello world.</Text>
      </View>
    </View>
  );
};


const UserNotedCompany = (props) => {
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <View style={styles.userHeaderInfoViewStyle}>
        
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text>hello world.</Text>
      </View>
    </View>
  );
}


const styles = {
  userHeaderContentsWrapperStyle: {
    marginLeft: 40,
    flexDirection: 'row',
  },
  companyListHeaderStyle: {
    backgroundColor: '#6bb75f',
    height: 30
  },
  companyListHeaderText: {
    size: 8,
    color: 'blue'
  },
  userHeaderInfoViewStyle: {
    backgroundColor: 'skyblue',
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
