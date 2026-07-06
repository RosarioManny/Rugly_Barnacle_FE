import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../../lib/api/Cart/cartServices";
import type { Cart } from "../../lib/api/Cart/cartServices";
import type { Product } from "../../lib/api/Product/productservices";
import { logColors } from "../../lib/api/logFileStyles";

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

interface CartContextType {
  cart: Cart | null;
  status: "idle" | "loading" | "success" | "error";
  fetchCart: () => void;
  addItemToCart: (product: Product, quantity?: number) => void;
  removeCartItem: (productId: number, quantity?: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCartItems: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const fetchCart = () => {
    try {
      log('info', ` [cartProvider] fetchCart called`);
      setStatus("loading");
      const cartData = getCart();
      setCart(cartData);
      setStatus("success");
      log('success', ` [cartProvider] Cart fetched — ${cartData.items.length} item(s), total: $${cartData.total}`);
    } catch (err) {
      log('error', `[cartProvider] fetchCart failed`);
      setStatus("error");
    }
  };

  const addItemToCart = (product: Product, quantity: number = 1) => {
    try {
      log('info', ` [cartProvider] addItemToCart — "${product.name}", qty: ${quantity}`);
      const updated = addToCart(product, quantity);
      setCart(updated);
      log('success', ` [cartProvider] Cart state updated — ${updated.items.length} item(s), total: $${updated.total}`);
    } catch (err) {
      log('error', `[cartProvider] addItemToCart failed for product: "${product.name}"`);
      setStatus("error");
    }
  };

  const removeCartItem = (productId: number, quantity: number = 1) => {
    try {
      log('info', ` [cartProvider] removeCartItem — productId: ${productId}, qty: ${quantity}`);
      const updated = removeFromCart(productId, quantity);
      setCart(updated);
      log('success', ` [cartProvider] Cart state updated — ${updated.items.length} item(s), total: $${updated.total}`);
    } catch (err) {
      log('error', `[cartProvider] removeCartItem failed for productId: ${productId}`);
      setStatus("error");
    }
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    try {
      log('info', ` [cartProvider] updateCartItemQuantity — productId: ${productId}, new qty: ${quantity}`);
      removeFromCart(productId, Infinity);
      const item = cart?.items.find(i => i.product_id === productId);
      if (item) {
        const updated = addToCart(item.product, quantity);
        setCart(updated);
        log('success', ` [cartProvider] Quantity updated — productId: ${productId} → qty: ${quantity}`);
      } else {
        log('warn', `[cartProvider] updateCartItemQuantity — product ${productId} not found in current cart state`);
      }
    } catch (err) {
      log('error', `[cartProvider] updateCartItemQuantity failed for productId: ${productId}`);
      setStatus("error");
    }
  };

  const clearCartItems = () => {
    log('warn', ` [cartProvider] clearCartItems called`);
    const updated = clearCart();
    setCart(updated);
    log('success', ` [cartProvider] Cart cleared`);
  };

  useEffect(() => {
    log('info', ` [cartProvider] Mounted — loading cart from localStorage`);
    fetchCart();
  }, []);

  const value: CartContextType = {
    cart,
    status,
    fetchCart,
    addItemToCart,
    removeCartItem,
    updateCartItemQuantity,
    clearCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};