import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Sparkles, KeyRound } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const redirectPath = location.state?.from?.pathname || '/';
      navigate(redirectPath, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  const handleGuestLogin = () => {
    login();
    const redirectPath = location.state?.from?.pathname || '/';
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-glow pink-glow"></div>
        <div className="login-card-glow blue-glow"></div>
        
        <div className="login-icon-box">
          <KeyRound className="login-icon" size={32} />
        </div>

        <h1 className="login-title">Welcome to <span className="gradient-text">Roushan's Mart</span></h1>
        <p className="login-subtitle">Explore premium products and checkout using our instant guest account.</p>

        <div className="login-details-badge">
          <Sparkles size={16} className="badge-icon" />
          <span>No password required for demo access</span>
        </div>

        <button className="guest-login-btn" onClick={handleGuestLogin}>
          <UserCheck size={18} className="btn-icon" />
          <span>Login as Guest</span>
        </button>

        <div className="login-footer">
          <p>By logging in, you agree to our sandbox terms of service.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
