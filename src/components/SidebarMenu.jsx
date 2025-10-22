import React from 'react'

export default function SidebarMenu({ onNavigate, currentPage, onCategorySelect }) {
  const handleCategoryClick = (categoryName) => {
    onNavigate('home')
    onCategorySelect(categoryName)
  }

  return (
    <aside className="sidebar">
      <h3 className="sidebar__title">Menu</h3>
      <nav className="sidebar__nav">
        <button 
          className={`sidebar__link ${currentPage === 'home' ? 'sidebar__link--active' : ''}`}
          onClick={() => {
            onNavigate('home')
            onCategorySelect('')
          }}
        >
          Home
        </button>
        <button 
          className={`sidebar__link ${currentPage === 'favorites' ? 'sidebar__link--active' : ''}`}
          onClick={() => onNavigate('favorites')}
        >
          Favorites
        </button>
        <button 
          className={`sidebar__link ${currentPage === 'cart' ? 'sidebar__link--active' : ''}`}
          onClick={() => onNavigate('cart')}
        >
          Cart
        </button>
      </nav>
      
      <div className="sidebar__section">
        <h4 className="sidebar__subtitle">Categories</h4>
        <ul className="sidebar__list">
          <li onClick={() => handleCategoryClick('New Arrivals')}>New Arrivals</li>
          <li onClick={() => handleCategoryClick('Best Sellers')}>Best Sellers</li>
          <li onClick={() => handleCategoryClick('Silicone Cases')}>Silicone Cases</li>
          <li onClick={() => handleCategoryClick('Print Cases')}>Print Cases</li>
        </ul>
      </div>
      
      <div className="sidebar__section">
        <h4 className="sidebar__subtitle">Support</h4>
        <ul className="sidebar__list">
          <li onClick={() => onNavigate('contact')}>Contact Us</li>
        </ul>
      </div>
    </aside>
  )
}

