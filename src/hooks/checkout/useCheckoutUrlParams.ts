// hooks/checkout/useCheckoutUrlParams.ts

import { logColors } from '../../lib/api/logFileStyles';

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

export const useCheckoutUrlParams = () => {
  const getUrlParams = (search: string) => {
    const params = new URLSearchParams(search);
    let sessionId = params.get('session_id');

    log('info', `[useCheckoutUrlParams] Parsed URL params — sessionId: ${sessionId}`);

    // Fallback: check full URL if param missing from search string
    if (!sessionId) {
      log('warn', `[useCheckoutUrlParams] session_id missing from search, checking full URL`);
      try {
        const fullUrl = window.location.href;
        const urlParams = new URLSearchParams(fullUrl.split('?')[1]);
        sessionId = urlParams.get('session_id');
        log('info', `[useCheckoutUrlParams] Full URL fallback — sessionId: ${sessionId}`);
      } catch (e) {
        log('error', `[useCheckoutUrlParams] Failed to parse full URL`);
      }
    }

    if (!sessionId) {
      log('warn', `[useCheckoutUrlParams] No session_id found in URL`);
    }

    return { sessionId };
  };

  return { getUrlParams };
};