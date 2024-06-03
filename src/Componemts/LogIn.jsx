import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Realocation.css';
import Stack from '@mui/material/Stack';
import PrimeButton from './PrimeButton';
import { Link } from 'react-router-dom';

function LogIn() {
    const btnlogin = () => {
        
    }

    return (
        <div className="login-container">
            <div style={{ marginTop: "210px", marginBottom: "102px" }}>
                <img src="Logo.png" alt="logo" style={{width:'100%'}}></img>
            </div>

            <Stack spacing={1}>
                <TextField label="שם משתמש" variant="outlined" /> <br />
                <TextField label="סיסמא" type="password" autoComplete="current-password" />
            </Stack>

            <button className='forgetP'>שכחתי סיסמא</button> <br />
            <PrimeButton onClick={btnlogin} btntxt="כניסה"/>
            <p className='newregister'>
                <Link to={"sign-up"}><button variant="contained">הירשם</button></Link>
                ?אין לך משתמש
            </p>
            
        </div>
    )
}
export default LogIn;