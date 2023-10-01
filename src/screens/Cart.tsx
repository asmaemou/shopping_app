import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../context/CartContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
}


//   { cartItems } prop
const Cart: React.FC<CartProps> = () => {
    const { cartState, dispatch} = useCart()
    const { cartItems } = cartState
    console.log(cartItems, "cart state")
  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  const handleIncrement = (itemId: number) => {
    console.log('am workign')
    dispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
  };

  const handleDecrement = (itemId: number) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
  };

  const handleDelete = (itemId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>
              Quantity: {item.quantity}{' '}
              <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
            </Text>
            <Text style={styles.itemPrice}>Price: ${item.price * item.quantity}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    cartContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 3,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      margin: 16,
      padding: 16,
    },
    cartTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    cartItem: {
      marginBottom: 8,
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemQuantity: {
      fontSize: 14,
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      fontSize: 20,
      marginHorizontal: 8,
    },
    itemPrice: {
      fontSize: 14,
    },
    deleteButton: {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
    },
    totalPrice: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  

export default Cart;
