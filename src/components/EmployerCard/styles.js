import { Platform } from 'react-native';

const styles = {
  companyContentStyle: {
    paddingVertival: 10,
  },
  companyItemStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  logoStyle: {
    marginLeft: 5,
    ...Platform.select({
      android: {
        alignSelf: 'center'
      }
    })
  },
  companyNameTextStyle: {
    height: 30,
    fontSize: 20,
    fontFamily: 'Avenir Next'
  },
  labelContentStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
    marginTop: 3
  }
};

export default styles;
