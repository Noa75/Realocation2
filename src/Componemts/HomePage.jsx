import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { SwipeableDrawer, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Drawer, Button } from '@mui/material';
import Navbar from './Navbar';
import zIndex from '@mui/material/styles/zIndex';
import HomeTask from './HomeTask';

const localizer = momentLocalizer(moment)

export default function HomePage() {
    const [drawerHieght, setDrawerHeight] = useState('50vh');
    const [isOpen, setIsOpen] = useState(false); 
    const handleSwipe = (e, newHeight) => {
    if (newHeight > window.innerHeight * 0.85) {
        setDrawerHeight('85%'); // מקסימום 85% מהמסך
    } else {
        setDrawerHeight('50%'); // מינימום 50% מהמסך
    }
   };

   const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setDrawerHeight(isOpen ? '50%' : '90%'); // שינוי הגובה בהתאם למצב
};

    return (
        <div style={{ backgroundColor: '#0C8CE9', margin: '0', height: '100vh' }}>
            <div style={{ paddingTop: '54px', textAlign: 'center', color: 'white' }}>
                <img src="public/White R.png" alt="logo" />
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </div>
            <div>
            <SwipeableDrawer
                anchor='bottom'
                open={true}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                swipeAreaWidth={30}
                disableSwipeToOpen={false}
                onSwipe={(e) => handleSwipe(e)}
                PaperProps={{
                    style: {
                        position: 'absolute',
                        height: drawerHieght,
                    },
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    style: { backgroundColor: 'transparent' } // הסרת הצללה בעת פתיחת המגירה
                }}
            >
                <div style={{ height: '100%', overflow: 'auto' }}>
                    <HomeTask/>
                </div>
            </SwipeableDrawer>
            </div>
            <Navbar />
        </div>
    )
}
