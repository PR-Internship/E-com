import React from 'react';
import { Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="footer-container">
        
        <div className="footer-brand-col">
          <div className="footer-logo">
            <Store className="logo-icon" size={20} />
            <span>Roushan's Mart</span>
          </div>
          <p className="footer-tagline">
            Stuffus for Homes and Needs. We listen to your requirements, curate the best products, and deliver them to your doorstep.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>About</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop Catalog</Link></li>
            <li><a href="#blog">Our Blog</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#shipping">Shipping & Returns</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-social-col">
          <h4>Connect</h4>
          <div className="social-icons">
            
            <a href="https://twitter.com" aria-label="X" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Roushan's Mart Showcase. Built with React and Context API.</p>
      </div>
    </footer>
  );
};

export default Footer;
