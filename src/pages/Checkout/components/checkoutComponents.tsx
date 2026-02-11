import { Spinner } from "../../../components/ui/loaders/loadingSpinner";
import { DangerIcon } from "../../../components/ui/icons-svgs/SvgIcons";

// CheckoutLoadingState.tsx
interface CheckoutLoadingStateProps {
  message?: string;
}

export const CheckoutLoadingState = ({ 
  message = "Preparing checkout..." 
}: CheckoutLoadingStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

// CheckoutErrorState.tsx
interface CheckoutErrorStateProps {
  onRetry: () => void;
  errorMessage?: string;
  buttonText?: string;
}

export const CheckoutErrorState = ({ 
  onRetry, 
  errorMessage = "Error loading your cart",
  buttonText = "Retry"
}: CheckoutErrorStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4 max-w-md text-center">
        <DangerIcon className="text-bittersweet size-16" />
        <div className="error-message text-space_cadet font-bold">
          {errorMessage}
        </div>
        <button 
          onClick={onRetry}
          className="px-6 py-2 font-semibold bg-majorelle text-white rounded-lg hover:bg-robin_egg transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
  
// CheckoutEmptyState.tsx
interface CheckoutEmptyStateProps {
  onContinueShopping: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export const CheckoutEmptyState = ({ 
  onContinueShopping,
  title = "Your cart is empty",
  message = "Add some items to your cart before checking out.",
  buttonText = "Continue Shopping"
}: CheckoutEmptyStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button 
          onClick={onContinueShopping}
          className="px-6 py-2 font-semibold bg-majorelle text-white rounded-lg hover:bg-robin_egg transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// CheckoutStockErrorState.tsx
interface StockError {
  product_name: string;
  requested: number;
  available: number;
}

interface CheckoutStockErrorStateProps {
  stockErrors: StockError[];
  onUpdateCart: () => void;
  title?: string;
  updateButtonText?: string;
}

export const CheckoutStockErrorState = ({ 
  stockErrors, 
  onUpdateCart,
  title = "Some items are out of stock",
  updateButtonText = "Update your cart"
}: CheckoutStockErrorStateProps) => {
  if (stockErrors.length === 0) return null;

  return (
    <div className="mb-4 p-4 bg-bittersweet/10 border border-bittersweet rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <DangerIcon className="text-bittersweet size-5" />
        <p className="font-semibold text-bittersweet">{title}</p>
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
        onClick={onUpdateCart}
        className="mt-3 text-sm text-majorelle underline hover:text-robin_egg"
      >
        {updateButtonText}
      </button>
    </div>
  );
};

