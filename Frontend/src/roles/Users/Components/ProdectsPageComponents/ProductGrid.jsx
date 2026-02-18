import React from 'react'
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onToggleFavorite }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
}