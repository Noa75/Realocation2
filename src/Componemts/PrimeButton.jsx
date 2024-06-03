import React from 'react'

export default function PrimeButton({ btntxt }) {
  return (
    <button style={{
        color: 'white',
        backgroundColor: '#1170f4',
        padding:'10px 54px',
        fontSize: '18px',
        borderRadius:'50px'
    }}>
        {btntxt}
    </button>
  )
}
