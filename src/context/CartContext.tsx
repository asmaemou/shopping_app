
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define the interface for an item in the cart
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the interface for the cart state
interface CartState {
  cartItems: CartItem[];
}

// Define the actions that can be performed on the cart
enum ActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
  INCREMENT_QUANTITY = 'INCREMENT_QUANTITY', // Add this
  DECREMENT_QUANTITY = 'DECREMENT_QUANTITY', // Add this
}

// Define the action types for cart actions
type CartAction =
  | { type: ActionTypes.ADD_TO_CART; payload: CartItem }
  | { type: ActionTypes.REMOVE_FROM_CART; payload: number }
  | { type: ActionTypes.CLEAR_CART }
  | {type: ActionTypes.INCREMENT_QUANTITY; payload: number }
  | {type: ActionTypes.DECREMENT_QUANTITY; payload: number };

// Create a reducer to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      // Check if the item is already in the cart
      const existingItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cartItems: updatedItems };
      } else {
        // If the item is not in the cart, add it
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }

    case ActionTypes.REMOVE_FROM_CART:
      // Remove the item from the cart by filtering it out
      const updatedItems = state.cartItems.filter((item) => item.id !== action.payload);
      return { ...state, cartItems: updatedItems };

    case ActionTypes.CLEAR_CART:
      // Clear the entire cart
      return { ...state, cartItems: [] };

      case ActionTypes.INCREMENT_QUANTITY:
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          }),
        };
  
      case ActionTypes.DECREMENT_QUANTITY:
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.payload) {
              // Ensure the quantity doesn't go below 1
              const newQuantity = Math.max(item.quantity - 1, 1);
              return {
                ...item,
                quantity: newQuantity,
              };
            }
            return item;
          }),
        };

    default:
      return state;
  }
};

// Create a CartContext to provide cart state and actions to components
interface CartContextType {
  cartState: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a CartProvider component to wrap the app and provide cart context
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [
    {
      id: 1,
      name: 'Product 1',
      price: 19.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 29.99,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Product 3',
      price: 9.99,
      quantity: 3,
    },
  ] });

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to easily access cart context in components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};