import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/cart/cartProvider';
import * as CheckoutStates from './components/checkoutComponents'
import { OrderSummary } from './OrderSummary/OrderSummary';
import { type CartItem } from '../../lib/api/Cart/cartServices';
import { createCheckout } from '../../lib/api/Stripe/stripeservices';
import { Link } from 'react-router-dom';
import { logColors } from '../../lib/api/logFileStyles';

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

export const CheckoutPage = () => {
  const { cart, status, fetchCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stockErrors, setStockErrors] = useState<{ product_name: string; requested: number; available: number }[]>([]);

  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const validItems = cart.items.filter(item => item !== null && item !== undefined) as CartItem[];
      setCartItems(validItems);
      log('info', `[CheckoutPage] Cart loaded — ${validItems.length} item(s)`);
    } else {
      setCartItems([]);
      log('warn', `[CheckoutPage] Cart is empty or null`);
    }
  }, [cart]);

  const cartSubtotal = Number(cart?.total) || 0;

  const handleStripeCheckout = async () => {
    if (!cart || cartItems.length === 0) {
      log('warn', `[CheckoutPage] Checkout attempted with empty cart`);
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    setStockErrors([]);
    log('info', `[CheckoutPage] Initiating Stripe checkout — ${cartItems.length} item(s), subtotal: $${cartSubtotal}`);

    try {
      const sessionData = await createCheckout(cartItems);

      if (sessionData.checkout_url) {
        log('success', `[CheckoutPage] Redirecting to Stripe checkout`);
        window.location.href = sessionData.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      const errorData = error.response?.data;
      log('error', `[CheckoutPage] Checkout failed — ${errorData?.error || error.message}`);

      if (errorData?.items) {
        // Stock validation errors from backend
        setStockErrors(errorData.items);
        log('warn', `[CheckoutPage] Stock errors returned — ${errorData.items.length} item(s) unavailable`);
      } else {
        alert('There was an error starting checkout. Please try again.');
      }

      setIsProcessing(false);
    }
  };

  if (status === 'loading' || isProcessing) {
    return <CheckoutStates.CheckoutLoadingState />;
  }

  if (status === 'error' || cart === null) {
    return <CheckoutStates.CheckoutErrorState onRetry={fetchCart} />;
  }

  if (cartItems.length === 0) {
    return <CheckoutStates.CheckoutEmptyState onContinueShopping={() => navigate('/shop')} />;
  }

  return (
    <main className="min-h-screen py-8 mb-20" aria-label="Checkout Page">
      <div className="mx-auto px-4 max-w-7xl">
        <CheckoutStates.CheckoutStockErrorState
          stockErrors={stockErrors}
          onUpdateCart={() => navigate('/cart')}
        />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-space_cadet/90 mb-2">Checkout</h1>
          <p className="text-space_cadet/60">Review your order and proceed to payment</p>
        </div>

        <Link
          className="
            object-fit w-fit
            group pointer duration-200 transform px-4 ml-2 mb-4
            transition-color hover:text-bittersweet
            flex gap-2 items-center"
          to='/cart'
        >
          <div className="caret-left text-space_cadet duration-200 group-hover:text-bittersweet text-fleece body_text" />
          Back
        </Link>

        {/* Checkout Content */}
        <div className="flex flex-col max-w-[75vw] lg:flex-row gap-8 mx-auto">

          {/* Order Summary */}
          <div className="flex-1 w-full mx-auto">
            <OrderSummary
              cartItems={cartItems}
              subtotal={cartSubtotal}
            />
          </div>

          {/* Payment Section */}
          <div className="flex-1 w-full mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
              <h2 className="text-xl font-semibold text-space_cadet/90 mb-4">Complete Purchase</h2>

              {/* Security Badges */}
              <div className="mb-6 p-4 bg-fleece/60 rounded-lg">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="text-sm text-space_cadet/60">Secure checkout with</div>
                  <div className="text-xl font-bold text-majorelle/90">Stripe</div>
                </div>
                <div className="flex justify-center gap-3">
                  <div className="text-sm text-space_cadet/50"> - SSL Encrypted</div>
                  <div className="text-sm text-space_cadet/50"> - PCI Compliant</div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleStripeCheckout}
                disabled={isProcessing}
                className="
                  w-full bg-majorelle
                  hover:bg-robin_egg text-white font-bold py-4 px-6 rounded-lg
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Redirecting to Secure Checkout...' : 'Proceed Checkout'}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-space_cadet/50">
                  You'll be redirected to Stripe to complete your payment securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};