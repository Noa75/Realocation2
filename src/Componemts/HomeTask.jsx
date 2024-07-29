import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';


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
        padding: '16px',
        backgroundColor: completed ? '#D9E4F4' : 'white',
        borderRadius: '16px',
        marginBottom: '16px'
    }}>
        <div style={{
            height: '100%',
            width: '16px',
            backgroundColor: 'red',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px'
        }} />
            <div>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0C8CE9'}}>{title}</h4>
                <p style={{ fontSize: '14px', color: '#0C8CE9'}}>{description}</p>
                <p style={{ fontSize: '14px'}}>{location}</p>
                <p style={{ fontSize: '14px'}}>{urgency}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px'}} >
                <Button
                        variant={completed ? 'contained' : 'outlined'}
                        onClick={handleComplete}
                        style={{ marginRight: '8px' }}
                    >
                        {completed ? 'Restore' : 'Completed'}
                    </Button>
                    <Button
                        variant={completed ? 'outlined' : 'contained'}
                        
                    >
                        Leave Feedback
                    </Button>
                </div>
            </div>
    </div>
  )
}
