import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_price: string;
  quantity: number;
  dimensions?: string;
  product_images?: any;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType {
  cart: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>(initialState);

  const addItem = (newItem: CartItem) => {
    setCart(prev => {
      const existingItemIndex = prev.items.findIndex(item => item.product_id === newItem.product_id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = prev.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
        
        return calculateCartTotals(updatedItems);
      } else {
        // Add new item
        const updatedItems = [...prev.items, newItem];
        return calculateCartTotals(updatedItems);
      }
    });
  };

  const removeItem = (productId: number) => {
    setCart(prev => {
      const updatedItems = prev.items.filter(item => item.product_id !== productId);
      return calculateCartTotals(updatedItems);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCart(prev => {
      const updatedItems = prev.items.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      );
      return calculateCartTotals(updatedItems);
    });
  };

  const clearCart = () => {
    setCart(initialState);
  };

  // Helper function to calculate totals
  const calculateCartTotals = (items: CartItem[]): CartState => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (parseFloat(item.product_price) * item.quantity), 0);
    
    return {
      items,
      itemCount,
      total: parseFloat(total.toFixed(2))
    };
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}