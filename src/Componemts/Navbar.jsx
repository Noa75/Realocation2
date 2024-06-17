import React from 'react'

export default function () {
  return (
    <div style={{
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center', 
        height:'73px',
        padding:'0 54px', 
        direction:'rtl', 
        backgroundColor: '#f5f7fa',
        borderTop: '1px solid white',
    }}>
        <button>
            <img src="public/R.png" alt="R" />
        </button>
        <button>
            <img src="public/Tasks.png" alt="Tasks" />
        </button>
        <button>
            <img src="public/HomeIcon.png" alt="Home" />
        </button>
        <button>
            <img src="public/PlusIcon.png" alt="Plus" />
        </button>
        <button>
            <img src="public/UserIcon.png" alt="User" />
        </button>
    </div>
  )
}
