import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import AuthenticatedPage from "./components/AuthenticatedPage";
import "./App.css";

const API_URL = "http://localhost:3000";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in URL (in case API redirects back with token)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      // Remove token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      handleAuthSuccess(tokenFromUrl);
      return;
    }

    // Check if user is already authenticated on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <AuthenticatedPage />
      ) : (
        <LoginForm onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
