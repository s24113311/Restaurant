import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('laoban-cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      localStorage.removeItem('laoban-cart');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('laoban-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (dish) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === dish.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === dish.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const priceAsNumber = parseFloat(dish.price.replace('$', ''));
      return [...prevItems, { ...dish, price: priceAsNumber, quantity: 1 }];
    });
  };

  const removeFromCart = (dishName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== dishName));
  };

  const updateQuantity = (dishName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishName);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.name === dishName ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};