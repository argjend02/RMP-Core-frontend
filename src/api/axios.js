import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:44364",
});

// Request interceptor (optional - for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // Skip adding token for login and registration endpoints
    const skipAuthEndpoints = [
      "/api/Login",
      "/api/Account/register",
      "/api/auth/login",
    ];
    const shouldSkipAuth = skipAuthEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    // You can add auth token here if needed
    const token = localStorage.getItem("token");
    if (token && !shouldSkipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Debug logging for login requests
    if (config.url.includes("/api/Login")) {
      console.log("Login Request Config:", {
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for handling errors globally)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Debug logging for login errors
    if (
      error.config &&
      error.config.url &&
      error.config.url.includes("/api/Login")
    ) {
      console.error("Login Response Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
