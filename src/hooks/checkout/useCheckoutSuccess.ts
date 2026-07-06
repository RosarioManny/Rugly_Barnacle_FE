// hooks/checkout/useCheckoutSuccess.ts

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { clearCart } from '../../lib/api/Cart/cartServices'
import { checkoutSuccess } from '../../lib/api/Stripe/stripeservices'
import { useCheckoutUrlParams } from './useCheckoutUrlParams'
import { useCheckoutErrorHandler } from './useCheckoutErrorHandler'
import { logColors } from '../../lib/api/logFileStyles'

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

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
    log('info', `[useCheckoutSuccess] Retry triggered — attempt #${retryCount + 1}`)
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

    const handleSuccessfulCheckout = async () => {
      if (!isMounted || isProcessing) return
      setIsProcessing(true)

      // cartId is gone — only sessionId needed now
      const { sessionId } = getUrlParams(searchParams.toString())
      log('info', `[useCheckoutSuccess] Processing checkout — sessionId: ${sessionId}`)

      if (!sessionId) {
        if (isMounted) {
          setState(prev => ({
            ...prev,
            error: 'No payment session found',
            isLoading: false
          }))
        }
        setIsProcessing(false)
        return
      }

      let quantitiesUpdatedFlag = false
      let cartClearedFlag = false

      try {
        // Verify payment and deduct stock on backend
        await checkoutSuccess(sessionId)

        if (!isMounted) {
          setIsProcessing(false)
          return
        }

        quantitiesUpdatedFlag = true
        setState(prev => ({ ...prev, quantitiesUpdated: true }))
        log('success', `[useCheckoutSuccess] Stock quantities updated successfully`)

        // Clear localStorage cart — synchronous, no await needed
        clearCart()
        cartClearedFlag = true
        setState(prev => ({ ...prev, cartCleared: true }))
        log('success', `[useCheckoutSuccess] Cart cleared from localStorage`)

      } catch (err: any) {
        const errorMessage = getErrorMessage(err, quantitiesUpdatedFlag, cartClearedFlag)
        log('error', `[useCheckoutSuccess] Checkout processing failed — ${errorMessage}`)

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

          // If stock was deducted but cart didn't clear, try once more
          if (quantitiesUpdatedFlag && !cartClearedFlag && isMounted) {
            log('warn', `[useCheckoutSuccess] Stock updated but cart not cleared — retrying cart clear`)
            try {
              clearCart()
              if (isMounted) {
                setState(prev => ({ ...prev, cartCleared: true }))
                log('success', `[useCheckoutSuccess] Cart cleared on retry`)
              }
            } catch (e) {
              log('error', `[useCheckoutSuccess] Cart clear retry failed`)
            }
          }
        } else {
          setIsProcessing(false)
        }
      }
    }

    const timeoutId = setTimeout(() => {
      if (isMounted) handleSuccessfulCheckout()
    }, 100)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      log('info', `[useCheckoutSuccess] Cleanup — component unmounted`)
    }
  }, [searchParams, retryCount])

  return {
    ...state,
    retryCount,
    handleRetry,
    sessionId: searchParams.get('session_id')
  }
}