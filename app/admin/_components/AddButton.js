import React from 'react'

function AddButton({ text, onClick }) {
  return (
    <button onClick={onClick} className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded mb-4">
        {text}
    </button>
  )
}

export default AddButton;