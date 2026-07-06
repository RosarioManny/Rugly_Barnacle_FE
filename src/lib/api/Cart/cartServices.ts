import type { Product } from "../Product/productservices";
import { logColors } from "../logFileStyles";

const CART_KEY = "rugly_cart";

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

export interface CartItem {
  id: number;
  product: Product;
  product_id: number;
  product_name: string;
  product_price: string;
  product_images?: {
    primary: string;
  };
  quantity: number;
  added_at: string;
  dimensions?: string;
}

export interface Cart {
  id: number;
  session_key: string;
  items: CartItem[];
  total: string;
  created_at: string;
  updated_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const computeTotal = (items: CartItem[]): string => {
  return items
    .reduce((sum, item) => sum + parseFloat(item.product_price) * item.quantity, 0)
    .toFixed(2);
};

const buildCart = (items: CartItem[]): Cart => ({
  id: 1,
  session_key: "local",
  items,
  total: computeTotal(items),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const loadItems = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const items = raw ? JSON.parse(raw) : [];
    log('info', ` [cartServices] Loaded ${items.length} item(s) from localStorage`);
    return items;
  } catch (err) {
    log('error', `[cartServices] Failed to parse localStorage cart — resetting`);
    return [];
  }
};

const saveItems = (items: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  log('info', ` [cartServices] Saved ${items.length} item(s) to localStorage`);
};

// ── Public API ────────────────────────────────────────────────────────────────

export const getCart = (): Cart => {
  log('info', ` [cartServices] getCart called`);
  const cart = buildCart(loadItems());
  log('success', ` [cartServices] Cart loaded — ${cart.items.length} item(s), total: $${cart.total}`);
  return cart;
};

export const addToCart = (product: Product, quantity: number = 1): Cart => {
  log('info', ` [cartServices] addToCart — product: "${product.name}" (id: ${product.id}), qty: ${quantity}`);
  const items = loadItems();
  const existing = items.find(item => item.product_id === product.id);

  if (existing) {
    existing.quantity += quantity;
    log('info', ` [cartServices] Product already in cart — updated qty to ${existing.quantity}`);
  } else {
    const primaryImage = product.images?.find(img => img.is_primary) ?? product.images?.[0];
    items.push({
      id: product.id,
      product,
      product_id: product.id,
      product_name: product.name,
      product_price: String(product.price),
      product_images: primaryImage ? { primary: primaryImage.image } : undefined,
      dimensions: product.dimensions,
      quantity,
      added_at: new Date().toISOString(),
    });
    log('success', `✅ [cartServices] New item added — "${product.name}"`);
  }

  saveItems(items);
  const cart = buildCart(items);
  log('success', `[cartServices] Cart updated — ${cart.items.length} item(s), total: $${cart.total}`);
  return cart;
};

export const removeFromCart = (productId: number, quantity: number = 1): Cart => {
  log('info', ` [cartServices] removeFromCart — productId: ${productId}, qty: ${quantity}`);
  let items = loadItems();
  const existing = items.find(item => item.product_id === productId);

  if (existing) {
    existing.quantity -= quantity;
    log('info', ` [cartServices] New quantity for product ${productId}: ${existing.quantity}`);
    if (existing.quantity <= 0) {
      items = items.filter(item => item.product_id !== productId);
      log('warn', ` [cartServices] Product ${productId} removed from cart (qty hit 0)`);
    }
  } else {
    log('warn', ` [cartServices] removeFromCart — product ${productId} not found in cart`);
  }

  saveItems(items);
  const cart = buildCart(items);
  log('success', `[cartServices] Cart updated — ${cart.items.length} item(s), total: $${cart.total}`);
  return cart;
};

export const clearCart = (): Cart => {
  log('warn', `🧹 [cartServices] clearCart called — wiping all items`);
  saveItems([]);
  const cart = buildCart([]);
  log('success', ` [cartServices] Cart cleared`);
  return cart;
};