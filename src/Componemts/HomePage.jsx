import React, { useEffect, useState } from 'react'
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
import './Realocation.css';

const localizer = momentLocalizer(moment)

export default function HomePage() {
    const [drawerHieght, setDrawerHeight] = useState('50vh');
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [completedTasks, setCompletedTasks] = useState(3);
    const [totalTasks, setTotalTasks] = useState(5);
    
    useEffect (() => {
        setCompletedTasks(3);
        setTotalTasks(5);
    },[]);

    const toggleDrawer = (open) => {
        setIsOpen(open);
        setDrawerHeight(open ? '85vh' : '50vh');
    };

    const handleSwipe = (e, newHeight) => {
        const minHeight = window.innerHeight * 0.5; // 50% מגובה החלון
        const maxHeight = window.innerHeight * 0.85;
    if (newHeight < minHeight) {
        setDrawerHeight('85%'); // מקסימום 85% מהמסך
    } else if (newHeight > maxHeight * 0.5) {
        setDrawerHeight('50%'); // מינימום 50% מהמסך
    } else {
        setDrawerHeight(`${newHeight}px`)
    }
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
                open={!isOpen}
                onClose={() => toggleDrawer(true)}
                onOpen={() => toggleDrawer(true)}
                swipeAreaWidth={30}
                disableSwipeToOpen={false}
                onSwipe={(e) => handleSwipe(e)}
                PaperProps={{
                    style: {
                        position: 'absolute',
                        height: drawerHieght,
                        borderRadius: '32px 32px 0 0',
                        top: 'auto',
                        transition: 'height 0.3s'
                    },
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    style: { backgroundColor:'transparent' } // הסרת הצללה בעת פתיחת המגירה
                }}
            >
                
                    <div style={{padding: '0 16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '-16px', direction: 'rtl' }}>
                    <h4 style={{fontSize:'32px', fontWeight: '200', margin: '0'}}>{moment(date).format('DD/MM')}</h4>
                    <div style={{textAlign: 'right'}}>
                    <h3 style={{marginBottom: '0'}}>משימות להיום</h3>
                    <p style={{marginTop: '0'}}>{completedTasks} משימות מתוך {totalTasks}</p>
                    </div>
                    </div>
                    <div style={{ height: '100%', overflowY: 'auto', direction: 'rtl' }}>
                    <HomeTask/>
                    </div>
                
            </SwipeableDrawer>
            </div>
            <Navbar />
        </div>
    )
}
