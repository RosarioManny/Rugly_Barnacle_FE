// components/checkout/CheckoutSuccessUI.tsx

import { Link } from 'react-router-dom'
import { SuccessCheckmark } from '../../../components/ui/icons-svgs/SvgIcons'
import { Spinner } from '../../../components/ui/loaders/loadingSpinner'

interface CheckoutSuccessUIProps {
  isLoading: boolean
  cartCleared: boolean
  error: string | null
  sessionId: string | null
  onRetry: () => void
}

export const CheckoutSuccessUI = ({ 
  isLoading, 
  cartCleared, 
  error, 
  sessionId, 
  onRetry 
}: CheckoutSuccessUIProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
      {/* Loading State */}
      {isLoading && (
        <div className="mb-6">
          <Spinner loading={false} />
          <p className="text-space_cadet/80">Verifying your payment...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="mb-6 p-4 bg-bittersweet/20 rounded-lg border border-bittersweet/50">
          <p className="text-bittersweet font-medium">Payment Verification Issue</p>
          <p className="text-bittersweet/80 text-sm mt-1">
            {error}. Please contact support with your session ID.
          </p>
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-bittersweet/60 text-white rounded-lg hover:bg-bittersweet duration-300 transition-colors"
          >
            Try Again
          </button>
          <div className="mt-3 text-sm text-gray-500">
            <p className="mb-1">Still having issues?</p>
            <Link
              to="/contact"
              className="text-majorelle hover:underline"
              state={{ error, sessionId }}
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !error && (
        <>
          <div className="mb-4">
            <SuccessCheckmark className="text-midnight_green/80 size-16 mx-auto mb-4" />

            {/* Cart Status */}
            {cartCleared ? (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-600 text-sm flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Your cart has been cleared
                </p>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-bittersweet/10 rounded-lg border border-bittersweet">
                <p className="text-bittersweet font-semibold">Note:</p>
                <p className="text-bittersweet font-medium text-sm mt-1">
                  There was an issue clearing your cart.
                </p>
                <p className="text-bittersweet text-sm mt-2">
                  Your payment was successful, but you may need to manually clear your cart.
                </p>
              </div>
            )}
          </div>

          <h2 className="font-bold text-space_cadet/90 text-2xl mb-4">
            Thank you for your purchase!
          </h2>

          <p className="text-space_cadet/60 mb-6">
            {cartCleared
              ? "Your order has been successfully processed and your cart is now empty."
              : "Your order has been successfully processed."}
          </p>

          <div className="space-y-4">
            <Link to="/shop">
              <button className="w-full px-6 py-3 font-semibold bg-majorelle text-white rounded-lg hover:bg-robin_egg hover:scale-105 transition-all">
                Continue Shopping
              </button>
            </Link>

            {/* Session ID for support */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-space_cadet/40 text-xs">
                Order Reference: {sessionId?.substring(0, 12)}...
              </p>
              <button
                className="text-space_cadet/30 text-xs hover:text-space_cadet/50 transition-colors"
                onClick={() => {
                  if (sessionId) {
                    navigator.clipboard?.writeText(sessionId)
                    alert('Session ID copied to clipboard for support')
                  }
                }}
              >
                Click to copy session ID for support
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-space_cadet/50 text-sm">
              {cartCleared
                ? "A receipt email has been sent to you by Stripe. Please check your inbox for order details."
                : "A receipt email has been sent to you by Stripe. Your cart items may still be saved for your next visit."}
            </p>
          </div>
        </>
      )}
    </div>
  )
}