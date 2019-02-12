import React from 'react';
import FadeIn from 'react-native-fade-in-image';
import { Image } from 'react-native';

function getSize(size) {
  switch (size) {
    case 'small':
      return 51;
    case 'medium':
      return 128;
    case 'large':
      return 256;
    default:
      return 128;
  }
}

const LogoImage = (props) => {
  const size = getSize(props.size);
  const imgStyle = props.wide ? styles.imgStyleMedium : styles.imgStyleSmall;

  return (
    <FadeIn>
      <Image
        source={{ uri: `https://logo.clearbit.com/${props.company_url}?size=${size}` }}
        style={imgStyle}
        defaultSource={require('../../img/no_img.png')}
      />
    </FadeIn>
  );
};

const ProfileImage = (props) => {
  return (
    <FadeIn>
      <Image
        source={props.profilePhoto ? { uri: props.profilePhoto } : require('../../img/noPhoto.jpg')}
        style={styles.imgStyleSmall}
        defaultSource={require('../../img/noPhoto.jpg')}
      />
    </FadeIn>
  );
};

const styles = {
  imgStyleSmall: {
    height: 51,
    width: 51,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  imgStyleMedium: {
    height: 128,
    width: 128,
    alignSelf: 'center',
    resizeMode: 'contain',
    shadowColor: '#8395a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  }
};

export { LogoImage, ProfileImage };
