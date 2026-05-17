import React from 'react'

function ColorPalette({ color, index, onColorChange, onCopy, isCopied }) {
  return (
    <div className="color-card">
      <div 
        className="color-preview" 
        style={{ backgroundColor: color }}
        onClick={onCopy}
      >
        <div className="copy-overlay">
          <div className="copy-text">
            {isCopied ? "✅ Nusxalandi!" : "📋 Nusxalash uchun bosing"}
          </div>
        </div>
        {isCopied && (
          <div className="copy-notification">
            {color} nusxalandi!
          </div>
        )}
        <div className="index-badge">
          #{index + 1}
        </div>
      </div>
      <div className="color-info">
        <div className="color-value">
          {color}
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="color-input"
          aria-label="Rangni o'zgartirish"
        />
      </div>
    </div>
  )
}

export default ColorPalette