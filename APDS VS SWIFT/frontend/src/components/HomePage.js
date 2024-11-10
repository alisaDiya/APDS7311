import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Welcome to Our Payment Platform</h1>
        <p>Secure, fast, and reliable payment processing for everyone</p>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">💸</div>
          <h3>Easy Payments</h3>
          <p>Process payments quickly and securely with our platform</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Bank-level security to protect your transactions</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Track Payments</h3>
          <p>Monitor all your transactions in real-time</p>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Join thousands of users who trust our platform</p>
        <div className="cta-buttons">
          <button className="cta-button primary">Sign Up Now</button>
          <button className="cta-button secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 