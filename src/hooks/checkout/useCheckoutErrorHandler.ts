// hooks/checkout/useCheckoutErrorHandler.ts

/**
 * Hook to map various error types to user-friendly messages
 */
export const useCheckoutErrorHandler = () => {
  const getErrorMessage = (err: any, quantitiesUpdatedFlag: boolean, cartClearedFlag: boolean) => {
    console.error("Error verifying payment:", err)

    // Track what went wrong for debugging
    const errorDetails = {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    }
    console.error('🔍 Error Details:', errorDetails)

    // Network/Connection issues
    if (!navigator.onLine) {
      return 'You appear to be offline. Please check your internet connection.'
    }
    
    if (err.message?.includes('network') || err.message?.includes('timeout') || err.code === 'ECONNABORTED') {
      return 'Network issue detected. Please check your connection and try again.'
    }
    
    // Session/Auth issues
    if (err.response?.status === 401 || err.response?.status === 403) {
      return 'Your session has expired. Please log in again.'
    }
    
    // Server issues
    if (err.response?.status === 500 || err.response?.status === 502 || err.response?.status === 503) {
      return 'Our server is experiencing issues. Please try again in a few minutes.'
    }
    
    // Payment already processed
    if (err.response?.data?.message?.includes('already processed') || err.message?.includes('already processed')) {
      return 'This payment has already been processed successfully. Please check your email for confirmation.'
    }
    
    // Stripe specific errors
    if (err.message?.includes('stripe') || err.response?.data?.stripe_error) {
      return 'There was an issue with the payment verification. Please contact support.'
    }
    
    // Partial success (payment worked, cart didn't clear)
    if (quantitiesUpdatedFlag && !cartClearedFlag) {
      return 'Payment processed successfully but we had trouble clearing your cart. Please contact support.'
    }
    
    return 'Unable to complete checkout processing.'
  }

  return { getErrorMessage }
}