import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("sapphireCart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sapphireCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (order) => {
    const now = new Date();
    const earliest = new Date(now);
    const latest = new Date(now);
    earliest.setDate(now.getDate() + 4);
    latest.setDate(now.getDate() + 7);

    const newOrder = {
      id: Date.now(),
      name: order.name,
      price: order.price,
      orderDate: now.toLocaleString(),
      deliveryRange: `${earliest.toLocaleDateString()} - ${latest.toLocaleDateString()}`,
    };

    setCart((prev) => [...prev, newOrder]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
