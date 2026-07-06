import api from '../apiConfig.ts';
import { logColors } from '../logFileStyles';
import type { CartItem } from '../Cart/cartServices';

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

export interface CheckoutSessionResponse {
  checkout_url: string;
}

export interface CheckoutSuccessResponse {
  message: string;
  deduction_results: {
    product_id: number;
    product_name: string;
    quantity_deducted: number;
    original_stock: number;
    remaining_stock: number;
    price: string;
  }[];
  session_id: string;
  timestamp: string;
  already_processed?: boolean;
}

// Shape the localStorage cart into what the backend expects
const mapCartItemsForCheckout = (cartItems: CartItem[]) => {
  return cartItems.map(item => ({
    product_id: item.product_id,
    name: item.product_name,
    price: item.product_price,
    quantity: item.quantity,
  }));
};

export const createCheckout = async (
  cartItems: CartItem[],
  customerEmail?: string
): Promise<CheckoutSessionResponse> => {
  try {
    log('info', `[stripeServices] createCheckout — ${cartItems.length} item(s)`);

    const payload = {
      items: mapCartItemsForCheckout(cartItems),
      customer_email: customerEmail || '',
    };

    log('info', `[stripeServices] Sending cart to backend: ${JSON.stringify(payload.items)}`);

    const response = await api.post('create-checkout-session/', payload);
    log('success', `[stripeServices] Checkout session created`);
    return response.data;
  } catch (err: any) {
    log('error', `[stripeServices] createCheckout failed — ${err.response?.data?.error || err.message}`);
    throw err;
  }
};

export const checkoutSuccess = async (sessionId: string): Promise<CheckoutSuccessResponse> => {
  try {
    log('info', `[stripeServices] checkoutSuccess — sessionId: ${sessionId}`);

    const response = await api.post('checkout-success/', {
      session_id: sessionId,
    });

    log('success', `[stripeServices] Checkout success verified`);
    return response.data;
  } catch (err: any) {
    log('error', `[stripeServices] checkoutSuccess failed — ${err.response?.data?.error || err.message}`);
    throw err;
  }
};