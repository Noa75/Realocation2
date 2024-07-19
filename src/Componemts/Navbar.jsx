import { Stack } from '@mui/material'
import React from 'react'

export default function () {
  return (
    <div style={{
        position: 'fixed',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center', 
        height:'73px',
        padding:'0px', 
        direction:'rtl', 
        backgroundColor: '#f5f7fa',
        borderTop: '1px solid white',
        bottom: '0',
        left: '0',
        width: '100%',
        zIndex: '1000',
        maxWidth: '393px'
    }}>
        <Stack direction="row" spacing={1} >
        <button style={{backgroundColor:'#f5f7fa'}}>
            <img src="public/R.png" alt="R" />
        </button>
        <button style={{backgroundColor:'#f5f7fa'}}>
            <img src="public/Tasks.png" alt="Tasks" />
        </button>
        <button style={{backgroundColor:'#f5f7fa'}}>
            <img src="public/HomeIcon.png" alt="Home" />
        </button>
        <button style={{backgroundColor:'#f5f7fa'}}>
            <img src="public/PlusIcon.png" alt="Plus" />
        </button>
        <button style={{backgroundColor:'#f5f7fa'}}>
            <img src="public/UserIcon.png" alt="User" />
        </button>
        </Stack>
    </div>
  )
}
