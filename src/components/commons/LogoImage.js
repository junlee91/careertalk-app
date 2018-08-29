import React from 'react';
import FadeIn from 'react-native-fade-in-image';
import { Image } from 'react-native';

const LogoImage = props => (
  <FadeIn>
    <Image
      source={{ uri: `https://logo.clearbit.com/${props.company_url}/` }}
      style={styles.imgStyle}
      defaultSource={require('../../img/no_img.png')}
    />
  </FadeIn>
);

const styles = {
  imgStyle: {
    height: 50,
    width: 50
  }
};

export { LogoImage };
