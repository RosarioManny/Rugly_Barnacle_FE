import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SuccessCheckmark } from '../../../components/ui/icons-svgs/SvgIcons'
import { Spinner } from '../../../components/ui/loaders/loadingSpinner'
// import { getCheckoutSession } from '../../../lib/api/Stripe/stripeservices'
import { clearCart } from '../../../lib/api/Cart/cartServices'
import { checkoutSuccess } from '../../../lib/api/Stripe/stripeservices'

export const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true) // Changed to true
  const [cartCleared, setCartCleared] = useState(false)
  const [quantitiesUpdated, setQuantitiesUpdated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true;

    const handleSuccessfulCheckout = async () => {
      if(!isMounted) return;
      const sessionId = searchParams.get('session_id')
      const cartId = searchParams.get('cart_id')

      console.log(`Checkout Success Page Loaded with session_id: ${sessionId} and cart_id: ${cartId}`)
      // Check if session id is present
      if (!sessionId) {
        console.log("No session ID found in URL")
        setError("No payment session found")
        setIsLoading(false)
        return
      }

      // Check if Cart id is present
      if (!cartId) {
        console.log("No cart ID found in URL")
        setError("No cart information found")
        setIsLoading(false)
        return 
      }

      try {
        await checkoutSuccess(sessionId, cartId)
        setQuantitiesUpdated(true)
        console.log("Product quantities updated successfully")

        await clearCart();
        setCartCleared(true)
        console.log("Cart cleared successfully after checkout")

      } catch (err: any) {
        console.error("Error verifying payment:", err)

        if (quantitiesUpdated && !cartCleared) {
          setError("Payment processed but failed to clear cart. Please contact support.")
        } else {
          setError(err.message || 'Unable to complete checkout processing')
        }
      } finally {
        setIsLoading(false)
      }
    }
    handleSuccessfulCheckout()

    return () => {
      isMounted = false;
    }
  }, [searchParams])

  return (
    <main className="min-h-screen py-8" aria-label="Checkout Success Page">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center justify-center h-[80vh]">
        <div className="flex pl-10 w-full justify-start">
          <img 
            className="star-fade-animation mt-6 h-10 w-10" 
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" 
          />
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          {/* Loading State */}
          {isLoading && (
            <div className="mb-6">
              <Spinner loading={false}/>
              <p className="text-space_cadet/80">Verifying your payment...</p>
            </div>
          )}
          
          {/* Payment Error State */}
          {error && !isLoading && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600 font-medium">Payment Verification Issue</p>
              <p className="text-red-500 text-sm mt-1">
                {error}. Please contact support with your session ID.
              </p>
            </div>
          )}
          {/* Success Content (shown when not loading) */}
          {!isLoading && !error && (
            <>
              <div className="mb-4">
                <SuccessCheckmark className="text-midnight_green/80 size-16 mx-auto mb-4" />
                
                {/* Cart Cleared Confirmation */}
                {cartCleared && !error ? (
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
                      {error ? error : 'There was an issue clearing your cart.'}
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
                  <button className='
                    w-full px-6 py-3 font-semibold 
                    bg-majorelle text-white rounded-lg 
                    hover:bg-robin_egg hover:scale-105 transition-all
                  '>
                    Continue Shopping
                  </button>
                </Link>
                
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
        
        <div className="flex pr-8 w-full justify-end">
          <img 
            className="star-fade-animation flex align-start h-10 w-10" 
            src="/assets/design/icons/Cross_Star_Pink.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" 
          />
        </div>
      </div>
    </main>
  )
}