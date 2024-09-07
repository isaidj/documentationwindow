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
  jwt: string | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const FIXED_TOKEN = "a5015e1f-c515-4cf9-b5ca-763dfb380773";
const TOKEN_COOKIE_NAME = "auth_token";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    console.log("login");
    if (!token) {
      return;
    }
    console.log("login with token", token);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const newJwt = data.signInByUserKey.token;

      setJwt(newJwt);
      Cookies.set(TOKEN_COOKIE_NAME, newJwt, {
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
      const storedJwt = Cookies.get(TOKEN_COOKIE_NAME);
      if (storedJwt) {
        setJwt(storedJwt);
      } else {
        await login();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "token") {
        setToken(event.data.token);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const isLoggedIn = useCallback(() => {
    return !!jwt;
  }, [jwt]);

  const value = {
    jwt,
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
