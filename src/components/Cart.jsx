import React, { useMemo } from 'react'

export default function Cart({ items, onUpdateQty, onRemove, onClear, onCheckout }) {
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  )

  return (
    <section>
      <h2 className="section-title">Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart">
          <ul className="cart__list">
            {items.map((item) => (
              <li key={item.id} className="cart__item">
                <img src={item.image} alt={item.title} width={72} height={72} />
                <div className="cart__details">
                  <div className="cart__title">{item.title}</div>
                  {item.selectedModel && (
                    <div className="cart__model">Model: {item.selectedModel}</div>
                  )}
                  {item.selectedColor && (
                    <div className="cart__model">Color: {item.selectedColor}</div>
                  )}
                  <div className="cart__price">${item.price.toFixed(2)}</div>
                </div>
                <div className="cart__qty">
                  <button className="btn btn--ghost" onClick={() => onUpdateQty(item.id, item.qty - 1)}>-</button>
                  <input
                    className="qty-input"
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => onUpdateQty(item.id, e.target.value)}
                  />
                  <button className="btn btn--ghost" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <div className="cart__total">${(item.price * item.qty).toFixed(2)}</div>
                <button className="btn btn--secondary" onClick={() => onRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className="cart__summary">
            <div className="cart__row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="cart__actions">
              <button className="btn btn--ghost" onClick={onClear}>Clear cart</button>
              <button className="btn btn--primary" onClick={onCheckout}>Checkout (Mock)</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
