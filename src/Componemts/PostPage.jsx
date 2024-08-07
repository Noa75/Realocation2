import React, { useState } from 'react'
import Navbar from './Navbar'
import { Fab, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Post from './Post';
import { useNavigate } from 'react-router-dom';


export default function PostPage() {
    const [activeTab, setActiveTab] = useState('general');
    const navigate = useNavigate();
    const destCountry = "אוסטרליה"

    const tabStyle = {
        padding: '10px 20px',
        borderBottom: '2px solid transparent', // default no underline
        marginBottom: '-2px',
        width: '33%',
        flex: 1,
        fontWeight: 'normal' // keeps the tabs aligned with the underline
    };

    const activeTabStyle = {
        ...tabStyle,
        borderBottom: '2px solid #0C8CE9',
        fontWeight: 'bold'
    };

    const goToNewPost = () => {
        navigate('/new-post');
    };

    return (
        <div style={{ height: '100vh' }} >
            <div style={{ paddingTop: '24px', textAlign: 'center', color: 'white' }}>
                <img src="public/blueLogo.png" alt="logo" />
            </div>
            <h4 style={{ margin: '8px', textAlign: 'center' }}>{destCountry}</h4>
            <div dir='rtl'>
                <div style={{display: 'flex', justifyContent: 'center', direction: 'rtl'}}>
                    <h3
                        style={activeTab === 'general' ? activeTabStyle : tabStyle}
                        onClick={() => setActiveTab('general')}>כללי</h3>
                    <h3
                        style={activeTab === 'myPosts' ? activeTabStyle : tabStyle}
                        onClick={() => setActiveTab('myPosts')}>הפוסטים שלי</h3>
                </div>
                <div style={{ margin: '20px' }}>
                    <TextField
                        fullWidth
                        placeholder="מה היית רוצה לשתף?"
                        onClick={goToNewPost}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <Post />
            </div>
            <Navbar />
        </div>
    )
}
