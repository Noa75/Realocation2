import React from 'react'

export default function PrimeButton({ btntxt, onClick }) {
  
  return (

    <button onClick={() => {onClick()}} style={{
        color: 'white',
        backgroundColor: '#0C8CE9',
        padding:'8px 54px',
        fontSize: '18px',
        borderRadius:'50px'
    }}>
        {btntxt}
    </button>
  )
}
