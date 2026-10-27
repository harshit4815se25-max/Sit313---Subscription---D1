import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const API_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const saveSession = useCallback((token, currentUser) => {
    localStorage.setItem("d1_token", token);
    setUser(currentUser);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem("d1_token");
    setUser(null);
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const token = localStorage.getItem("d1_token");

      if (!token) {
        if (active) {
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (active) {
            clearSession();
          }
          return;
        }

        const data = await response.json();

        if (active) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Session restoration failed:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, [clearSession]);

  async function register({ name, email, password }) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    saveSession(data.token, data.user);

    return data;
  }

  async function login({ email, password }) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    saveSession(data.token, data.user);

    return data;
  }

  function logout() {
    clearSession();
    navigate("/");
  }

  async function upgradePlan() {
    const token = localStorage.getItem("d1_token");

    if (!token) {
      throw new Error("Please log in to upgrade your plan.");
    }

    const response = await fetch(
      `${API_URL}/api/subscription/upgrade`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to upgrade your plan.");
    }

    setUser(data.user);

    return data;
  }

  const value = {
    user,
    loading,
    isLoggedIn: Boolean(user),
    register,
    login,
    logout,
    upgradePlan,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}