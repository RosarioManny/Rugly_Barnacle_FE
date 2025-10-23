import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_RENDER_BACKEND_URL;
let currentSession: string | null = null;

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

console.log("== Cookie ==",getCookie('cookie'))

const detectSessionChange = () => {
    const newSessionId = getSessionFromCookie();
}
// Response interceptor first
api.interceptors.response.use(
    (response) => {
        
        // Check if we have a CSRF token after successful response
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
            console.log("CSRF token is now available in cookies");
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
        console.log(`🛡️ For ${config.method?.toUpperCase()} ${config.url}, CSRF token:: `, csrfToken);
        
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