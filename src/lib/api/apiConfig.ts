import axios from "axios";
import { logColors } from "./logFileStyles";

const BACKEND_URL = import.meta.env.VITE_RENDER_BACKEND_URL;

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
    const style = logColors.find(c => c.logType === type);
    const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
    if (type === 'error') console.error(`%c ${message}`, css);
    else if (type === 'warn') console.warn(`%c ${message}`, css);
    else console.info(`%c ${message}`, css);
};

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

const getCookie = (name: string): string | null => {
    if (!document.cookie) return null;
    const match = document.cookie
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
};

const ensureCSRFToken = async (): Promise<void> => {
    try {
        await api.get('csrf/');
        log('success', `[apiConfig] CSRF token ensured`);
    } catch (err) {
        log('error', `[apiConfig] Failed to ensure CSRF token`);
    }
};

// ── Request interceptor ───────────────────────────────────────────────────────
const methodsThatNeedCSRF = ['post', 'put', 'delete', 'patch'];

api.interceptors.request.use(async (config) => {
    if (methodsThatNeedCSRF.includes(config.method?.toLowerCase() ?? '')) {
        let csrfToken = getCookie('csrftoken');

        if (!csrfToken) {
        log('warn', `[apiConfig] No CSRF token found — fetching one`);
        await ensureCSRFToken();
        csrfToken = getCookie('csrftoken');
        }

        if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
        log('info', `[apiConfig] CSRF attached — ${config.method?.toUpperCase()} ${config.url}`);
        } else {
        log('error', `[apiConfig] Could not obtain CSRF token for ${config.method?.toUpperCase()} ${config.url}`);
        }
    }

    return config;
});

// ── Response interceptor ──────────────────────────────────────────────────────
api.interceptors.response.use(
    (response) => {
        log('success', `[apiConfig] ${response.config.method?.toUpperCase()} ${response.config.url} — ${response.status}`);
        return response;
    },
    async (error) => {
        const status = error.response?.status;
        const url = error.config?.url;
        const method = error.config?.method?.toUpperCase();
        const isMultipart = error.config?.headers?.['Content-Type']?.includes('multipart/form-data');

    log('error', `[apiConfig] ${method} ${url} failed — ${status}`);

    // Retry non-multipart 403s with a fresh CSRF token once
    if (status === 403 && !isMultipart && error.config && !error.config._csrfRetried) {
        log('warn', `[apiConfig] 403 on ${url} — refreshing CSRF and retrying`);
        error.config._csrfRetried = true;
        await ensureCSRFToken();
        const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        error.config.headers['X-CSRFToken'] = csrfToken;
        return api.request(error.config);
    }
    }

    if (status === 403 && isMultipart) {
        log('warn', `[apiConfig] 403 on multipart request — cannot retry safely`);
    }

    return Promise.reject(error);
}
);

// ── Initialize on app load ────────────────────────────────────────────────────
export const initializeAPI = async (): Promise<void> => {
    log('info', `[apiConfig] Initializing API`);
    await ensureCSRFToken();
    log('success', `[apiConfig] API ready`);
};

export default api;