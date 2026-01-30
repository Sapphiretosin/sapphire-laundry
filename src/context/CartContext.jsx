// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // optional: track logged-in user

  // Add item to cart
  const addToCart = (item) => {
    const exists = cart.find((i) => i.title === item.title);
    if (exists) {
      setCart(
        cart.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Update quantity
  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        setUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
