import { useState } from "react";
import "./LoginForm.css";

const API_URL = "http://localhost:3000";

function LoginForm({ onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMicrosoftAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      setError(err.message || "Failed to initiate Microsoft authentication");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Sign in to continue</p>

        {error && <div className="error-message">{error}</div>}

        <button
          className="microsoft-auth-button"
          onClick={handleMicrosoftAuth}
          disabled={loading}
        >
          {loading ? (
            <span className="button-content">
              <span className="spinner-small"></span>
              Authenticating...
            </span>
          ) : (
            <span className="button-content">
              <svg
                className="microsoft-icon"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" y="0" width="11" height="11" fill="#F25022" />
                <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
                <rect x="0" y="12" width="11" height="11" fill="#00A4EF" />
                <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
              </svg>
              Auth with Microsoft
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
