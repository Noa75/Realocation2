import React, { useState } from 'react'
import { Stack, TextField } from '@mui/material';
import './Realocation.css';
import PrimeButton from './PrimeButton';
import { useNavigate } from 'react-router-dom';
import { isLocalhost } from '../Utils';

const url = isLocalhost ? "http://localhost:5231/api/" : "proj.ruppin.ac.il/bgroup30/test2"


function SignUp() {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [userExistsMSG, setUserExistsMSG] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleRegister = () => {
    console.log('reg');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=utf-8");
    myHeaders.append("Accept", "application/json; charset=utf-8");

    const RegistrationData = JSON.stringify({
      "email": user.email,
      "fullName": user.fullname,
      "passwordHash": user.password,
      "username": user.email
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: RegistrationData,
      redirect: "follow"
    };
    const errors = Object.keys(user).map(key => validateField(key, user[key])).filter(error => error);
    if (errors.length === 0 ) {
      fetch(`${url}register/register`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error('field to register');
        response.json();
      })
      .then((result) => {
        console.log("work")
        console.log(result);
        navigate('/opening-questions', { state: {} });
        //אם הבקשה עברה בהצלחה (לעבור עמוד לדוג')
        if (errors.length === 0) {
          alert('נרשם בהצלחה');
        }
      })
      .catch((error) => {
        console.log("not work")
        console.log(error)
        setUserExistsMSG("משתמש קיים")
        //הלוגיקה שמה קורה אם לא הצליח
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errMsg = '';
    switch (name) {
      case 'fullname':
        if (value.split(" ").length < 2) {
          errMsg = "יש לרשום שם מלא";
        }
        break;
      case 'email':
        if (!value.includes('@') || !value.endsWith('.com') || !/[A-Za-z]/.test(value)) {
          errMsg = "כתובת מייל לא תקינה";
        }
        break;
      case 'confirmpassword':
        if (value !== user.password) {
          errMsg = "סיסמא לא תואמת";
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: errMsg }));
    return errMsg;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  }


  return (
    <div className='signup-container' >
      <img className='logo' src="public/Logo.png" alt="logo" style={{ marginTop: "102px" }} />
      <div className='signup-inputs'>
        <TextField
          label="שם מלא"
          name="fullname"
          variant="outlined"
          value={user.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.fullname}
          helperText={errors.fullname} />
        <TextField
          label="מייל"
          name="email"
          type="email"
          variant="outlined"
          value={user.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email}
          helperText={errors.email} />
        <TextField
          label="סיסמא"
          name="password"
          type="password"
          variant="outlined"
          value={user.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password} />
        <TextField
          label="אימות סיסמא"
          name="confirmpassword"
          type="password"
          variant="outlined"
          value={user.confirmpassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.confirmpassword}
          helperText={errors.confirmpassword} />
      </div>
      <p>{userExistsMSG}</p>
      <Stack spacing={1}>
        <PrimeButton onClick={handleRegister} btntxt="הירשם" />
        <button onClick={() => navigate('/')} variant="contained" >לחשבון קיים</button>
      </Stack>

    </div>
  )
}
export default SignUp;
