import React, { useState } from 'react'
import Navbar from './Navbar'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'; 

export default function PostPage() {
    const [activeTab, setActiveTab] = useState('general');
    const destCountry = "אוסטרליה"

    const addPost = () => {

    }

    const tabStyle = {
        padding: '10px 20px',
        cursor: 'pointer',
        borderBottom: '2px solid transparent', // default no underline
        marginBottom: '-2px' // keeps the tabs aligned with the underline
    };

    const activeTabStyle = {
        ...tabStyle,
        borderBottom: '2px solid blue'
    };

    return (
        <div>
            <div style={{ paddingTop: '54px', textAlign: 'center', color: 'white' }}>
                <img src="public/R.png" alt="logo" />
            </div>
            <h4>{destCountry}</h4>
            <div className='tabButtons' dir='rtl'>
            <div>
            <button
                style={activeTab === 'general' ? activeTabStyle : tabStyle}
                onClick={() => setActiveTab('general')}>כללי</button>
            <button
                style={activeTab === 'myPosts' ? activeTabStyle : tabStyle}
                onClick={() => setActiveTab('myPosts')}>הפוסטים שלי</button>
        </div>
            </div>
            <div style={{position: 'fixed', right: '16px', bottom: '96px'}}>
                <Fab color="primary" aria-label='add' onClick={addPost}>
                    <AddIcon />
                </Fab>
            </div>
            <Navbar />
        </div>
    )
}
