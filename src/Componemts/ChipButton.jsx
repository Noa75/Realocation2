import React from 'react'

export default function ChipButton({txt}) {
  
  return (
    <div>
        <button style={{
          fontSize:'14px',
          padding:'6px 14px',
          border:'1px solid',
          borderRadius:'50px',
          color: '#1170f4',
          }}>
            {txt}
        </button>
    </div>
  )
}
