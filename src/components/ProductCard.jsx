import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { Star } from 'lucide-react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id, title, price, discountPercentage, rating, thumbnail, category } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  const discountedPrice = discountPercentage
    ? price * (1 - discountPercentage / 100)
    : price;

  const reviewCount = (id * 17) % 150 + 12;

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={thumbnail} alt={title} className="product-image" loading="lazy" />
        <span className="product-card-category-tag">{category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>

        <div className="product-rating-price">
          <div className="product-rating">
            <Star className="star-iconFilled" size={14} />
            <span>{rating.toFixed(1)} <span className="review-count">({reviewCount} Reviews)</span></span>
          </div>
          <span className="price">{formatPrice(discountedPrice)}</span>
        </div>

        <div className="product-card-actions-row">
          <button className="card-action-btn-secondary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="card-action-btn-primary" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
