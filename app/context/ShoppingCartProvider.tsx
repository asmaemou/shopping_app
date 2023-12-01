// ShoppingCartProvider.tsx

import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your Product and other interfaces/types if not already defined elsewhere
interface Product {
  id: number;
  category: number;
  description: string;
  stock: string;
  rating: string;
  name: string;
  amount: number;
  status: string;
  manufacturer: string;
  picture: string;
  quantity: number;
  isFavorite: boolean;
  size: string;
}

interface State {
  items: Product[];
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'INCREASE_QUANTITY'; payload: { id: number } }
  | { type: 'DECREASE_QUANTITY'; payload: { id: number } }
  | { type: 'SET_CART'; payload: State };

interface ShoppingCartContextProps {
  cart: State;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

const initialState: State = {
  items: [],
};

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);

const cartReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Logic to handle adding a product to the cart
        // Check if the product already exists in the cart
        const existingIndexAdd = state.items.findIndex(item => item.id === action.payload.id);
        
        // If the product exists, update the quantity
        if (existingIndexAdd !== -1) {
          const updatedItemsAdd = state.items.map((item, index) => {
            if (index === existingIndexAdd) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          return { ...state, items: updatedItemsAdd };
        }
        
        // If the product doesn't exist, add it to the cart
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
  
      case 'REMOVE_FROM_CART':
        // Logic to handle removing a product from the cart
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
  
      case 'INCREASE_QUANTITY':
        // Logic to handle increasing the quantity of a product in the cart
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
  
      case 'DECREASE_QUANTITY':
        // Logic to handle decreasing the quantity of a product in the cart
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.payload.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
          )
        };
  
      case 'SET_CART':
        // Logic to handle setting the entire cart state
        return action.payload;
  
      default:
        return state;
    }
  };
  
export const useShoppingCart = (): ShoppingCartContextProps => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within ShoppingCartProvider');
  }
  return context;
};

interface ShoppingCartProviderProps {
  children: ReactNode; // Define the type for 'children' prop
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load the cart from local storage on initial render
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart !== null) {
          dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
        }
      } catch (e) {
        console.error("Failed to load the cart from local storage", e);
      }
    };

    loadCart();
  }, []);

  // Persist the cart state to local storage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save the cart to local storage", e);
      }
    };

    saveCart();
  }, [state]);

  // Actions
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id } });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
