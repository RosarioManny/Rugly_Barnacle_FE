import { CheckoutSuccessUI } from '../components/checkoutSuccessUI'
import { useCheckoutSuccess } from '../../../hooks/checkout/useCheckoutSuccess'
export const CheckoutSuccessPage = () => {
  const { isLoading, cartCleared, error, sessionId, handleRetry } = useCheckoutSuccess()

  return (
    <main className="min-h-screen py-8" aria-label="Checkout Success Page">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center justify-center h-[80vh]">
        {/* Decorative Images */}
        <div className="flex pl-10 w-full justify-start">
          <img
            className="star-fade-animation mt-6 h-10 w-10"
            src="/assets/design/icons/Cross_Star_Teal-Blue.webp"
            aria-hidden="true"
            alt="Cross Star Design Marker"
          />
        </div>

        {/* Main Content */}
        <CheckoutSuccessUI
          isLoading={isLoading}
          cartCleared={cartCleared}
          error={error}
          sessionId={sessionId}
          onRetry={handleRetry}
        />

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