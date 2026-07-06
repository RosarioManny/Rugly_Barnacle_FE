// hooks/checkout/useCheckoutErrorHandler.ts

import { logColors } from '../../lib/api/logFileStyles';

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

export const useCheckoutErrorHandler = () => {
  const getErrorMessage = (err: any, quantitiesUpdatedFlag: boolean, cartClearedFlag: boolean) => {
    log('error', `[useCheckoutErrorHandler] Error verifying payment — status: ${err.response?.status}, message: ${err.message}`);

    if (!navigator.onLine) {
      return 'You appear to be offline. Please check your internet connection.';
    }

    if (err.message?.includes('network') || err.message?.includes('timeout') || err.code === 'ECONNABORTED') {
      return 'Network issue detected. Please check your connection and try again.';
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      return 'Your session has expired. Please try again.';
    }

    if (err.response?.status === 500 || err.response?.status === 502 || err.response?.status === 503) {
      return 'Our server is experiencing issues. Please try again in a few minutes.';
    }

    if (
      err.response?.data?.message?.includes('already processed') ||
      err.message?.includes('already processed')
    ) {
      return 'This payment has already been processed successfully. Please check your email for confirmation.';
    }

    if (err.message?.includes('stripe') || err.response?.data?.stripe_error) {
      return 'There was an issue with the payment verification. Please contact support.';
    }

    if (quantitiesUpdatedFlag && !cartClearedFlag) {
      return 'Payment processed successfully but we had trouble clearing your cart. Please clear it manually.';
    }

    return 'Unable to complete checkout processing.';
  };

  return { getErrorMessage };
};