import React, { useEffect, useMemo, useState } from 'react'
import products from './data/products.js'
import Navbar from './components/Navbar.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'
import Favorites from './components/Favorites.jsx'
import SidebarMenu from './components/SidebarMenu.jsx'
import ContactUs from './components/ContactUs.jsx'

export default function App() {
  // Simple client-side routing between 'home' and 'cart'
  const [page, setPage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return []
    return products.filter(product => product.category === selectedCategory)
  }, [selectedCategory])

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function updateQty(id, qty) {
    setCart((prev) => {
      const nextQty = Number(qty)
      if (!Number.isFinite(nextQty) || nextQty <= 0) {
        return prev.filter((p) => p.id !== id)
      }
      return prev.map((p) => (p.id === id ? { ...p, qty: nextQty } : p))
    })
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  function handleCheckout() {
    if (cart.length === 0) return
    clearCart()
    alert('Thank you for your purchase! This was a mock checkout.')
    setPage('home')
  }

  return (
    <>
      <div className="promo-banner">
        <div className="promo-banner__track">
          <span className="promo-banner__text">20% discount on all items ✨ Free shipping over $50 ✨ 20% discount on all items ✨ Free shipping over $50 ✨ 20% discount on all items ✨ Free shipping over $50 ✨ </span>
        </div>
      </div>
      <div className="container">
        <Navbar
          currentPage={page}
          cartCount={totalItems}
          onNavigate={setPage}
        />

        <div className="main-layout">
          <SidebarMenu 
            onNavigate={setPage} 
            currentPage={page}
            onCategorySelect={setSelectedCategory}
          />
          
          <div className="main-content">
            {page === 'home' && (
        <ProductList 
          products={filteredProducts} 
          onAdd={addToCart}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {page === 'cart' && (
        <Cart
          items={cart}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onClear={clearCart}
          onCheckout={handleCheckout}
        />
      )}

            {page === 'favorites' && (
              <Favorites />
            )}

            {page === 'contact' && (
              <ContactUs />
            )}
          </div>
        </div>

      <footer className="footer">
        <div className="footer__social">
          <a href="#" aria-label="Instagram" className="footer__icon-link">
            <svg className="footer__icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM18.5 6.5a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2z"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="footer__icon-link">
            <svg className="footer__icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
              <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06 1.88 17.08 5.56 21.2 10.32 22v-6.98H7.84v-2.96h2.48V9.56c0-2.45 1.46-3.8 3.7-3.8 1.07 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54v1.85h2.72l-.43 2.96h-2.29V22c4.76-.8 8.44-4.92 8.44-9.94z"/>
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp" className="footer__icon-link">
            <svg className="footer__icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
        <div className="footer__copy">© Casely 2025 · All rights reserved</div>
      </footer>
      </div>
    </>
  )
}
