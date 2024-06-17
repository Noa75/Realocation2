import TextField from '@mui/material/TextField';
import './Realocation.css';
import Stack from '@mui/material/Stack';
import PrimeButton from './PrimeButton';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isLocalhost } from '../Utils';

function LogIn() {
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const [password,setPassword] = useState();

    const btnlogin = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": user,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };

        const url = isLocalhost?"http://localhost:5231":"media.ruppin.ac.il/bgroup30/test2"
        fetch(`${url}/api/login`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("work")
                navigate('/opening-questions', { state: { } });
                //אם הבקשה עברה בהצלחה (לעבור עמוד לדוג')
            })
            .catch((error) => {
                console.log("not work")
                //הלוגיקה שמה קורה אם לא הצליח
            });
    }

    
    return (
        <div className="login-container">
            <div style={{ marginTop: "210px", marginBottom: "102px" }}>
                <img src="Logo.png" alt="logo" style={{ width: '100%' }}></img>
            </div>

            <Stack spacing={1} >
                <TextField label="שם משתמש" variant="outlined" onChange={(e) => {setUser(e.target.value)}} /> <br />
                <TextField label="סיסמא" type="password" autoComplete="current-password" onChange={(e) => {setPassword(e.target.value)}} />
            </Stack>

            <button className='forgetP'>שכחתי סיסמא</button> <br />
            <PrimeButton onClick={btnlogin} btntxt="כניסה" />
            <p className='newregister'>
                <Link to="/sign-up"><button variant="contained">הירשם</button></Link>
                ?אין לך משתמש
            </p>

        </div>
    )
}
export default LogIn;