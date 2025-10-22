// apiConfig.ts - FIXED VERSION
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_RENDER_BACKEND_URL;

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

export const ensureCSRFToken = async (): Promise<void> => {
    console.log("🔄 Initializing CSRF token via /csrf/ endpoint...");
    try {
        // Call your new Django CSRF endpoint
        await api.get('/csrf/');
        
        // Check if token is now available
        const token = getCookie('csrftoken');
        if (token) {
        console.log("== ✅ CSRF token successfully set ==", token);
        } else {
        console.warn("❌ CSRF token still not set after /csrf/ call");
        }
    } catch (error) {
        console.error("⚠️ CSRF initialization failed:", error);
    }
};
// Response interceptor first
api.interceptors.response.use(
    (response) => {
        console.log("✅ Response received, checking for CSRF cookie");
        // Check if we have a CSRF token after successful response
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
            console.log("🍪 CSRF token is now available in cookies");
        } 
        return response;
    },
    (error) => {
        if (error.response?.status === 403) {
            console.error('CSRF or session error - might need to refresh page', error.message);
        }
        return Promise.reject(error);
    }
);

// Request interceptor - SIMPLIFIED
api.interceptors.request.use((config) => {
    const methodsThatNeedCSRF = ['post', 'put', 'delete', 'patch'];
    
    if (methodsThatNeedCSRF.includes(config.method?.toLowerCase() ?? '')) {
        // Just get the current CSRF token - don't try to fetch it
        const csrfToken = getCookie('csrftoken');
        console.log(`🛡️ For ${config.method?.toUpperCase()} ${config.url}, CSRF token:`, csrfToken);
        
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
            console.log("✅ CSRF token added to headers");
        } else {
            console.warn("⚠️ No CSRF token available for mutation request!");
            // Don't try to fetch it here - that's the app's responsibility
        }
    }
    
    return config;
});

export default api;