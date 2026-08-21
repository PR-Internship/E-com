import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut, LogIn, Store } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Store className="logo-icon" />
          <span className="logo-text">Roushan's <span className="accent">Mart</span></span>
        </Link>

        <nav className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Home
          </NavLink>
          <NavLink 
            to="/shop" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Shop
          </NavLink>
          <NavLink 
            to="/checkout" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Checkout
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <Link to="/checkout" className="cart-btn" aria-label="View Cart">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="cart-badge pulse-badge">{cartCount}</span>
            )}
          </Link>

          {isLoggedIn ? (
            <button className="auth-btn logout" onClick={handleLogout}>
              <LogOut size={16} className="btn-icon" />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="auth-btn login">
              <LogIn size={16} className="btn-icon" />
              <span>Guest Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
