import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, removeFromCart, addToCart, deleteCartItem, updateCartItem} from '../../lib/api/Cart/cartServices'
import type { Cart } from '../../lib/api/Cart/cartServices';

// Context Types
interface CartContextType {
  cart: Cart | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  fetchCart: () => Promise<void>;
  addItemToCart: (productId: number, quantity?: number) => Promise<void>;
  removeCartItem: (productId: number, quantity?: number) => Promise<void>;
  updateCartItemQuantity: (itemId: number, quantity: number) => Promise<void>;
  // removeCartItem: (itemId: number) => Promise<void>;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Props
interface CartProviderProps {
  children: React.ReactNode;
}

// Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  // Fetch Cart
  const fetchCart = async () => {
    try {
      setStatus('loading');
      
      const cartData = await getCart();
      setCart(cartData);
      setStatus('success');
      // console.log('🛒 Cart loaded:', cartData);
    } catch (err: any) {
      setStatus('error');
      if (status === 'error') {
        console.error('❌ Error fetching cart:', err);
      }
    }
  };

  // Add Item to Cart
  const addItemToCart = async (productId: number, quantity: number = 1) => {
    try {
      await addToCart(productId, quantity);
      // Refresh cart after adding
      await fetchCart();
      console.log(`✅ Added product ${productId} to cart`);
    } catch (err: any) {
      setStatus('error');
      if (status === 'error') {
        console.error('❌ Error fetching cart:', err);
      }
      throw err; // Re-throw so calling component can handle it
    }
  };

  // Remove Item from Cart
  const removeCartItem = async (productId: number, quantity: number = 1) => {
    try {
      
      const updatedCart = await removeFromCart(productId, quantity);
      setCart(updatedCart);
      console.log(`✅ Removed product ${productId} from cart`);
    } catch (err: any) {
      setStatus('error');
      if (status === 'error') {
        console.error('❌ Error fetching cart:', err);
      }
      throw err;
    }
  };

  // Update Cart Item Quantity (using CartItemDetailView)
  const updateCartItemQuantity = async (itemId: number, quantity: number) => {
    try {
      
      await updateCartItem(itemId, quantity);
      // Refresh cart after update
      await fetchCart();
      console.log(`✅ Updated cart item ${itemId} quantity to ${quantity}`);
    } catch (err: any) {
      setStatus('error');
      if (status === 'error') {
        console.error('❌ Error fetching cart:', err);
      }
      throw err;
    }
  };

  // Delete Cart Item Completely (using CartItemDetailView)
  // const removeCartItem = async (cartItemId: number) => {
  //   try {
      
  //     await deleteCartItem(cartItemId);
  //     // Refresh cart after deletion
  //     await fetchCart();
  //     console.log(`✅ Deleted cart item ${cartItemId}`);
  //   } catch (err: any) {
  //     setStatus('error');
  //     if (status === 'error') {
  //       console.error('❌ Error fetching cart:', err);
  //     }
  //     throw err;
  //   }
  // };


  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value: CartContextType = {
    cart,
    status,
    fetchCart,
    addItemToCart,
    removeCartItem,
    updateCartItemQuantity,
    // removeCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};