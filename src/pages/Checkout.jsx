import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { ShoppingBag, Trash2, ArrowRight, CreditCard, ShieldCheck, CheckCircle2, ShoppingCart } from 'lucide-react';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderSuccess(true);
  };

  const handleFinishCheckout = () => {
    clearCart();
    setOrderSuccess(false);
    navigate('/shop');
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="checkout-empty-container">
        <div className="checkout-empty-card">
          <ShoppingCart size={64} className="empty-icon-glow" />
          <h2>Your Cart is Empty</h2>
          <p>It looks like you haven't added any products to your cart yet. Check out our catalog to get started!</p>
          <Link to="/shop" className="checkout-shop-now-btn">
            <ShoppingBag size={18} className="btn-icon" />
            <span>Go to Shop</span>
            <ArrowRight size={16} className="btn-icon-right" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {orderSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-check-wrapper">
              <CheckCircle2 size={64} className="success-check-icon" />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="success-modal-subtitle">Thank you for your purchase from Roushan's Mart.</p>
            
            <div className="receipt-box">
              <div className="receipt-row">
                <span>Order Reference:</span>
                <span className="receipt-value">{orderId}</span>
              </div>
              <div className="receipt-row">
                <span>Total Charged:</span>
                <span className="receipt-value">{formatPrice(cartTotal)}</span>
              </div>
              <div className="receipt-row">
                <span>Shipment Status:</span>
                <span className="receipt-value delivery">Preparing for dispatch</span>
              </div>
            </div>

            <p className="success-disclaimer">A confirmation email has been dispatched with tracking credentials.</p>
            
            <button className="modal-finish-btn" onClick={handleFinishCheckout}>
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      )}

      <div className="checkout-header">
        <h1 className="checkout-title">Complete Your <span className="gradient-text">Purchase</span></h1>
        <p className="checkout-subtitle">Secure checkout for guest sandbox transactions.</p>
      </div>

      <div className="checkout-grid">
        
        <form className="checkout-form-section" onSubmit={handlePlaceOrder}>
          <div className="form-group-block">
            <h3>1. Delivery Information</h3>
            <div className="input-row">
              <div className="form-input-wrapper">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="form-input-wrapper">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            
            <div className="form-input-wrapper full-width">
              <label htmlFor="address">Shipping Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="123 Luxury Ave, Apt 4B"
              />
            </div>

            <div className="input-row">
              <div className="form-input-wrapper">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="New York"
                />
              </div>
              <div className="form-input-wrapper">
                <label htmlFor="zip">ZIP / Postal Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="form-group-block">
            <h3>2. Payment Method</h3>
            <div className="payment-security-tag">
              <ShieldCheck size={16} className="tag-icon" />
              <span>Mock sandbox payment transaction</span>
            </div>

            <div className="form-input-wrapper full-width">
              <label htmlFor="cardNumber">Card Number</label>
              <div className="card-input-container">
                <CreditCard size={18} className="card-input-icon" />
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="4111 2222 3333 4444"
                  maxLength={19}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="form-input-wrapper">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div className="form-input-wrapper">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  placeholder="•••"
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            <span>Place Order - {formatPrice(cartTotal)}</span>
          </button>
        </form>

        <div className="checkout-summary-section">
          <h3>Order Summary</h3>
          
          <div className="checkout-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item-row">
                <img src={item.thumbnail} alt={item.title} className="checkout-item-img" />
                <div className="checkout-item-details">
                  <h4>{item.title}</h4>
                  <div className="checkout-item-qty-actions">
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="summary-qty-btn"
                    >
                      -
                    </button>
                    <span className="summary-qty-value">{item.quantity}</span>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="summary-qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="checkout-item-price-bin">
                  <span className="item-price-total">{formatPrice(item.price * item.quantity)}</span>
                  <button 
                    type="button" 
                    onClick={() => removeFromCart(item.id)} 
                    className="item-remove-btn"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-financials">
            <div className="financial-row">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="financial-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="financial-row border-top">
              <span className="total-label">Grand Total</span>
              <span className="total-amount">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
