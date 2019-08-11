import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  titleContent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center'
  },
  titleTextStyle: {
    padding: 5,
    fontSize: 20,
    fontFamily: 'Avenir Next'
  },
  textStyle: {
    paddingVertical: 2,
    fontFamily: 'Avenir Next'
  },
  hrefTextStyle: {
    paddingVertical: 2,
    fontFamily: 'Avenir Next',
    color: 'blue'
  },
  detailTextStyle: {
    paddingVertical: 3,
    fontFamily: 'Avenir Next',
    fontSize: 16
  },
  tagStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 6
  },
  actionButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 1
  }
});

export default styles;
