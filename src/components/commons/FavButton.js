import React from 'react';
import { Icon } from 'react-native-elements';

const FavButton = props => (
  <Icon
    name={props.isLiked ? 'favorite' : 'favorite-border'}
    color={props.isLiked ? '#eb4b59' : '#95a5a6'}
  />
);

export { FavButton };
