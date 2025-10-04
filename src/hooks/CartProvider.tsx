// contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { addToCart, type CartInfo, getCart, removeFromCart } from '../lib/api/Cart/cartServices';

interface CartContextType {
  cart: CartInfo | null;
  cartItemCount: number;
  addItemToCart: (productId: number, quantity?: number) => Promise<void>;
  removeItemFromCart: (productId: number, quantity?: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  status: 'loading' | 'error' | 'success' | 'idle';
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartInfo | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('loading');

  const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || cart?.items?.length || 0;

  const fetchCart = useCallback(async () => {
    try {
      setStatus('loading');

      const data = await getCart();
      setCart(data);

      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  }, []);

  const addItemToCart = useCallback(async (productId: number, quantity: number = 1) => {
    try {
      setStatus('loading');
      const updatedCart = await addToCart(productId, quantity);
      setCart(updatedCart);

      setStatus('success');

      setTimeout(() => {
        fetchCart() // < - Refreshes the cart to get the amount
      }, 1);
    } catch (err) {
      setStatus('error');
      throw err;
    }
  }, [fetchCart]);

  const removeItemFromCart = useCallback(async (productId: number, quantity: number = 1) => {
    try {
      setStatus('loading');

      const updatedCart = await removeFromCart(productId, quantity);
      setCart(updatedCart);

      setStatus('success');
    } catch (err) {
      setStatus('error');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider 
      value={{
      cart,
      cartItemCount,
      fetchCart,
      status,
      addItemToCart,
      removeItemFromCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};