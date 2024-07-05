import React, { useState, useContext } from 'react'
import Task from './Task'
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ArrowBack } from '@mui/icons-material';
import ChipButton from './ChipButton';
import Navbar from './Navbar';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserHook';

export default function TaskBoard() {
    const [selectedOption, setSelectedOption] = useState('בית ספר');
    const [task, setTask] = useState();
    const { userDetails, setUserDetails } = useContext(UserContext);

    const location = useLocation();
    const selectedCategories = location.state.selectedCategories;
    console.log(location)

    const handleButton = (selection) => {
        setSelectedOption(selection);
    }

    const deleteTask = (label) => {
        setTask(prevTask => prevTask.filter(task => task.label !== label));
    }
    
    return (
        <div className='taskboard-container' >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton style={{ transform: 'scaleX(-1)', left: '220px' }}>
                    <ArrowBack />
                </IconButton>
                <h4 style={{ textAlign: 'center' }}>בניית לוח משימות</h4>
            </div>
            <div className='chip-container'>
            <Stack direction="row-reverse" spacing={1} >
                <ChipButton txt="בית ספר" onClick={() => handleButton('בית ספר')} active={selectedOption === 'בית ספר'} />
                <ChipButton txt="בריאות" onClick={() => handleButton('בריאות')} active={selectedOption === 'בריאות'} />
                <ChipButton txt="ביטוחים" onClick={() => handleButton('ביטוחים')} active={selectedOption === 'ביטוחים'} />
                <ChipButton txt="בעלי חיים" onClick={() => handleButton('בעלי חיים')} active={selectedOption === 'בעלי חיים'} />
            </Stack>
            </div>
            <div className='taskrec'>
                <h3 style={{width:'100%', fontSize: '18px', textAlign:'right', fontWeight: '300' }}>לפני</h3>
                <Task date="17.1" label="מציאת בית ספר" description="בדוק בין האופציות השונות באזורך החדש" onDelete={deleteTask} />
                <Task date="20.1" label="בדיקת תכני לימוד" description="עיין בתכנית הלימודים ובדוק התאמה" />
                <Task date="21.1" label="סיור וירטואלי בבית הספר" description="הכר מראש את הבית הספר" />
                <Task date="30.1" label="ביצוע הרשמה" description="השלם את תהליך ההרשמה ואסוף את המסמכים הנדרשים" />
            </div>
            <div className='taskrec'>
                <h3 style={{ fontSize: '18px', float: 'right', fontWeight: '300' }}>אחרי</h3>
                <Task date="5.8" label="בדיקת הסעות לבית הספר" description="בדיקת מרחק וסרכי הגעה לבית הספר" />
                <Task date="5.8" label="התאמת ציוד לימודי" description="רכישת ציוד נדרש לשנה החדשה" />
            </div>
            <Stack spacing={1} direction='column' sx={{ width: '50%', margin: 'auto' }}>
                <SecButton btntxt="הוספת משימה חדשה" >
                    {<AddIcon />}
                </SecButton>
                <Link to="/edit-task"><PrimeButton btntxt="הבא"/></Link>
            </Stack>
            <Navbar />
        </div>
        

    )
}
