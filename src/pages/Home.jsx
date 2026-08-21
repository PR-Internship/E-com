import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, AlertCircle, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { SkeletonGrid } from '../components/Loader';
import '../styles/Home.css';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewArrivals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dummyjson.com/products?limit=4');
      if (!res.ok) {
        throw new Error('Failed to load new arrivals.');
      }
      const data = await res.json();
      setNewArrivals(data.products || []);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div className="home-container">
      
      <div className="masonry-gallery-container">
        
        <div className="gallery-column">
          <div className="gallery-item" style={{ height: '140px' }}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&q=80" alt="Creative team collaboration" />
          </div>
          <div className="gallery-item" style={{ height: '140px' }}>
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80" alt="Laptop developer desk setup" />
          </div>
        </div>

        <div className="gallery-column">
          <div className="gallery-item" style={{ height: '120px' }}>
            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&q=80" alt="UX wireframing" />
          </div>
          <div className="gallery-item" style={{ height: '160px' }}>
            <img src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=300&q=80" alt="Active workplace meeting" />
          </div>
        </div>

        <div className="gallery-column">
          <div className="gallery-item" style={{ height: '180px' }}>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80" alt="Corporate open office space" />
          </div>
          <div className="gallery-item" style={{ height: '100px' }}>
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&q=80" alt="Minimalist desk monitor" />
          </div>
        </div>

        <div className="gallery-column">
          <div className="gallery-item" style={{ height: '300px' }}>
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80" alt="Active brainstorm lab room" />
          </div>
        </div>

        <div className="gallery-column">
          <div className="gallery-item" style={{ height: '160px' }}>
            <img src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=300&q=80" alt="Developer at window desk" />
          </div>
          <div className="gallery-item" style={{ height: '120px' }}>
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&q=80" alt="Team meeting workshop" />
          </div>
        </div>

        <div className="gallery-column">
          <div className="gallery-item" style={{ height: '130px' }}>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80" alt="Modern commercial building facade" />
          </div>
          <div className="gallery-item" style={{ height: '150px' }}>
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=80" alt="Business creative leader portrait" />
          </div>
        </div>

        <div className="gallery-column">
          <div className="gallery-item" style={{ height: '140px' }}>
            <img src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=300&q=80" alt="Creative design workspace sketch" />
          </div>
          <div className="gallery-item" style={{ height: '140px' }}>
            <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=300&q=80" alt="Writing blog laptop" />
          </div>
        </div>
      </div>

      <div className="home-intro-banner-split">
        <div className="home-intro-left">
          <span className="home-tagline-pill">Welcome to Roushan's Mart</span>
          <h1 className="home-main-title">Curated Quality for Your Space</h1>
        </div>
        <div className="home-intro-right">
          <p className="home-intro-desc">
            Discover a premium selection of designer products, workspace enhancements, and tech accessories built for high-performance creatives.
          </p>
          <Link to="/shop" className="home-shop-cta">
            <ShoppingBag size={18} className="btn-icon" />
            <span>Explore Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="home-section-header">
        <span className="section-pill-badge">New Arrivals</span>
        <h2 className="section-heading-dark">Featured Collection</h2>
        <span className="section-subheading-muted">latest additions to our store</span>
      </div>

      <div className="home-products-wrapper" style={{ width: '100%', maxWidth: '1100px', margin: '10px auto 40px auto' }}>
        {loading ? (
          <SkeletonGrid count={4} />
        ) : error ? (
          <div className="error-panel" style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--error-bg)', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
            <AlertCircle className="error-icon" size={40} style={{ color: 'var(--error)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Failed to Load Items</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>{error}</p>
            <button className="retry-btn" onClick={fetchNewArrivals} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>
              <RotateCcw size={14} />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          <div className="shop-product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
