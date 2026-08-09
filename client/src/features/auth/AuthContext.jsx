import { createContext, useContext, useState, useEffect } from 'react';
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  refreshTokenRequest,
  getMeRequest,
} from '../../api/authApi.js';
import { setAccessToken as setAxiosAccessToken, setOnTokenRefreshFailed } from '../../api/axiosInstance.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  const updateAccessToken = (token) => {
    setAccessTokenState(token);
    setAxiosAccessToken(token);
  };

  // Apply the theme class to <html> whenever it changes
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  const login = async ({ email, password }) => {
    const result = await loginRequest({ email, password });
    setUser(result.data.user);
    updateAccessToken(result.data.accessToken);
    if (result.data.user.preferences?.theme) {
      setTheme(result.data.user.preferences.theme);
    }
  };

  const register = async ({ name, email, password }) => {
    await registerRequest({ name, email, password });
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

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const result = await refreshTokenRequest();
        updateAccessToken(result.data.accessToken);
        const meResult = await getMeRequest();
        setUser(meResult.data);
        if (meResult.data.preferences?.theme) {
          setTheme(meResult.data.preferences.theme);
        }
      } catch (error) {
        // No valid refresh token - user simply isn't logged in, that's fine
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

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
    theme,
    setTheme,
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