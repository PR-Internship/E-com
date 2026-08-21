import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Loader } from '../components/Loader';
import { formatPrice } from '../utils/format';
import '../styles/ProductDetail.css';
import { Star, ShoppingCart, ArrowLeft, Shield, Truck, RefreshCw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  
  const [quantity, setQuantity] = useState(1);

  const fetchProductDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) {
        throw new Error('Product not found or network failure.');
      }
      const data = await res.json();
      setProduct(data);
      if (data.images && data.images.length > 0) {
        setActiveImage(data.images[0]);
      } else {
        setActiveImage(data.thumbnail);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (loading) return <div className="detail-loading-wrapper"><Loader /></div>;
  
  if (error || !product) {
    return (
      <div className="error-panel detail-error">
        <h2>Failed to load product details</h2>
        <p>{error || 'Product information is unavailable.'}</p>
        <Link to="/shop" className="back-link-btn">
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    images,
    warrantyInformation,
    shippingInformation,
    availabilityStatus
  } = product;

  const discountedPrice = discountPercentage
    ? price * (1 - discountPercentage / 100)
    : price;

  const existingCartItem = cartItems.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (existingCartItem) {
      updateQuantity(product.id, existingCartItem.quantity + quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
    alert(`Added ${quantity} of "${title}" to your cart!`);
  };

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn-classic">
        <ArrowLeft size={16} />
        <span>Go Back</span>
      </button>

      <div className="detail-grid">
        
        <div className="gallery-section">
          <div className="main-image-container">
            <img src={activeImage} alt={title} className="main-detail-image" />
          </div>
          {images && images.length > 1 && (
            <div className="thumbnails-grid">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${title} preview ${index}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="details-info-section">
          <div className="detail-meta-tags">
            <span className="meta-tag category">{category}</span>
            {brand && <span className="meta-tag brand">{brand}</span>}
          </div>

          <h1 className="detail-title">{title}</h1>

          <div className="detail-rating-wrapper">
            <div className="rating-badge">
              <Star className="star-iconFilled" size={14} />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className="rating-count">Verified Buyer Rating</span>
          </div>

          <div className="detail-price-box">
            <div className="pricing-row">
              <span className="detail-current-price">{formatPrice(discountedPrice)}</span>
              {discountPercentage && (
                <>
                  <span className="detail-original-price">{formatPrice(price)}</span>
                  <span className="detail-discount-pill">Save {Math.round(discountPercentage)}%</span>
                </>
              )}
            </div>
            
            <div className="availability-status">
              <span className={`status-indicator ${stock > 5 ? 'in-stock' : 'low-stock'}`}>
                {availabilityStatus || (stock > 0 ? `In Stock (${stock} left)` : 'Out of Stock')}
              </span>
            </div>
          </div>

          <p className="detail-description">{description}</p>

          {stock > 0 ? (
            <div className="cart-action-group">
              <div className="quantity-selector-box">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <button className="detail-add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart className="btn-icon" size={18} />
                <span>Add to Cart - {formatPrice(discountedPrice * quantity)}</span>
              </button>
            </div>
          ) : (
            <button className="detail-add-to-cart-btn disabled" disabled>
              Temporarily Out of Stock
            </button>
          )}

          <div className="trust-badges-grid">
            <div className="trust-badge-item">
              <Truck size={18} className="trust-icon" />
              <div>
                <h4>Shipping Info</h4>
                <p>{shippingInformation || 'Standard 3-5 days delivery'}</p>
              </div>
            </div>
            <div className="trust-badge-item">
              <Shield size={18} className="trust-icon" />
              <div>
                <h4>Warranty Period</h4>
                <p>{warrantyInformation || '1 Year Brand Warranty'}</p>
              </div>
            </div>
            <div className="trust-badge-item">
              <RefreshCw size={18} className="trust-icon" />
              <div>
                <h4>Return Policy</h4>
                <p>30 Days easy exchange policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
