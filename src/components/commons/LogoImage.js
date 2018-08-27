import React from 'react';
import FadeIn from 'react-native-fade-in-image';
import { Image } from 'react-native';

const LogoImage = props => (
  <FadeIn>
    <Image source={{ uri: props.logo_sm }} style={styles.imgStyle} />
  </FadeIn>
);

const styles = {
  imgStyle: {
    height: 50,
    width: 50
  }
};

export { LogoImage };
