import React, { useEffect, useState, useRef } from 'react'
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
import { Widgets } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
    const [drawerHieght, setDrawerHeight] = useState('50vh');
    const drawerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const location = useLocation();
    //const [tasks, setTasks] = useState([]);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            taskName: "משימה לדוגמה",
            taskDescription: "תיאור משימה לדוגמה",
            priority: 2, // דרגת דחיפות
            endDate: "2024-08-28", // אותו תאריך שנבחר
            completed: false, // משימה לא הושלמה
            userTaskId: 1
        }
    ]);

    useEffect(() => {
        // בדוק אם יש משימות במיקום ועדכן את ה-state
        if (location.state && location.state.tasks) {
            setTasks(location.state.tasks);
        }
    }, [location]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    // const handleDateChange = (newDate) => {
    //     setSelectedDate(newDate.toISOString().split('T')[0]); // שמירת תאריך בפורמט YYYY-MM-DD
    // };

    // const filteredTasks = tasks.filter(task => task.endDate === selectedDate); // סינון משימות לפי התאריך הנבחר


    useEffect(() => {
        // פונקציה לשינוי גובה המגירה במגע
        const changeDrawerHeight = (e) => {
            if (!drawerRef.current) return;
            const newHeight = e.touches[0].clientY; // השגת מיקום המגע
            const screenHeight = window.innerHeight;
            const calculatedHeight = Math.max(screenHeight - newHeight, screenHeight * 0.50); // חישוב הגובה החדש

            if (calculatedHeight > screenHeight * 0.85) {
                setDrawerHeight('85vh');
            } else {
                setDrawerHeight(`${calculatedHeight}px`);
            }
        };

        const drawerElement = drawerRef.current;
        if (drawerElement) {
            drawerElement.addEventListener('touchmove', changeDrawerHeight);
            return () => drawerElement.removeEventListener('touchmove', changeDrawerHeight);
        }
    }, []);


    return (
        <div style={{ backgroundColor: '#0C8CE9',height: '100%', width: '100%', left: '0', margin: '0px', position: 'fixed', top: '0' }}>
            <div style={{ paddingTop: '54px', textAlign: 'center', color: 'white' }}>
                <img src="public/White R.png" alt="logo" />
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar  />
                </LocalizationProvider>
            </div>
            <div>
                <div className='drawer'
                    ref={drawerRef}
                    anchor='bottom'
                    open={!isOpen}
                    onClose={() => setIsOpen(false)}
                    onOpen={() => setIsOpen(true)}
                    swipeAreaWidth={30}
                    style={{
                            position: 'absolute',
                            height: {drawerHieght},
                            borderRadius: '32px 32px 0 0',
                            top: `calc(100vh - ${drawerHieght})`,
                            transition: 'height 0.3s',
                            backgroundColor: 'white',
                            bottom: '0',
                            width: '100%', 
                            left: '0'
                    }}>
                    <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '-16px', direction: 'rtl', textAlign: 'right' }}>
                        <h4 style={{ fontSize: '32px', fontWeight: '200', margin: '0' }}>{moment(selectedDate).format('DD/MM')}</h4>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ marginBottom: '0' }}>משימות להיום</h3>
                            <p style={{ marginTop: '0' }}>{completedTasks} משימות מתוך {totalTasks}</p>
                        </div>
                    </div>
                    <div style={{ height: '100%', overflowY: 'auto', direction: 'rtl' }}>
                        <HomeTask tasks={tasks} setTasks={setTasks} />
                    </div>

                </div>
            </div>
            <Navbar />
        </div>
    )
}
