import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Item from './Item';

interface ItemsContainerProps {}

class ItemsContainer extends Component<ItemsContainerProps> {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Item />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 4,
    backgroundColor: '#DCDCDC',
  },
});

export default ItemsContainer;
