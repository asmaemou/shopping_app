import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const data = [
  {
    id: 1,
    image: require("../assets/images/photo1.jpg"),
    name: "Orange",
    price: 10,
    amountTaken: 7,
  },
  {
    id: 2,
    image: require("../assets/images/photo1.jpg"),
    name: "Tomato",
    price: 5,
    amountTaken: 6,
  },
];

const Cart = ({ navigation }) => {
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const {
      itemContainerStyle,
      lastItemStyle,
      imageStyle,
      textStyle,
      counterStyle,
      priceStyle,
    } = styles;

    return (
      <View
        style={index + 1 === data.length ? lastItemStyle : itemContainerStyle}
      >
        <Image source={item.image} style={imageStyle} />

        <View style={textStyle}>
          <Text style={{ color: "#2e2f30" }}>{item.name}</Text>
          <View style={priceStyle}>
            <Text style={{ color: "#2e2f30", fontSize: 12 }}>
              ${item.price}
            </Text>
          </View>
        </View>

        <View style={counterStyle}>
          <Icon.Button
            name="ios-remove"
            size={15}
            color="#fff"
            backgroundColor="#fff"
            style={{
              borderRadius: 15,
              backgroundColor: "#bbb",
              height: 30,
              width: 30,
            }}
            iconStyle={{ marginRight: 0 }}
          />

          <Text>{item.amountTaken}</Text>

          <Icon.Button
            name="ios-add"
            size={15}
            color="#fff"
            backgroundColor="#fff"
            style={{
              borderRadius: 15,
              backgroundColor: "#bbb",
              height: 30,
              width: 30,
            }}
            iconStyle={{ marginRight: 0 }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerStyle}>
        <Icon name="ios-close" size={35} color="#a8a9ad" />
        <Text style={{ fontSize: 18 }}>Shopping Cart</Text>
        <Text>Empty</Text>
      </View>
      {/* <ItemsContainer /> */}
      <View style={styles.itemsContainerStyle}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Added toString() to ensure a string key
        />
      </View>
      {/* <BasketContainer /> */}
      <View style={styles.footerStyle}>
        <View style={styles.totalContainerStyle}>
          <View style={styles.goodsStyle}>
            <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
            <Text>8 goods</Text>
          </View>

          <View style={styles.totalStyle}>
            <Text>Total - </Text>
            <Text>$300</Text>
          </View>
        </View>
        <View style={styles.buttonContainerStyle}>
          <View style={styles.closeButtonStyle}>
            <Text style={{ color: "#fff" }}>Close</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
            <View style={styles.checkoutButtonStyle}>
              <Text style={{ color: "#fff" }}>Go to checkout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flex: 0.4,
    elevation: 2,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
  },
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  itemsContainerStyle: {
    flex: 4,
    backgroundColor: '#DCDCDC',
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 40,
    alignItems: "center",
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
  },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  closeButtonStyle: {
    backgroundColor: "#7f8c8d",
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
  },
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
    paddingRight: 60,
    paddingLeft: 60,
    borderRadius: 3,
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemContainerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
});

export default Cart;
