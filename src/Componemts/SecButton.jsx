import React from 'react'

export default function SecButton({ btntxt }) {
  return (
    <button style={{
        backgroundColor:'transparent',
        border:'1px solid #1170f4',
        padding:'10px 32px',
        fontSize:'14px',
        borderRadius:'50px',
        color:'#1170f4'
    }}>
        {btntxt}
    </button>
  )
}
