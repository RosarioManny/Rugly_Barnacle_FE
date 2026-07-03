// hooks/checkout/useCheckoutSuccess.ts

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { clearCart } from '../../lib/api/Cart/cartServices'
import { checkoutSuccess } from '../../lib/api/Stripe/stripeservices'
import { useCheckoutUrlParams } from './useCheckoutUrlParams'
import { useCheckoutErrorHandler } from './useCheckoutErrorHandler'

interface CheckoutState {
  isLoading: boolean
  cartCleared: boolean
  quantitiesUpdated: boolean
  error: string | null
}

export const useCheckoutSuccess = () => {
  const [searchParams] = useSearchParams()
  const { getUrlParams } = useCheckoutUrlParams()
  const { getErrorMessage } = useCheckoutErrorHandler()
  
  const [state, setState] = useState<CheckoutState>({
    isLoading: true,
    cartCleared: false,
    quantitiesUpdated: false,
    error: null
  })
  
  const [retryCount, setRetryCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    setState({
      isLoading: true,
      cartCleared: false,
      quantitiesUpdated: false,
      error: null
    })
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    const handleSuccessfulCheckout = async () => {
      if (!isMounted || isProcessing) return
      setIsProcessing(true)

      const { sessionId, cartId } = getUrlParams(searchParams.toString())

      console.log(`Checkout Success Page Loaded with session_id: ${sessionId} and cart_id: ${cartId}`)

      // Validate parameters
      if (!sessionId || !cartId) {
        if (isMounted) {
          setState(prev => ({
            ...prev,
            error: !sessionId ? "No payment session found" : "No cart information found",
            isLoading: false
          }))
        }
        setIsProcessing(false)
        return
      }

      let quantitiesUpdatedFlag = false
      let cartClearedFlag = false

      try {
        // Process checkout
        await checkoutSuccess(sessionId, cartId)
        
        if (!isMounted) {
          console.log("Component unmounted during checkoutSuccess, stopping...")
          setIsProcessing(false)
          return
        }
        
        quantitiesUpdatedFlag = true
        setState(prev => ({ ...prev, quantitiesUpdated: true }))
        console.log("Product quantities updated successfully")

        // Clear cart
        await clearCart()
        
        if (!isMounted) {
          console.log("Component unmounted during clearCart, stopping...")
          setIsProcessing(false)
          return
        }
        
        cartClearedFlag = true
        setState(prev => ({ ...prev, cartCleared: true }))
        console.log("Cart cleared successfully after checkout")

      } catch (err: any) {
        const errorMessage = getErrorMessage(err, quantitiesUpdatedFlag, cartClearedFlag)
        
        if (isMounted) {
          setState(prev => ({
            ...prev,
            error: errorMessage,
            isLoading: false
          }))
        }
      } finally {
        if (isMounted) {
          setState(prev => ({ ...prev, isLoading: false }))
          setIsProcessing(false)
          
          // Background retry for cart clearing
          if (quantitiesUpdatedFlag && !cartClearedFlag && isMounted) {
            console.log('🔄 Attempting to clear cart in background...')
            setTimeout(async () => {
              try {
                if (isMounted) {
                  await clearCart()
                  if (isMounted) {
                    setState(prev => ({ ...prev, cartCleared: true }))
                    console.log('✅ Cart cleared successfully in background')
                  }
                }
              } catch (e) {
                console.warn('⚠️ Background cart clear failed:', e)
              }
            }, 3000)
          }
        } else {
          console.log("Skipping state updates - component unmounted")
          setIsProcessing(false)
        }
      }
    }

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        handleSuccessfulCheckout()
      }
    }, 100)

    return () => {
      isMounted = false
      abortController.abort()
      clearTimeout(timeoutId)
      console.log("CheckoutSuccessPage unmounted - cleaning up")
    }
  }, [searchParams, retryCount])

  return {
    ...state,
    retryCount,
    handleRetry,
    sessionId: searchParams.get('session_id')
  }
}