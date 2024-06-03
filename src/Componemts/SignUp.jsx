import React, { useState } from 'react'
import { TextField } from '@mui/material';
import './Realocation.css';
import PrimeButton from './PrimeButton';
import { Link } from 'react-router-dom';

function SignUp() {
  const [user, setUser] = useState({
    fullname:'',
    username:'',
    email:'',
    password:'',
    confirmpassword:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleRegister = () => {

    console.log("fullname:", user.fullname);
    console.log("username:", user.username);
    console.log("email:", user.email);
    console.log("password:", user.password);
    console.log("conpassword:", user.confirmpassword);
e


    if (!user.fullname || !user.username || !user.email || 
      !user.password || !user.confirmpassword) {
        alert('יש למלא את כל השדות');
        return;
    }
    if (user.password !== user.confirmpassword) {
      alert('סיסמא לא תואמת');
      return;
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert ('נרשם בהצלחה')
  }

  return (
    <div className='signup-container' >
      <img className='logo' src="public/Logo.png" alt="logo" style={{marginTop:"60px", marginBottom:"102px"}}/>
      <div className='signup-inputs'>
        <TextField
          label="שם מלא"
          name="fullname"
          variant="outlined"
          value={user.fullname}
          onChange={handleChange} />
          <TextField
          label="שם משתמש"
          name="username"
          variant="outlined"
          value={user.username}
          onChange={handleChange} />
        <TextField
          label="מייל"
          name="email"
          type="email"
          variant="outlined"
          value={user.email}
          onChange={handleChange} />
        <TextField
          label="סיסמא"
          name="password"
          type="password"
          variant="outlined"
          value={user.password}
          onChange={handleChange} />
        <TextField
          label="אימות סיסמא"
          name="confirmpassword"
          type="password"
          variant="outlined"
          value={user.confirmpassword}
          onChange={handleChange} />
      </div>
      <div onClick={handleRegister} style={{marginTop:"96px", marginBottom:"8px"}}>
      <Link to={"/opening-questions"}><PrimeButton btntxt="הירשם" /></Link>
      </div>
      <Link to="/"><button variant="contained" >לחשבון קיים</button></Link>
    </div>
  )
}
export default SignUp;
