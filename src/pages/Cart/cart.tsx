import { DangerIcon, RefreshIcon } from "../../components/ui/icons-svgs/SvgIcons";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";
import { CheckoutBtn } from "../../components/ui/buttons";
import { useCart } from "../../hooks/cart/cartProvider";
import type { CartItem } from "../../lib/api/Cart/cartServices";
import { useEffect, useState } from "react";
import { OccupiedCart, EmptyCart } from "./components/cartState";
import { logColors } from "../../lib/api/logFileStyles";

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

const isDev = false 
export const Cart = () => {
  const { cart, status, fetchCart, removeCartItem, addItemToCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const validItems = cart.items.filter(item => item !== null && item !== undefined) as CartItem[];
      setCartItems(validItems);
      log('info', `[Cart] Cart state updated — ${validItems.length} valid item(s)`);
    } else {
      setCartItems([]);
      log('warn', `[Cart] Cart is empty or null`);
    }
  }, [cart]);

  const cartTotal = cart?.total;
  const cartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleItemRemove = (cartItemId: number) => {
    try {
      log('info', `[Cart] handleItemRemove — productId: ${cartItemId}`);
      removeCartItem(cartItemId, 1);
    } catch (err) {
      log('error', `[Cart] handleItemRemove failed — productId: ${cartItemId}`);
    }
  };

  const handleAddItem = (cartItemId: number) => {
    try {
      const cartItem = cartItems.find(item => item.id === cartItemId);
      if (!cartItem) {
        log('warn', `[Cart] handleAddItem — item ${cartItemId} not found in cartItems`);
        return;
      }
      log('info', `[Cart] handleAddItem — "${cartItem.product_name}" (productId: ${cartItemId})`);
      addItemToCart(cartItem.product, 1);
    } catch (err) {
      log('error', `[Cart] handleAddItem failed — productId: ${cartItemId}`);
    }
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
        <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center gap-4">
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
                className="
                  rounded-lg
                  group bg-space_cadet/10
                  flex items-center gap-2
                  text-space_cadet/80
                  hover:bg-majorelle/20 hover:text-majorelle
                  transition-all duration-200"
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

            {/* Footer note — updated to reflect localStorage */}
            <div className="flex flex-col gap-2 text-sm text-space_cadet/40 mt-8">
              <div className="flex items-center justify-center gap-2">
                <DangerIcon className="size-5" />
                <span>Cart contents persist between visits.</span>
              </div>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="w-full lg:w-96 bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Summary</h2>
              <p className="my-2 text-sm text-majorelle/60">
                Review order before checking out.
              </p>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-bittersweet/70 mb-4">
                  Taxes & shipping applied at checkout
                </p>
                <div className="flex justify-between text-sm">
                  <span>Item(s) : {cartTotalItems} items</span>
                  <span className="font-semibold">${cartTotal}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal:</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </div>
            <div className={`flex justify-center ${isDev ? 'gap-4 bg-bittersweet/10 text-center p-4 rounded-lg' : ''}`}>
            {!isDev ? (
                <CheckoutBtn /> 
            ) : (
              <>
              <DangerIcon className="size-10 text-bittersweet/85  " />
                <div className="text-sm text-bittersweet/85 flex flex-col gap-2">
                <p className="font-semibold">
                    Checkout temporarily disabled. 
                  </p>
                  <p >
                    Please check back later or browse our shop. Apolgies for the inconvenience. 
                  </p>
              </div>
              </>
            )}
              
            </div>
          </div>
        </div>

        {/* Advisories */}
        <section className="mb-48 mt-8 bg-white shadow-sm rounded-xl p-6">
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