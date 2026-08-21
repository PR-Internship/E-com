import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { SkeletonGrid } from '../components/Loader';
import { AlertCircle, RotateCcw, ChevronLeft, ChevronRight, FolderClosed, Star, Sparkles, Tags, ChevronDown, FolderOpen } from 'lucide-react';
import '../styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      if (!res.ok) {
        throw new Error('Failed to fetch product catalog.');
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))].sort();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const recommendations = products.slice(20, 24);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      document.getElementById('shop-catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="shop-page-wrapper">
      
      <div className="shop-hero-banner">
        <div className="shop-banner-overlay">
          <h1>Shop</h1>
        </div>
      </div>

      <div className="shop-content-container">
        
        <div className="shop-toolbar-row">
          <div className="toolbar-left">
            <h2>Give All You Need</h2>
          </div>
          <div className="toolbar-right">
            <div className="toolbar-search-box">
              <input
                type="text"
                placeholder="Search in Stuffus..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button className="toolbar-search-btn">Search</button>
            </div>
          </div>
        </div>

        <div className="shop-catalog-grid" id="shop-catalog-anchor">
          
          <aside className="shop-sidebar-filters">
            <div className="filter-group">
              <h3>Category</h3>

              <div className="sidebar-tree">
                
                <div
                  className={`tree-root-item ${selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                >
                  <FolderClosed size={16} className="tree-icon" />
                  <span className="tree-label">All Product</span>
                  <span className="tree-badge">{products.length}</span>
                  <ChevronDown size={14} className="tree-chevron" />
                </div>

                <div className="tree-leaves-list">
                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat).length;
                    const isActive = selectedCategory === cat;
                    return (
                      <div
                        key={cat}
                        className={`tree-leaf-item ${isActive ? 'active' : ''}`}
                        onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                      >
                        <div className="tree-leaf-left">
                          {isActive ? <FolderOpen size={13} className="tree-icon" /> : <FolderClosed size={13} className="tree-icon" />}
                          <span className="tree-leaf-name">
                            {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
                          </span>
                        </div>
                        <span className="tree-leaf-count">({count})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="filter-group border-top-filter">
              <div
                className="sidebar-expanded-item"
                onClick={() => { setSelectedCategory('beauty'); setCurrentPage(1); }}
              >
                <Sparkles size={16} className="tree-icon" />
                <span>New Arrival (Beauty)</span>
                <ChevronDown size={14} className="tree-chevron-right" />
              </div>
              <div
                className="sidebar-expanded-item"
                onClick={() => { setSelectedCategory('laptops'); setCurrentPage(1); }}
              >
                <Star size={16} className="tree-icon" />
                <span>Best Seller (Laptops)</span>
                <ChevronDown size={14} className="tree-chevron-right" />
              </div>
              <div
                className="sidebar-expanded-item"
                onClick={() => { setSelectedCategory('furniture'); setCurrentPage(1); }}
              >
                <Tags size={16} className="tree-icon" />
                <span>On Discount (Furniture)</span>
                <ChevronDown size={14} className="tree-chevron-right" />
              </div>
            </div>
          </aside>

          <div className="shop-main-catalog">
            {loading ? (
              <SkeletonGrid count={6} />
            ) : error ? (
              <div className="error-panel">
                <AlertCircle className="error-icon" size={40} />
                <h2>Connection Failed</h2>
                <p className="error-message">{error}</p>
                <button className="retry-btn" onClick={fetchProducts}>
                  <RotateCcw size={14} />
                  <span>Retry Catalog</span>
                </button>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="empty-panel">
                <h2>No items match your search</h2>
                <p>Try clearing your query or switching filter categories.</p>
              </div>
            ) : (
              <>
                <div className="shop-product-grid">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="shop-pagination-row">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn arrow-btn"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>

                    <div className="pagination-pages-list">
                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`pagination-btn page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn arrow-btn"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {!loading && !error && (
        <div className="shop-recommendations-section">
          <div className="recommendations-header-row">
            <h2>Explore our recommendations</h2>
            <div className="carousel-nav-arrows">
              <button className="arrow-btn" aria-label="Previous recommendation"><ChevronLeft size={18} /></button>
              <button className="arrow-btn" aria-label="Next recommendation"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="recommendations-horizontal-scroll">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <div className="newsletter-cta-banner">
        <div className="newsletter-content-row">
          <div className="newsletter-left">
            <h2>Ready to Get Our New Stuff?</h2>
            <div className="newsletter-input-box">
              <input type="email" placeholder="Your Email" aria-label="Email Address" />
              <button className="newsletter-send-btn">Send</button>
            </div>
          </div>
          <div className="newsletter-right">
            <h3>Roushan's Mart for Homes and Needs</h3>
            <p>We listen to your needs, identify the best approach, and then create a bespoke shopping solution that's right for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
