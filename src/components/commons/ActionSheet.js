import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { LogOutIcon } from './IconButtons';

class LogoutActionSheet extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPressOut={this.showActionSheet}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <LogOutIcon />
            <Text style={{ fontSize: 12, fontFamily: 'Avenir Next' }}>Sign out</Text>
          </View>
        </TouchableOpacity>
        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          options={['Log Out', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={index => {
            if (index === 0) {
              this.props.onPressLogOut();
            }
          }}
        />
      </View>
    );
  }
}

export { LogoutActionSheet };
