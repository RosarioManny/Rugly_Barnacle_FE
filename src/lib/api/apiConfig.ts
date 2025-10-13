import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_RENDER_BACKEND_URL;

const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) { // Fixed this line
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const api = axios.create({
    baseURL: BACKEND_URL,
    // Needed for sessions
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() ?? '')) {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
        config.headers.set('X-CSRFToken', csrfToken)
        }
    }
    return config;
});
export default api;