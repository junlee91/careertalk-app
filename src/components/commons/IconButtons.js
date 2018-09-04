import React from 'react';
import { Icon } from 'react-native-elements';

const FavButton = props => (
  <Icon
    name={props.isLiked ? 'favorite' : 'favorite-border'}
    color={props.isLiked ? '#eb4b59' : '#95a5a6'}
    containerStyle={{ paddingHorizontal: 5 }}
  />
);

const NoteIcon = props => (
  <Icon
    color="grey"
    name="note"
    type="simple-line-icon"
    size={15}
    containerStyle={{ paddingHorizontal: 5 }}
    iconStyle={props.visible ? { opacity: 100 } : { opacity: 0 }}
  />
);

const EditIcon = () => (
  <Icon
    color="black"
    name="edit"
    type="entypo"
    size={15}
    containerStyle={{ paddingHorizontal: 5 }}
  />
);

export { FavButton, NoteIcon, EditIcon };
