import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_RENDER_BACKEND_URL;
let currentSessionId: string | null = null;

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

export const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

// Simple session detection - uses sessionid
const getSessionId = (): string | null => {
    return getCookie('sessionid');
};

const ensureCSRFToken = async (): Promise<void> => {
    try {
        await api.get('csrf/');
        console.log("✅ CSRF Token ensured");
    } catch (err) {
        console.error("X >> Failed to ensure CSRF Token << X", err);
    }
};

export const handleSessionChange = async (): Promise<boolean> => {
    const newSessionId = getSessionId();

    if (!currentSessionId && newSessionId) {
        // First time setting session
        currentSessionId = newSessionId;
        console.log('🆕 Session initialized:', currentSessionId?.substring(0, 10) + '...');
        return false;
    }

    if (currentSessionId !== newSessionId) {
        console.log('🔄 Session changed!');
        console.log('Old:', currentSessionId?.substring(0, 10) + '...');
        console.log('New:', newSessionId?.substring(0, 10) + '...');

        currentSessionId = newSessionId;

        await ensureCSRFToken();
        return true;
    }

    return false;
};

// Request interceptor with session detection
const methodsThatNeedCSRF = ['post', 'put', 'delete', 'patch'];

api.interceptors.request.use(async (config) => {

    // Only check session change on state-changing methods
    if (methodsThatNeedCSRF.includes(config.method?.toLowerCase() ?? '')) {
        await handleSessionChange();

        const csrfToken = getCookie('csrftoken');

        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        } else {
            console.warn("⚠️ No CSRF Token available - Ensuring token...");
            await ensureCSRFToken();
            const newCSRFToken = getCookie('csrftoken');
            if (newCSRFToken) {
                config.headers['X-CSRFToken'] = newCSRFToken;
            }
        }
    }

    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 403 && error.config) {
            console.error('❌ CSRF Error - attempting to refresh token and retry');

            await ensureCSRFToken();

            const csrfToken = getCookie('csrftoken');
            if (csrfToken) {
                error.config.headers['X-CSRFToken'] = csrfToken;
                console.log('🔁 Retrying request with new CSRF token');
                return api.request(error.config);
            }
        }
        return Promise.reject(error);
    }
);

// Initialize CSRF + session on app load
export const initializeAPI = async (): Promise<void> => {
    await ensureCSRFToken();

    const initialSession = getSessionId();
    if (initialSession) {
        currentSessionId = initialSession;
        console.log('🎯 Initial session detected:', initialSession.substring(0, 10) + '...');
    }
};

export default api;