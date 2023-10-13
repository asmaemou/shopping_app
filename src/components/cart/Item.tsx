import React from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  {
    id: 1,
    image: require('../images/orange.jpg'),
    name: 'Orange',
    price: 10,
    amountTaken: 7,
  },
  {
    id: 2,
    image: require('../images/tomato.jpg'),
    name: 'Tomato',
    price: 5,
    amountTaken: 6,
  },
];

interface ItemProps {}

const Item: React.FC<ItemProps> = () => {
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const {
      containerStyle,
      lastItemStyle,
      imageStyle,
      textStyle,
      counterStyle,
      priceStyle,
    } = styles;

    return (
      <View style={index + 1 === data.length ? lastItemStyle : containerStyle}>
        <Image source={item.image} style={imageStyle} />

        <View style={textStyle}>
          <Text style={{ color: '#2e2f30' }}>{item.name}</Text>
          <View style={priceStyle}>
            <Text style={{ color: '#2e2f30', fontSize: 12 }}>${item.price}</Text>
          </View>
        </View>

        <View style={counterStyle}>
          <Icon.Button
            name="ios-remove"
            size={15}
            color="#fff"
            backgroundColor="#fff"
            style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }}
            iconStyle={{ marginRight: 0}}
          />

          <Text>{item.amountTaken}</Text>

          <Icon.Button
            name="ios-add"
            size={15}
            color="#fff"
            backgroundColor="#fff"
            style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }}
            iconStyle={{ marginRight: 0 }}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Added toString() to ensure a string key
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 40,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Item;
