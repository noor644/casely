import React from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductList({ products, onAdd, selectedCategory, onCategoryChange }) {
  const categories = [
    {
      name: 'New Arrivals',
      image: 'images/new-arrivals.jpg',
      label: 'New Arrivals'
    },
    {
      name: 'Best Sellers',
      image: 'images/cases-best-sellers.jpg',
      label: 'Best Sellers'
    },
    {
      name: 'Silicone Cases',
      image: 'images/silicon-cases.jpg',
      label: 'Silicone Cases'
    },
    {
      name: 'Print Cases',
      image: 'images/cases-printed.jpg',
      label: 'Print Cases'
    }
  ]

  return (
    <section>
      {selectedCategory === '' ? (
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.name}
              className="category-btn category-btn--image"
              onClick={() => onCategoryChange(category.name)}
              title={category.label}
            >
              <img 
                src={category.image} 
                alt={category.label}
                className="category-btn__image"
              />
              <span className="category-btn__label">{category.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '24px' }}>
            <button 
              className="btn btn--ghost" 
              onClick={() => onCategoryChange('')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}
            >
              ← Back to Categories
            </button>
            <h2 className="category-page-title">{selectedCategory}</h2>
          </div>
          
          {products.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>No products in this category yet.</p>
          ) : (
            <div className="grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={() => onAdd(p)} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
