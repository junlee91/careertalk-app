import React from 'react';
import { Icon } from 'react-native-elements';

const FavButton = props => (
  <Icon
    name={props.isLiked ? 'favorite' : 'favorite-border'}
    color={props.isLiked ? '#eb4b59' : '#95a5a6'}
    containerStyle={{ paddingHorizontal: 5 }}
    size={props.size}
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
    reverse
    containerStyle={{ paddingHorizontal: 5 }}
  />
);

const TabIcon = (props) => {
  const name = getTabIconName(props.title);
  return (
    <Icon
      color={props.focused ? '#130f40' : '#95afc0'}
      type="material-icons"
      name={name}
      size={30}
    />
  );
};

const getTabIconName = (name) => {
  switch (name) {
    case 'Employer':
      return 'format-list-bulleted';
    case 'Profile':
      return 'person';
    case 'Summary':
      return 'equalizer';
    case 'Settings':
      return 'settings';
    default:
      return 'radio-button-unchecked';
  }
};

const BackIcon = () => <Icon color="#95afc0" name="cross" type="entypo" size={30} />;

const BackArrowIcon = () => <Icon color="black" name="ios-arrow-back" type="ionicon" size={30} />;

const FilterIcon = () => <Icon color="grey" name="filter" type="feather" size={20} />;

export { FavButton, NoteIcon, EditIcon, TabIcon, BackIcon, BackArrowIcon, FilterIcon };
