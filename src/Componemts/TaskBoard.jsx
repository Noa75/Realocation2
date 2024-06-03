import React from 'react'
import Task from './Task'
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ArrowBack } from '@mui/icons-material';
import ChipButton from './ChipButton';
import Navbar from './Navbar';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';

export default function TaskBoard() {
    return (
        <div className='taskboard-container' style={{width:'393px'}} >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton style={{ transform: 'scaleX(-1)', left: '250px' }}>
                    <ArrowBack />
                </IconButton>
                <h4 style={{ textAlign: 'center' }}>בניית לוח משימות</h4>
            </div>
            <Stack direction="row-reverse" spacing={1} >
                <ChipButton txt="בית ספר" />
                <ChipButton txt="בריאות" />
                <ChipButton txt="ביטוחים" />
                <ChipButton txt="בעלי חיים" />
            </Stack>
            <div className='taskrec'>
                <h3 style={{ fontSize: '18px', float: 'right', fontWeight: '300' }}>לפני</h3>
                <Task date="17.1" label="מציאת בית ספר" description="בדוק בין האופציות השונות באזורך החדש" />
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
                <PrimeButton btntxt="הבא"/>
            </Stack>
            <Navbar style={{ position: 'fixed', bottom:'0' }} />
        </div>
        

    )
}
