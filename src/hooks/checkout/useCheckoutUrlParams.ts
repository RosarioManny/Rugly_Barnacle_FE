// hooks/checkout/useCheckoutUrlParams.ts

/**
 * Hook to safely extract URL parameters from the checkout success page
 * Handles edge cases where parameters might be missing from search
 */
export const useCheckoutUrlParams = () => {
  const getUrlParams = (search: string) => {
    const params = new URLSearchParams(search)
    const sessionId = params.get('session_id')
    const cartId = params.get('cart_id')
    
    console.log('🔍 URL Parameters found:', { sessionId, cartId })
    
    // If parameters are missing from search, try checking the full URL
    if (!sessionId || !cartId) {
      console.warn('⚠️ Parameters missing from search, checking full URL...')
      try {
        const fullUrl = window.location.href
        const urlParams = new URLSearchParams(fullUrl.split('?')[1])
        const fullSessionId = urlParams.get('session_id')
        const fullCartId = urlParams.get('cart_id')
        
        console.log('📋 Parameters from full URL:', { fullSessionId, fullCartId })
        
        return {
          sessionId: sessionId || fullSessionId,
          cartId: cartId || fullCartId
        }
      } catch (e) {
        console.error('Error parsing full URL:', e)
      }
    }
    
    return { sessionId, cartId }
  }

  return { getUrlParams }
}