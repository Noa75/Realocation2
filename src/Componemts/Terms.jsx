import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PrimeButton from './PrimeButton';
import Navbar from './Navbar';

export default function Terms() {
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    if (isAccepted) {
        navigate('/opening-questions');
    }
  };
  
    return (
    <div style={{padding: '24px'}}>
        <div className='stepIndicator' dir='rtl' >
                <div className='dot active'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>
        <h4>
            תנאי שימוש באפליקציה
        </h4>
        <p style={{marginBottom: '24px', textAlign: 'right', direction: 'rtl'}}>
        ברוכים הבאים לאליקציית Realocation. אפליקציה זו נועדה לעזור למשתמשים להתמודד עם תהליך המעבר, תוך הצעת משימות אורגניזטוריות לניהול התהליך. 
        </p>
        <p style={{marginBottom: '24px', textAlign: 'right', direction: 'rtl'}}>
        האפליקציה אינה מחויבת לעדכון חוקי או מקצועי ומספקת כלים תומכים בלבד.
        </p>
        <p style={{marginBottom: '120px', textAlign: 'right', direction: 'rtl'}}>
        השימוש באפליקציה מוגבל למטרות אישיות והמידע המועבר דרכה אינו לשימוש מסחרי או הפצה נוספת. פרטיות המשתתפים מוגנת והמידע אודותיהם לא ישותף ללא הסכמתם.
        </p>
        <div style={{textAlign: 'right'}}>
            <label htmlFor="">
            אני מסכימ.ה לתנאי השימוש
                <input
                    type='checkbox'
                    checked={isAccepted}
                    onChange={e => setIsAccepted(e.target.checked)}
                    style={{marginLeft: '8px'}}
                />
            </label>
        </div>
        <div style={{marginTop: '32px'}}>
        <PrimeButton onClick={handleAccept} btntxt="הבא" disabled={!isAccepted} /></div>
        <Navbar />
    </div>
  )
}
