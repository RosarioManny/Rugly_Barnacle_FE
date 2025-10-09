import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/_header";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";
import { useCart } from "../../hooks/CartProvider";
import type { CartItem } from "../../lib/api/Cart/cartServices";

export const Checkout = () => {
  const { cart, status } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US"
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const validItems = cart.items.filter(item => item !== null && item !== undefined) as CartItem[];
      setCartItems(validItems);
    } else {
      setCartItems([]);
    }
  }, [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Replace with Stripe payment processing
      console.log("Processing payment with:", {
        customerInfo,
        cartItems,
        total: cart?.total
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Redirect to success page after Stripe integration
      alert("Payment processing would happen here with Stripe");
      
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStripeCheckout = async () => {
    // TODO: Implement Stripe Checkout Session creation
    // This will be replaced with actual Stripe integration
    setIsProcessing(true);
    try {
      // const session = await createStripeCheckoutSession(cartItems, customerInfo);
      // window.location.href = session.url;
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Stripe Checkout would redirect here");
    } catch (error) {
      console.error("Stripe checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === 'error' || !cart || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fleece mb-4">Checkout</h1>
          <p className="text-fleece mb-4">
            {cartItems.length === 0 ? "Your cart is empty" : "Error loading cart"}
          </p>
          <button
            onClick={() => navigate('/cart')}
            className="px-6 py-2 bg-majorelle text-white rounded-lg hover:bg-robin_egg transition-colors"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-fleece">
      <Header 
        title="Checkout"
        tagline="Complete your purchase"
        img="/gallery/Product_Wristrug_Assorted_Showcase copy.webp"
        img_alt="Rug collection showcase"
      />

      <div className=" mx-auto px-4 py-20 md:py-48 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-space_cadet mb-6">Customer Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-space_cadet mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-fleece rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-space_cadet mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-fleece rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-space_cadet mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-fleece rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-space_cadet mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-fleece rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={customerInfo.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  />
                </div>
              </div>

              {/* Payment Method Placeholder */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-space_cadet mb-4">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-center text-gray-600">
                    Stripe payment integration will be implemented here
                  </p>
                  <div className="mt-4 flex justify-center space-x-4">
                    {/* Placeholder for Stripe Elements */}
                    <div className="h-10 bg-gray-200 rounded w-16"></div>
                    <div className="h-10 bg-gray-200 rounded w-16"></div>
                    <div className="h-10 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col gap-4 pt-6">
                <button
                
                  onClick={handleStripeCheckout}
                  disabled={isProcessing}
                  className="
                    bg-majorelle text-white 
                    py-3 px-4 rounded-lg font-semibold hover:bg-robin_egg transition-colors 
                    disabled:opacity-90 disabled:bg-bittersweet disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="z-10 flex items-center gap-6 justify-center">
                      <Spinner loading={false} borderColor="border-fleece"/>
                      Processing...
                    </div>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>

                <button
                
                  onClick={() => navigate('/cart')}
                  className="w-full bg-space_cadet/50 text-white py-3 px-4 rounded-lg font-semibold hover:bg-bittersweet/80 transition-colors"
                >
                  Return to Cart
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-space_cadet mb-6">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  {item.product_images?.primary && (
                    <img
                      src={item.product_images.primary}
                      alt={item.product_name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-space_cadet truncate">{item.product_name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-600">{item.dimensions}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-space_cadet">
                      ${(parseFloat(item.product_price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cartItems.length} items):</span>
                <span className="font-semibold">${cart.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span className="text-space_cadet">Calculated at checkout</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${cart.total}</span>
              </div>
            </div>

            {/* Development Notice */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Development Mode:</strong> Payment processing is not yet implemented. 
                This is a preview of the checkout experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};