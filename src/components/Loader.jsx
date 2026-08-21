import React from 'react';
import '../styles/Loader.css';

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Loading premium products...</p>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image pulse"></div>
      <div className="skeleton-line title pulse"></div>
      <div className="skeleton-line price pulse"></div>
      <div className="skeleton-button pulse"></div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
