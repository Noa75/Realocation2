import React, { useState } from 'react'
import { TextField } from '@mui/material';
import './Realocation.css';
import PrimeButton from './PrimeButton';
import { Link } from 'react-router-dom';

function SignUp() {
  const [user, setUser] = useState({
    fullname:'',
    email:'',
    password:'',
    confirmpassword:''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateField( name, value);
  };

  const validateField = (name, value) =>{
    let errMsg = '';
    switch (name){
      case 'fullname':
        if (value.split(" ").length < 2){
          errMsg = "יש לרשום שם מלא";
        }
        break;
      case 'email':
        if (!value.includes('@') || !value.endsWith('.com')){
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
    setErrors(prev => ({...prev, [name]:errMsg}));
    return errMsg;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  }

  const handleRegister = () => {
    const errors = Object.keys(user).map(key => validateField(key, user[key])).filter(error => error);
    if (errors.length === 0){
      alert('נרשם בהצלחה');
    }
  };

  return (
    <div className='signup-container' >
      <img className='logo' src="public/Logo.png" alt="logo" style={{marginTop:"60px", marginBottom:"102px"}}/>
      <div className='signup-inputs'>
        <TextField
          label="שם מלא"
          name="fullname"
          variant="outlined"
          value={user.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullname}
          helperText={errors.fullname} />
        <TextField
          label="מייל"
          name="email"
          type="email"
          variant="outlined"
          value={user.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          helperText={errors.email} />
        <TextField
          label="סיסמא"
          name="password"
          type="password"
          variant="outlined"
          value={user.password}
          onChange={handleChange} 
          onBlur={handleBlur}
          error={errors.password}/>
        <TextField
          label="אימות סיסמא"
          name="confirmpassword"
          type="password"
          variant="outlined"
          value={user.confirmpassword}
          onChange={handleChange} 
          onBlur={handleBlur}
          error={errors.confirmpassword}
          helperText={errors.confirmpassword}/>
      </div>
      <div onClick={handleRegister} style={{marginTop:"96px", marginBottom:"8px"}}>
      <PrimeButton btntxt="הירשם" />
      </div>
      <Link to="/"><button variant="contained" >לחשבון קיים</button></Link>
    </div>
  )
}
export default SignUp;
