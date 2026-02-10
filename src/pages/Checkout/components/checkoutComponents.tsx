import { Spinner } from "../../../components/ui/loaders/loadingSpinner";
import { DangerIcon } from "../../../components/ui/icons-svgs/SvgIcons";

export const CheckoutLoadingState = (status: string, isProcessing:boolean) => {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Preparing checkout...</p>
        </div>
      </div>
    );
}

export const CheckoutErrorState = (status: string, cart: any, fetchCart: () => void) => {
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
  
export const CheckoutEmptyState = (cartItems: any[], navigate: (path: string) => void) => {
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

export const CheckoutStockErrorState = (stockErrors: any[], navigate: (path: string) => void) => {
  if (stockErrors.length > 0) return (
    <div className="mb-4 p-4 bg-bittersweet/10 border border-bittersweet rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <DangerIcon className="text-bittersweet size-5" />
        <p className="font-semibold text-bittersweet">Some items are out of stock</p>
      </div>
      <ul className="space-y-1">
        {stockErrors.map((err, idx) => (
          <li key={idx} className="text-sm text-space_cadet">
            <span className="font-medium">{err.product_name}</span> — You requested{' '}
            <span className="font-medium">{err.requested}</span> but only{' '}
            <span className="font-medium text-bittersweet">{err.available}</span> left in stock.
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/cart')}
        className="mt-3 text-sm text-majorelle underline hover:text-robin_egg"
      >
        Update your cart
      </button>
    </div>
  )
}

