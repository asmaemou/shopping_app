import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useShoppingCart } from '../../app/context/ShoppingCartContext';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
type YourOrderType = {
  name: string;
  date: string;
  totalAmount: number;
  items: Array<{
    name: string;
    size: string;
    quantity: number;
    price: number;
  }>;
};

const Cart = ({ navigation }) => {
  const { cart, setCart, removeFromCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  const { colors } = useTheme();

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleIncreaseQuantity = (item) => {
    increaseQuantity(item);
  };

  const handleDecreaseQuantity = (item) => {
    decreaseQuantity(item);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleCheckout = async () => {
    const orderName = cart.items.length > 0 ? cart.items[0].name : "New Order";

    const newOrder = {
      name: orderName, // Generate or obtain a unique ID
      date: new Date().toISOString(), // Current date in ISO format
      totalAmount: cart.items.reduce((total, product) => total + product.amount * product.quantity, 0),
      items: cart.items.map(item => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.amount,
      })),
    };
    

    let currentOrder = await AsyncStorage.getItem('UserOrder');
    let orderArray: YourOrderType[] = currentOrder ? JSON.parse(currentOrder) : [];
    orderArray.push(newOrder);
  
    await AsyncStorage.setItem('UserOrder', JSON.stringify(orderArray));
      const orderHistoryString = await AsyncStorage.getItem('UserOrder');
    console.log(orderHistoryString)
    setCart({ items: [] });
    navigation.navigate('Payment');
  };
  

  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <View style={styles.itemContainerStyle}>
        <Image source={{ uri: item.picture }} style={styles.imageStyle} />
        <View style={styles.textStyle}>
          <Text style={{ color: colors.text, fontSize: 16 }}>{item.name}</Text>
          <View style={styles.priceStyle}>
            <Text style={{ color: colors.text }}>${item.amount}</Text>
          </View>
        </View>
        <View style={styles.textStyle}>
          <View style={styles.priceStyle}>
            <Text style={{ color: colors.text }}>{item.size}</Text>
          </View>
        </View>
        <View style={styles.counterStyle}>
          <TouchableOpacity
            onPress={() => handleDecreaseQuantity(item)}
            style={styles.counterButtonStyle}
          >
            <Icon name="remove" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ color: colors.text }}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncreaseQuantity(item)}
            style={styles.counterButtonStyle}
          >
            <Icon name="add" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveFromCart(item)}
          style={styles.deleteButtonStyle}
        >
          <Icon name="delete" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={cart.items}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        contentContainerStyle={{ padding: 16, paddingTop: 75 }}
      />
      <View style={styles.footerStyle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButtonStyle}
        >
          <Text style={{ color: "#fff" }}>Close</Text>
        </TouchableOpacity>
        <View style={styles.totalContainerStyle}>
          <Text style={{ color: colors.text }}>Total: </Text>
          <Text style={{ color: colors.text }}>
            ${cart.items.reduce((total, product) => total + product.amount * product.quantity, 0)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleCheckout}
          style={styles.checkoutButtonStyle}
        >
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignItems: "center",
  },
  checkoutButtonStyle: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  deleteButtonStyle: {
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    marginLeft: 8,
  },
});

export default Cart;
