import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || 'http://localhost:8000/';

const api = axios.create({
    baseURL: BACKEND_URL,
    // With Django sessions, you often need this for CSRF protection on POST/PUT/DELETE requests.
    // Axios can automatically set the X-CSRFToken header if you tell it where to find the cookie.
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    // Needed for sessions
    withCredentials: true,
});


export default api;