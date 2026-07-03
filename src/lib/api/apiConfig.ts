import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_RENDER_BACKEND_URL;
let currentSessionId: string | null = null;

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

export const getCookie = (name: string) => {
    console.log(`🔍 Looking for cookie: ${name}`);
    console.log(`📝 All cookies: ${document.cookie}`);
    
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Case-insensitive match
            const cookieName = cookie.split('=')[0];
            if (cookieName === name || cookieName.toLowerCase() === name.toLowerCase()) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(`🎯 Found cookie ${name}:`, cookieValue);
    return cookieValue;
};

// Simple session detection - uses csrf token as proxy for session
const getSessionId = (): string | null => {
    const csrfToken = getCookie('csrftoken');
    return csrfToken ? 'authenticated' : null;
};

export const ensureCSRFToken = async (): Promise<void> => {
    try {
        await api.get('csrf/');
        console.log("✅ CSRF Token ensured");
    } catch (err) {
        console.error("X >> Failed to ensure CSRF Token << X", err);
    }
};

export const handleSessionChange = async (): Promise<boolean> => {
    const hasCsrfToken = !!getCookie('csrftoken');
    const wasLoggedIn = !!currentSessionId;
    const isLoggedIn = hasCsrfToken;
    
    console.log('🔍 Auth check:', { wasLoggedIn, isLoggedIn, hasCsrfToken });
    
    if (!wasLoggedIn && isLoggedIn) {
        currentSessionId = 'authenticated';
        console.log('🆕 User authenticated - CSRF token detected');
        await ensureCSRFToken();
        return true;
    }
    
    if (wasLoggedIn && !isLoggedIn) {
        currentSessionId = null;
        console.log('👋 User logged out - CSRF token gone');
        return false;
    }
    
    console.log('✅ Auth state unchanged');
    return false;
};

// Request interceptor - ONLY ONE!
const methodsThatNeedCSRF = ['post', 'put', 'delete', 'patch'];

api.interceptors.request.use(async (config) => {
    if (methodsThatNeedCSRF.includes(config.method?.toLowerCase() ?? '')) {
        await handleSessionChange();

        let csrfToken = getCookie('csrftoken');

        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
            console.log(`🔑 CSRF attached to ${config.method} ${config.url}`);
        } else {
            console.warn("⚠️ No CSRF Token available - Ensuring token...");
            await ensureCSRFToken();
            const newCSRFToken = getCookie('csrftoken');
            if (newCSRFToken) {
                config.headers['X-CSRFToken'] = newCSRFToken;
                console.log(`✅ CSRF attached after ensuring`);
            } else {
                console.error(`❌ Still no CSRF token for ${config.method} ${config.url}`);
                try {
                    await api.get('csrf/');
                    const finalToken = getCookie('csrftoken');
                    if (finalToken) {
                        config.headers['X-CSRFToken'] = finalToken;
                        console.log(`🔄 CSRF attached on retry`);
                    }
                } catch (e) {
                    console.error('💥 Failed to get CSRF token:', e);
                }
            }
        }

        console.log(`📤 Final request to ${config.url}:`, {
            method: config.method,
            hasCSRF: !!config.headers['X-CSRFToken'],
            headers: config.headers
        });
    }

    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        return response;
    },
    async (error) => {
        console.error('❌ Response Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });

        const isCSRF = error.response?.status === 403;
        const isMultipart = error.config?.headers?.['Content-Type']?.includes('multipart/form-data');
        
        if (isCSRF && !isMultipart) {
            console.warn('🔄 CSRF Error - attempting to refresh token and retry');
            currentSessionId = null;
            await ensureCSRFToken();

            const csrfToken = getCookie('csrftoken');
            if (csrfToken) {
                currentSessionId = 'authenticated';
                error.config.headers['X-CSRFToken'] = csrfToken;
                console.log('🔄 Retrying request with new CSRF token');
                return api.request(error.config);
            } else {
                console.error('❌ Still no CSRF token after refresh');
            }
        }

        if (isCSRF && isMultipart) {
            console.error('❌ CSRF Error on multipart request - cannot retry safely');
        }

        return Promise.reject(error);
    }
);

export const initializeAPI = async (): Promise<void> => {
    console.log('🚀 Initializing API...');
    await ensureCSRFToken();
    
    const hasCsrfToken = !!getCookie('csrftoken');
    if (hasCsrfToken) {
        currentSessionId = 'authenticated';
        console.log('🎯 User already authenticated (CSRF token found)');
    } else {
        currentSessionId = null;
        console.log('👤 User not authenticated (no CSRF token)');
    }
    
    console.log('✅ API initialized');
};

export default api;