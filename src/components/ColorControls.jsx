import React, { useRef } from 'react'

function ColorControls({ onGenerate, onExport, onImport }) {
  const fileInputRef = useRef(null)

  const handleImportClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="controls">
      <button 
        className="control-btn generate-btn"
        onClick={onGenerate}
      >
        🎲 Yangi palitra
      </button>
      
      <button 
        className="control-btn export-btn"
        onClick={onExport}
      >
        💾 Eksport qilish (JSON)
      </button>
      
      <button 
        className="control-btn import-btn"
        onClick={handleImportClick}
      >
        📂 Import qilish (JSON)
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImport}
        accept=".json"
        className="file-input"
      />
    </div>
  )
}

export default ColorControls