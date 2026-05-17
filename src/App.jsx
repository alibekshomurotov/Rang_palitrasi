import React, { useState, useCallback } from 'react'
import ColorPalette from './components/ColorPalette'
import ColorControls from './components/ColorControls'

function App() {
  const [colors, setColors] = useState([
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7'
  ])
  const [copiedIndex, setCopiedIndex] = useState(null)

  // Tasodifiy rang generatsiya qilish
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  // Yangi palitra generatsiya qilish
  const generateNewPalette = () => {
    const newColors = Array(5).fill().map(() => generateRandomColor())
    setColors(newColors)
  }

  // Rangni nusxalash
  const copyToClipboard = async (color, index) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Nusxalash amalga oshmadi: ', err)
    }
  }

  // Rangni o'zgartirish
  const handleColorChange = (index, newColor) => {
    const newColors = [...colors]
    newColors[index] = newColor
    setColors(newColors)
  }

  // Ranglarni eksport qilish (JSON format)
  const exportPalette = () => {
    const dataStr = JSON.stringify(colors, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'palette.json'
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // Ranglarni import qilish
  const importPalette = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedColors = JSON.parse(e.target.result)
          if (Array.isArray(importedColors) && importedColors.length === 5) {
            setColors(importedColors)
          } else {
            alert('Iltimos, 5 ta rangdan iborat massiv yuklang!')
          }
        } catch (err) {
          alert('Faylni o\'qishda xatolik yuz berdi!')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Rang Palitrasi Generatori</h1>
        <p>Tasodifiy ranglar palitrasini yarating va nusxalang</p>
      </header>

      <ColorControls 
        onGenerate={generateNewPalette}
        onExport={exportPalette}
        onImport={importPalette}
      />

      <div className="palette-container">
        {colors.map((color, index) => (
          <ColorPalette
            key={index}
            color={color}
            index={index}
            onColorChange={(newColor) => handleColorChange(index, newColor)}
            onCopy={() => copyToClipboard(color, index)}
            isCopied={copiedIndex === index}
          />
        ))}
      </div>

      <footer className="app-footer">
        <p>💡 Maslahat: Rang ustiga bosing va nusxalang yoki rang tanlash uchun rang kvadratiga bosing</p>
      </footer>
    </div>
  )
}

export default App