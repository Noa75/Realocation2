import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';


export default function HomeTask(
    // { title, description, location, urgency, }
) {
    const [completed, setCompleted] = useState(false);  // קובע את מצב המשימה כלא בוצעה
    const title = "פגישה עם הנהלה";  // כותרת המשימה
    const description = "דיון בצעדים הבאים של הפרויקט";  // תיאור המשימה
    const location = "חדר ישיבות 3";  // מיקום המשימה
    const urgency = "22.1";

    const handleComplete = () => {
        setCompleted(!completed);
    };

    return (
        <div style={{
            padding: '16px 32px',
            backgroundColor: completed ? '#D9E4F4' : 'white',
            borderRadius: '16px',
            marginBottom: '16px',
            border: '1px solid #E7EFFA',
            direction: 'rtl',
            width: '80%',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden', 
            marginTop: '16px'
        }}>
            <div style={{
                height: '100%',
                width: '16px',
                backgroundColor: 'red',
                borderRadius: '0 16px 16px 0',
                position: 'absolute',
                right: '0',
                top: '0'
            }} />
            <div>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0C8CE9', margin: '0' }}>{title}</h4>
                <p style={{ fontSize: '14px', color: '#0C8CE9', margin:'0' }}>{description}</p>
                <p style={{ fontSize: '14px' }}>{location} <br /> {urgency}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }} >
                    <SecButton disabled={!completed} btntxt="השאר חוות דעת" active={completed}/>
                    <SecButton onClick={handleComplete} btntxt={completed ? "שחזר" : "בוצע"} active={!completed}/>
                </div>
            </div>
        </div>
    )
}
