// src/pages/checkout/CheckoutPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/cart/cartProvider';
import { Spinner } from '../../components/ui/loaders/loadingSpinner';
import { DangerIcon } from '../../components/ui/icons-svgs/SvgIcons';
import { OrderSummary } from './OrderSummary/OrderSummary';
import { type CartItem } from '../../lib/api/Cart/cartServices';

export const CheckoutPage = () => {
  const { cart, status, fetchCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const validItems = cart.items.filter(item => item !== null && item !== undefined) as CartItem[];
      setCartItems(validItems);
    } else {
      setCartItems([]);
    }
  }, [cart]);

  const subtotal = cart?.total || 0;
  const shippingCost = 4.99; // Fixed or calculated from backend
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount;

  const handleStripeCheckout = async () => {
    if (!cart || cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare data for Stripe Checkout session
      const checkoutData = {
        cartId: cart.id,
        items: cartItems.map(item => ({
          product_id: item.product.id,
          product_name: item.product_name,
          quantity: item.quantity,
          price: parseFloat(item.product_price),
          image: item.product_images?.primary
        })),
        totalAmount: totalAmount,
        successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cart`
      };

      // Call your backend to create Stripe Checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData)
      });

      const session = await response.json();

      if (session.id) {
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      } else {
        throw new Error('Failed to create checkout session');
      }

    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error starting checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  if (status === 'loading' || isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  if (status === 'error' || cart === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4 max-w-md text-center">
          <DangerIcon className="text-bittersweet size-16" />
          <div className="error-message text-space_cadet font-bold">
            Error loading your cart
          </div>
          <button 
            onClick={fetchCart}
            className="px-6 py-2 font-semibold bg-majorelle text-white rounded-lg hover:bg-robin_egg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-6 py-2 font-semibold bg-majorelle text-white rounded-lg hover:bg-robin_egg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8" aria-label="Checkout Page">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review your order and proceed to payment</p>
        </div>

        {/* Checkout Content */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Order Summary */}
          <div className="flex-1">
            <OrderSummary 
              cartItems={cartItems}
              subtotal={subtotal}
              shippingCost={shippingCost}
              taxAmount={taxAmount}
              totalAmount={totalAmount}
            />
          </div>

          {/* Payment Section */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Purchase</h2>
              
              {/* Security Badges */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="text-xs text-gray-600">Secure checkout with</div>
                  <div className="font-bold text-gray-900">Stripe</div>
                </div>
                <div className="flex justify-center gap-3">
                  <div className="text-xs text-gray-500"> - SSL Encrypted</div>
                  <div className="text-xs text-gray-500"> - PCI Compliant</div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleStripeCheckout}
                disabled={isProcessing}
                className="w-full bg-majorelle hover:bg-robin_egg text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Redirecting to Secure Checkout...' : 'Proceed Checkout'}
              </button>

              {/* Trust Signals */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
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