import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
});

// Kept in sync with AuthContext - lets the interceptor read/update
// the access token without needing to be inside a React component.
let accessToken = null;
let onTokenRefreshFailed = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const setOnTokenRefreshFailed = (callback) => {
  onTokenRefreshFailed = callback;
};

// Attach the current access token to every outgoing request
axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// On a 401, try refreshing the access token once, then retry the original request
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post(
            'http://localhost:8000/api/v1/auth/refresh-token',
            {},
            { withCredentials: true }
          );
          const newAccessToken = data.data.accessToken;
          setAccessToken(newAccessToken);
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } catch (refreshError) {
          isRefreshing = false;
          setAccessToken(null);
          if (onTokenRefreshFailed) onTokenRefreshFailed();
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;