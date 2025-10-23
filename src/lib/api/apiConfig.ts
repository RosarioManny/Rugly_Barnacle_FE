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

// Simple session detection - uses sessionid or csrftoken as session indicator
const getSessionIdentifier = (): string | null => {
    return getCookie('sessionid') || getCookie('csrftoken');
};

const detectSessionChange = (): boolean => {
    const newSessionId = getSessionIdentifier();
    
    if (!currentSessionId && newSessionId) {
        // First time setting session
        currentSessionId = newSessionId;
        console.log('🆕 Session initialized:', currentSessionId?.substring(0, 10) + '...');
        return false;
    }
    
    if (currentSessionId !== newSessionId) {
        console.log('🔄 Session changed!');
        console.log('   Old:', currentSessionId?.substring(0, 10) + '...');
        console.log('   New:', newSessionId?.substring(0, 10) + '...');
        currentSessionId = newSessionId;
        return true;
    }
    
    return false;
};

// Request interceptor with session detection
api.interceptors.request.use((config) => {
    const methodsThatNeedCSRF = ['post', 'put', 'delete', 'patch'];
    
    // Detect session changes for debugging
    const sessionChanged = detectSessionChange();
    if (sessionChanged) {
        console.warn('⚠️ Session changed - CSRF token might be invalid');
    }
    
    if (methodsThatNeedCSRF.includes(config.method?.toLowerCase() ?? '')) {
        const csrfToken = getCookie('csrftoken');
        
        if (sessionChanged && !csrfToken) {
            console.error('🚨 Session changed but no CSRF token available!');
        }
        
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        } else {
            console.warn("⚠️ No CSRF token available for mutation request!");
        }
    }
    
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 403) {
            const sessionId = getSessionIdentifier();
            console.error('🔐 CSRF/Session Error Details:');
            console.error('   Current session:', sessionId?.substring(0, 10) + '...');
            console.error('   URL:', error.config?.url);
            console.error('   Method:', error.config?.method);
        }
        return Promise.reject(error);
    }
);

// Initialize session on import
const initialSession = getSessionIdentifier();
if (initialSession) {
    currentSessionId = initialSession;
    console.log('🎯 Initial session detected:', initialSession.substring(0, 10) + '...');
}

export default api;