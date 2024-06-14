import React from 'react'

export default function SecButton({ btntxt, onClick, active }) {
  return (
    <button onClick={onClick} style={{
        backgroundColor: active ? '#1170f4' : 'transparent',
        color: active ? 'white' : '#1170f4',
        border:'1px solid #1170f4',
        padding:'10px 32px',
        fontSize:'14px',
        borderRadius:'50px',
    }}>
        {btntxt}
    </button>
  )
}
