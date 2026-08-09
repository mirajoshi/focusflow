import { createContext, useContext, useState, useEffect } from 'react';
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  refreshTokenRequest,
} from '../../api/authApi.js';
import { setAccessToken as setAxiosAccessToken, setOnTokenRefreshFailed } from '../../api/axiosInstance.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Keep the axios module-level token in sync whenever it changes here
  const updateAccessToken = (token) => {
    setAccessTokenState(token);
    setAxiosAccessToken(token);
  };

  const login = async ({ email, password }) => {
    const result = await loginRequest({ email, password });
    setUser(result.data.user);
    updateAccessToken(result.data.accessToken);
  };

  const register = async ({ name, email, password }) => {
    await registerRequest({ name, email, password });
    // Registration does not log the user in automatically (matches backend design)
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      // Even if the API call fails, still clear local state below
    }
    setUser(null);
    updateAccessToken(null);
  };

  // On app load, try to silently restore a session using the refresh token cookie
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const result = await refreshTokenRequest();
        updateAccessToken(result.data.accessToken);
        // Note: we don't have user details from refresh alone yet -
        // we'll fetch them via /auth/me next
      } catch (error) {
        // No valid refresh token - user simply isn't logged in, that's fine
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // If a silent refresh ever fails later (e.g., refresh token expired while using the app),
  // log the user out cleanly
  useEffect(() => {
    setOnTokenRefreshFailed(() => {
      setUser(null);
      updateAccessToken(null);
    });
  }, []);

  const value = {
    user,
    accessToken,
    isAuthenticated: !!accessToken,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}