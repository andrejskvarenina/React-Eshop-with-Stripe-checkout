import React, { createContext, useState } from 'react'
import { Item } from '../types/types';

type CartItem = Item & {
  quantity: number;
};

type ContextType = {
  cartItems: CartItem[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  getSubtotal: () => number;
  getCartItemCount: () => number;
};

export const StoreContext = createContext<ContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  getSubtotal: () => 0,
  getCartItemCount: () => 0,
});

export const StoreContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: Item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);


    if (index === -1) {
      // Item not in cart, add it
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    } else {
      // Item already in cart, update quantity
      const newCartItems = [...cartItems];
      newCartItems[index].quantity++;
      setCartItems(newCartItems);
    }
  };

  const removeItem = (item: Item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
    if (index === -1) {
      // Item not in cart, do nothing
      return;
    }
  
    const newCartItems = [...cartItems];
    const itemQuantity = newCartItems[index].quantity;
  
    if (itemQuantity > 1) {
      // Decrease quantity by 1 if item is in cart with quantity > 1
      newCartItems[index].quantity--;
    } else {
      // Remove item if it's in cart with quantity = 1
      newCartItems.splice(index, 1);
    }
  
    setCartItems(newCartItems);
  };

  const getSubtotal = (): number => {
    let subtotal = 0;
  
    for (const item of cartItems) {
      subtotal += item.price * item.quantity;
    }
  
    return Number(subtotal.toFixed(2));
  };

  const getCartItemCount = (): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }
  
  

  const contextValue = { cartItems, addItem, removeItem, getSubtotal, getCartItemCount};

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
