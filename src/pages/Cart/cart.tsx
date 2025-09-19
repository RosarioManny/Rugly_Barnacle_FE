import { DangerIcon, RefreshIcon } from "../../components/ui/icons-svgs/SvgIcons";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";
import { OccupiedCart } from "../../components/ui/cart/occupiedCart";
import { EmptyCart } from "../../components/ui/cart/emptyCart";
import { CheckoutBtn } from "../../components/ui/buttons";
import type { CartItem } from "../../lib/api/Cart/cartServices";
import { useCart } from "../../hooks/CartProvider"
import { useEffect, useState} from "react";

export const Cart = () => {
  const { cart, loading, error, fetchCart, removeItemFromCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const validItems = cart.items.filter(item => item !== null && item !== undefined) as CartItem[];
      setCartItems(validItems)
    } else {
      setCartItems([])
    }
  }, [cart]);

  const handleItemRemove = async (productId: number ) => {
    try {
      await removeItemFromCart(productId)
    } catch(err) {
      console.error("Failed to Remove", err )
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || cart === null) {
    return ( 
      <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
        <DangerIcon className="text-bittersweet size-16 animate-pulse" />
        <div className="error-message text-bittersweet font-bold text-center px-4">
          Error: <br/> { "Difficulty getting cart. Check back later"}
        </div>
        <button 
          onClick={fetchCart}
          className="px-6 py-2 font-semibold bg-majorelle text-white rounded-lg hover:bg-robin_egg hover:scale-110 ease-in-out duration-300 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8" aria-label="Cart Page">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Items:  <b className="text-majorelle">{cartItems.length}</b></h2>
              <button 
                className="group flex items-center gap-2 text-gray-600 hover:text-majorelle transition-colors duration-200"
                onClick={fetchCart}
              > 
                <RefreshIcon className="size-5 group-hover:-rotate-360 transition-transform duration-900" />
                <span className="text-sm font-medium">Refresh Cart</span>
              </button>
            </div>

            {cartItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, idx) => (
                
                    <OccupiedCart
                      onRemove={handleItemRemove}
                      key={`${item.id}-${item.added_at}-${idx}`}
                      {...item}
                    />
                ))}
              </ul>
            ) : (
              <EmptyCart />
            )}
          </div>

          {/* Checkout Section */}
          <div className="w-full lg:w-96 bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Summary</h2>
              <p className="text-xs text-bittersweet/60 mb-4">
                Taxes & shipping applied at checkout
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span className="font-semibold">${cart.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Shipping:</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax:</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${cart.total}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center ">
              <CheckoutBtn />
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Free shipping on orders over $150
            </p>
          </div>
        </div>

        {/* Advisories */}
        <section className="mb-48 mt-8  bg-white shadow-sm rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The price and availability of items at RuglyBarnacle.com are subject to change. 
            The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
            You can modify quantities or remove items before proceeding to checkout.
          </p>
        </section>
      </div>
    </main>
  );
};