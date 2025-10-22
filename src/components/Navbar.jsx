import React from 'react'

export default function Navbar({ currentPage, cartCount, onNavigate, onCategoryChange }) {
  const handleLogoClick = () => {
    onNavigate('home')
    onCategoryChange('')
  }

  return (
    <header className="nav">
      <div 
        className="nav__brand" 
        onClick={handleLogoClick} 
        onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}
        role="button" 
        tabIndex={0}
      >
        <span className="nav__title">Casely</span>
      </div>

      <div className="nav__search">
        <input 
          type="search" 
          placeholder="Search products..." 
          className="search-bar"
          aria-label="Search"
        />
      </div>

      <nav className="nav__actions">
        <button
          className={`icon-btn ${currentPage === 'home' ? 'icon-btn--active' : ''}`}
          onClick={() => onNavigate('home')}
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M12 3l9 8h-3v10h-5V15H11v6H6V11H3l9-8z"/>
          </svg>
        </button>
        <button
          className={`icon-btn ${currentPage === 'favorites' ? 'icon-btn--active' : ''}`}
          onClick={() => onNavigate('favorites')}
          aria-label="Favorites"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M12.1 8.64l-.1.1-.11-.1C10.14 6.92 7.1 7.35 5.78 9.28c-1.5 2.16-.31 4.9 1.64 6.85L12 20.71l4.58-4.58c1.95-1.95 3.14-4.69 1.64-6.85-1.32-1.93-4.36-2.36-6.12-.64z"/>
          </svg>
        </button>
        <button
          className={`icon-btn icon-btn--cart ${currentPage === 'cart' ? 'icon-btn--active' : ''}`}
          onClick={() => onNavigate('cart')}
          aria-label="Cart"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 2zM17 18c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zm0 2z"/>
            <path d="M7.17 14h9.66c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.33 5H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 8 18h12v-2H8l1.17-2z"/>
          </svg>
          {cartCount > 0 && <span className="icon-badge" aria-label={`${cartCount} items in cart`}>{cartCount}</span>}
        </button>
      </nav>
    </header>
  )
}
