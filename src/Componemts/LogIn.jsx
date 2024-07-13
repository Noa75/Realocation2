import TextField from '@mui/material/TextField';
import './Realocation.css';
import Stack from '@mui/material/Stack';
import PrimeButton from './PrimeButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { isLocalhost } from '../Utils';
import { UserContext } from './UserHook';

const url = isLocalhost?"http://localhost:5231/api/":"proj.ruppin.ac.il/bgroup30/test2"

function LogIn() {
    const navigate = useNavigate();
    const {setUserDetails} = useContext(UserContext);
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

        fetch(`${url}login`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.userId)
                setUserDetails({userId : result.userId});
                navigate('/opening-questions', { state : {userId : result.userId}} );
                //אם הבקשה עברה בהצלחה (לעבור עמוד לדוג')
            })
            .catch((error) => {
                console.log(error)
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
                <button onClick={() => navigate('/sign-up')} variant="contained">הירשם</button>
                ?אין לך משתמש
            </p>

        </div>
    )
}
export default LogIn;