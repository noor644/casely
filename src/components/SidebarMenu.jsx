import React, { useState, useEffect } from 'react'

export default function SidebarMenu({ onNavigate, currentPage, onCategorySelect }) {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleCategoryClick = (categoryName) => {
    onNavigate('home')
    onCategorySelect(categoryName)
    setIsOpen(false) // Close menu after selection on mobile
  }

  const handleNavClick = (page, clearCategory = false) => {
    onNavigate(page)
    if (clearCategory) {
      onCategorySelect('')
    }
    setIsOpen(false) // Close menu after selection on mobile
  }

  return (
    <>
      <button 
        className="sidebar__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
        <span>Menu</span>
      </button>

      {isOpen && (
        <div 
          className="sidebar__backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <h3 className="sidebar__title">Menu</h3>
          <button 
            className="sidebar__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <nav className="sidebar__nav">
          <button 
            className={`sidebar__link ${currentPage === 'home' ? 'sidebar__link--active' : ''}`}
            onClick={() => handleNavClick('home', true)}
          >
            Home
          </button>
          <button 
            className={`sidebar__link ${currentPage === 'favorites' ? 'sidebar__link--active' : ''}`}
            onClick={() => handleNavClick('favorites')}
          >
            Favorites
          </button>
          <button 
            className={`sidebar__link ${currentPage === 'cart' ? 'sidebar__link--active' : ''}`}
            onClick={() => handleNavClick('cart')}
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
            <li onClick={() => handleNavClick('contact')}>Contact Us</li>
          </ul>
        </div>
      </aside>
    </>
  )
}

