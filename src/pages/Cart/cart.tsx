import { DangerIcon, RefreshIcon } from "../../components/ui/icons-svgs/SvgIcons";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";
import { CheckoutBtn, } from "../../components/ui/buttons";
import { useCart } from "../../hooks/cart/cartProvider";
import type { CartItem } from "../../lib/api/Cart/cartServices";
import { useEffect, useState } from "react";
import { OccupiedCart, EmptyCart } from "./components/cartState";


export const Cart = () => {
  const { cart, status, fetchCart, removeCartItem, addItemToCart } = useCart();
  const [localQuantities, setLocalQuantities] = useState<Record<number, number>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartTotal = cart?.total
  const cartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  useEffect(() => {
    if (cartItems.length > 0) {
      const initial = cartItems.reduce<Record<number, number>>((acc, item) => {
        acc[item.id] = item.quantity;
        return acc
      }, {});
      setLocalQuantities(initial);
    }
  }, [cartItems]);

  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const validItems = cart.items.filter(item => item !== null && item !== undefined) as CartItem[];
      setCartItems(validItems);
    } else {
      setCartItems([]);
    }
  }, [cart]);

  const handleItemRemove = async (cartItemId: number) => {
    setLocalQuantities(prev => {
      const currentQuantity = prev[cartItemId] || 1;
      if (currentQuantity <= 1) {
        console.log(`Removing item ${cartItemId} from cart`);
        removeCartItem(cartItemId, 1);
        return prev;
      }
      return {...prev, [cartItemId]: currentQuantity - 1}; 
    })
  };

  const handleAddItem = async (cartItemId: number) => {
    setLocalQuantities(prev => {
      console.log(`Adding item ${cartItemId} to cart`);
      return {
        ...prev,
        [cartItemId]: (prev[cartItemId] || 0) + 1
      };
    });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === 'error' || cart === null) {
    return ( 
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center  gap-4">
          <DangerIcon className="text-bittersweet size-16 animate-pulse" />
          <div className="error-message text-space_cadet font-bold text-center px-4">
            Error: <br/> Difficulty getting cart. <br /> Retry or check back later
          </div>
          <button 
            onClick={fetchCart}
            className="px-6 py-2 font-semibold bg-majorelle text-white rounded-lg hover:bg-robin_egg hover:scale-110 ease-in-out duration-300 transition-all"
            >
            Retry
          </button>
        </div>
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
            <div className="flex flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Items: <b className="text-majorelle">{cartTotalItems}</b>
              </h2>
              <button 
                className="group rounded-lg bg-space_cadet/10 flex items-center gap-2 text-space_cadet/80 hover:bg-majorelle/20 hover:text-majorelle transition-all duration-200"
                onClick={fetchCart}
              > 
                <RefreshIcon className="size-5 group-hover:-rotate-360 transition-transform duration-900" />
                <span className="text-sm font-medium">Refresh Cart</span>
              </button>
            </div>
            

            {/* Cart Items List */}
            {cartItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, idx) => (
                  <OccupiedCart
                    {...item}
                    quantity={localQuantities[item.id] || item.quantity}
                    onRemove={handleItemRemove}
                    onAdd={handleAddItem}
                    key={`${item.id}-${item.added_at}-${idx}`}
                    {...item}
                  />
                ))}
              </ul>
            ) : (
              <EmptyCart />
            )}

            <div className="flex flex-col  gap-2 text-sm text-space_cadet/40 mt-8">
              <div className="flex items-center justify-center gap-2 ">
                <DangerIcon className="size-10" />
                <span>Cart contents are session-only and items may be lost upon leaving the site.</span>
              </div>
              <p className="mx-2 text-sm flex justify-end">Cart Id: {cart.id}</p>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="w-full lg:w-96 bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Summary</h2>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-bittersweet/70 mb-4">
                  Taxes & shipping applied at checkout
                </p>
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartTotalItems} items):</span>
                  <span className="font-semibold">${cartTotal}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal:</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <CheckoutBtn />
            </div>
          </div>
        </div>

        {/* Advisories */}
        <section className="mb-48 mt-8 bg-white shadow-sm rounded-xl p-6">
          <h3 className="font-semibold text-space_cadet mb-3">Important Information</h3>
          <p className="text-sm text-space_cadet/60 leading-relaxed">
            The price and availability of items at RuglyBarnacle.com are subject to change. 
            The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
            You can modify quantities or remove items before proceeding to checkout. Taxes and shipping are calculated in the Stripe checkout.
          </p>
        </section>
      </div>
    </main>
  );
};
