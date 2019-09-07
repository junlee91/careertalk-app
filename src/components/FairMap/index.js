import React, { Component } from 'react';
import { TouchableOpacity, Platform, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';

const FairMap = ({ companyName, tables, mapUrl }) => {
  const fairMap = [
    {
      url: mapUrl
    }
  ];

  _renderFooter = () => {
    return (
      <View>
        <Text style={styles.titleText}>
          {companyName}: {tables}
        </Text>
        {Platform.OS === 'ios' && <Text style={styles.footerText}>Swipe down to close</Text>}
      </View>
    );
  };

  return (
    <ImageViewer
      imageUrls={fairMap}
      enableSwipeDown={Platform.OS === 'ios'}
      onCancel={() => Actions.pop()}
      renderIndicator={() => null}
      renderFooter={this._renderFooter}
      footerContainerStyle={styles.footerContainerStyle}
    />
  );
};

export const MapIcon = props => {
  return (
    <TouchableOpacity onPressOut={() => Actions.push('fairMap', props)}>
      <Icon
        name="map"
        type="feather"
        color="grey"
        size={20}
        containerStyle={{ paddingHorizontal: 10, marginHorizontal: 5 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 12,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 15,
  },
  footerContainerStyle: { width: '100%' }
});

export default FairMap;
