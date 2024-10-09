import React from 'react';
import { CartContext } from '../contexts/CartContext';

export const useCartContext = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("Cart context unavailable");
  }
  return context;
};
