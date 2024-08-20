import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PrimeButton from './PrimeButton';
import Navbar from './Navbar';
import { Grid, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { baseURL } from '../Utils';
import { UserContext } from './UserHook';

export default function Terms() {
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const url = baseURL();
  const {userDetails, setUserDetails} = useContext(UserContext);

  const fromReg = location.state?.fromReg; 

useEffect (() => {
  if (!userDetails) {
    navigate('/');
}
else {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch(`${url}register/${userDetails.userId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setIsAccepted(result.hasAcceptedTerms)
    })
    .catch((error) => console.error(error));
  }
},[userDetails, url, navigate])


  const acceptTerms = () =>  {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify(isAccepted);

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`${url}register/accept-terms/${userDetails.userId}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log("work")
        console.log(result);
        setUserDetails(prev => ({ ...prev, userId: result.userId }));
        navigate('/opening-questions', { state: { userId: result.userId } });
  })
  .catch((error) => {
    console.log(error);
  });
  }


    return (
    <div style={{padding: '24px'}}>
        <div className='stepIndicator' dir='rtl' >
                <div className='dot active'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <IconButton onClick={() => navigate(-1)} style={{ transform: 'scaleX(-1)', position: 'absolute', left: '320px' }}>
          <ArrowBackIcon />
        </IconButton>
        <h4 style={{ textAlign: 'center' }}>תנאי שימוש</h4>
      </div>
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
        <PrimeButton onClick={acceptTerms} btntxt="הבא" disabled={!isAccepted} /></div>
        {!fromReg && <Navbar />} 
    </div>
  )
}
