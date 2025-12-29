// src/pages/checkout/components/OrderSummary.tsx
import { type CartItem } from "../../../lib/api/Cart/cartServices";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
}

export const OrderSummary = ({
  cartItems,
  subtotal,

}: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Cart Items */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Items ({cartItems.length})</h3>
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                { item.product_images?.primary ? (
                  <img 
                    className="
                      w-full h-40 
                      md:h-32 md:w-32 lg:h-40 lg:w-40 
                      rounded-lg object-cover shadow-sm"
                    src={item?.product_images?.primary }  
                    alt={item?.product_name} 
                  />
                ) : (
                  <>
                    <img 
                      className="
                        py-2
                        opacity-80
                        bg-majorelle/60
                        w-full h-full
                        object-contain shadow-sm"
                      src="/assets/design/logo/Rugly_Barnacle_192x192.png" 
                      alt="Rugly Barnacle R & B Logo - Product image unavailable" 
                    />
                  </>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.product_name}
                </h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                ${(parseFloat(item.product_price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({cartItems.length} items):</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span className="text-bittersweet">Calculated in Stripe </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax:</span>
            <span className="text-bittersweet">Calculated in Stripe </span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};