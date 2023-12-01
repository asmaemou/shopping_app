import React, { createContext, useReducer, useContext, ReactNode } from "react";

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
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: Product }
  | { type: "INCREASE_QUANTITY"; payload: Product }
  | { type: "DECREASE_QUANTITY"; payload: Product }
  | { type: "SET_CART"; payload: State };

interface ContextValue {
  cart: State;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  increaseQuantity: (item: Product) => void;
  decreaseQuantity: (item: Product) => void;
  setCart: (cart: State) => void;
}

const initialState: State = {
  items: [],
};

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the product with the same ID and size already exists in the cart
      const existingCartItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingCartItemIndex >= 0) {
        // Product with the same ID and size exists, increase quantity
        const updatedItems = [...state.items]; // Copy the existing items
        updatedItems[existingCartItemIndex] = {
          ...updatedItems[existingCartItemIndex],
          quantity: updatedItems[existingCartItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Product does not exist in the same size, add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      console.log("Removing item:", action.payload);
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      console.log("New items:", newItems);
      return {
        ...state,
        items: newItems,
      };
    // Add more cases for other actions as needed
    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "SET_CART":
      return {
        ...state,
        items: action.payload.items,
      };

    default:
      return state;
  }
};

const ShoppingCartContext = createContext<ContextValue | undefined>(undefined);

const useShoppingCart = (): ContextValue => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

interface ShoppingCartProviderProps {
  children: ReactNode;
}

const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: Product): void => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (item: Product): void => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const increaseQuantity = (item: Product): void => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
  };

  const decreaseQuantity = (item: Product): void => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
  };
const setCart = (cart: State): void => {
  dispatch({ type: "SET_CART", payload: cart });
};


  // Add more actions as needed

  const value: ContextValue = {
    cart: state,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setCart,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartProvider, useShoppingCart };
