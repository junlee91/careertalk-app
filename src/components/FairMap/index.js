import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
  {
    url: '',
    props: {
      source: require('../../img/uic_map/d1_uic_map.png'),
      id: 1
    }
  },
  {
    url: '',
    props: {
      source: require('../../img/uic_map/d2_uic_map.png'),
      id: 2
    }
  }
];

class FairMap extends Component {
  componentWillMount() {
    const { fairId } = this.props;
    const fairMap = images.filter(img => img.props.id === fairId);

    this.setState({
      fairMap
    });
  }

  render() {
    const { fairMap } = this.state;
    return <ImageViewer imageUrls={fairMap} enableSwipeDown onCancel={() => Actions.pop()} />;
  }
}

export const MapIcon = (props) => {
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

export default FairMap;
