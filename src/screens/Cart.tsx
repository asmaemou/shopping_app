import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // Using MaterialIcons for consistency
import { useShoppingCart } from "../../app/context/ShoppingCartContext";
import { useTheme } from "@react-navigation/native"; // Import useTheme for theme colors

const Cart = ({ navigation }) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  const { colors } = useTheme(); // Use theme colors

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainerStyle}>
        <Image source={{ uri: item.picture }} style={styles.imageStyle} />
        <View style={styles.textStyle}>
          <Text style={{ color: colors.text, fontSize: 16 }}>{item.name}</Text>
          <View style={styles.priceStyle}>
            <Text style={{ color: colors.text }}>${item.amount}</Text>
          </View>
        </View>
        <View style={styles.counterStyle}>
          <TouchableOpacity onPress={() => decreaseQuantity(item)} style={styles.counterButtonStyle}>
            <Icon name="remove" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ color: colors.text }}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item)} style={styles.counterButtonStyle}>
            <Icon name="add" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={cart.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.footerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButtonStyle}>
          <Text style={{ color: "#fff" }}>Close</Text>
        </TouchableOpacity>
        <View style={styles.totalContainerStyle}>
          <Text style={{ color: colors.text }}>Total: </Text>
          <Text style={{ color: colors.text }}>
            ${cart.items.reduce((total, product) => total + product.amount * product.quantity, 0)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Payment")} style={styles.checkoutButtonStyle}>
          <Text style={{ color: "#fff" }}>Go to checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainerStyle: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#fff",
    marginBottom: 8,
    alignItems: "center",
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    marginTop: 4,
  },
  counterStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButtonStyle: {
    marginHorizontal: 8,
    borderRadius: 15,
    padding: 4,
    backgroundColor: "#e0e0e0",
  },
  footerStyle: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
    backgroundColor: "#f8f9fa",
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns the buttons to each end
  },
  closeButtonStyle: {
    backgroundColor: "#95a5a6",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center', // Centers the content vertically
  },
  checkoutButtonStyle: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
});

export default Cart;
