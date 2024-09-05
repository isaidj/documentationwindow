import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FIXED_TOKEN = "a5015e1f-c515-4cf9-b5ca-763dfb380773";
const TOKEN_COOKIE_NAME = "auth_token";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: FIXED_TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const newToken = data.signInByUserKey.token;

      setToken(newToken);
      Cookies.set(TOKEN_COOKIE_NAME, newToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setError(null);
    } catch (err) {
      setError("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get(TOKEN_COOKIE_NAME);
      if (storedToken) {
        setToken(storedToken);
      } else {
        await login();
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const isLoggedIn = useCallback(() => {
    return !!token;
  }, [token]);

  const value = {
    token,
    loading,
    error,
    login,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
