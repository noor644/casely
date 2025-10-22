import React, { useState } from 'react'

export default function ProductCard({ product, onAdd }) {
  const [selectedModel, setSelectedModel] = useState('iPhone 15 Pro')
  const [selectedColor, setSelectedColor] = useState('Black')

  const iphoneModels = [
    'iPhone 15 Pro Max',
    'iPhone 15 Pro',
    'iPhone 15 Plus',
    'iPhone 15',
    'iPhone 14 Pro Max',
    'iPhone 14 Pro',
    'iPhone 14 Plus',
    'iPhone 14',
    'iPhone 13 Pro Max',
    'iPhone 13 Pro',
    'iPhone 13',
    'iPhone 12 Pro Max',
    'iPhone 12 Pro',
    'iPhone 12',
  ]

  const siliconColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy Blue', hex: '#1e3a8a' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Mint Green', hex: '#6ee7b7' },
    { name: 'Lavender', hex: '#c084fc' },
    { name: 'Coral', hex: '#fb7185' },
    { name: 'Sky Blue', hex: '#38bdf8' },
  ]

  const isSiliconCase = product.category === 'Silicone Cases'

  const handleAddToCart = () => {
    const productData = { ...product, selectedModel }
    if (isSiliconCase) {
      productData.selectedColor = selectedColor
    }
    onAdd(productData)
  }

  return (
    <div className="card">
      <img className="card__img" src={product.image} alt={product.title} width={240} height={240} />
      <div className="card__body">
        <h3 className="card__title">{product.title}</h3>
        
        <div className="model-selector">
          <label htmlFor={`model-${product.id}`} className="model-selector__label">
            Choose iPhone Model:
          </label>
          <select
            id={`model-${product.id}`}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="model-selector__select"
          >
            {iphoneModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {isSiliconCase && (
          <div className="color-selector">
            <label className="color-selector__label">
              Choose Color:
            </label>
            <div className="color-selector__options">
              {siliconColors.map((color) => (
                <button
                  key={color.name}
                  className={`color-selector__swatch ${selectedColor === color.name ? 'color-selector__swatch--active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
            <div className="color-selector__selected">{selectedColor}</div>
          </div>
        )}

        <div className="card__footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className="btn btn--primary" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}
