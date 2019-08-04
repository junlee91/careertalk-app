import { Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

export default styles;
