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
import dayjs from 'dayjs';
import { getLocalStorage } from '../utils/functions';

export default function HomePage() {
    const [drawerHieght, setDrawerHeight] = useState('50vh');
    const drawerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const location = useLocation();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        
        if (location.state && location.state.tasks) {
            setTasks(location.state.tasks);
        }else{
            
           const allRemainingTasks= getLocalStorage('allRemainingTasks')
           if(allRemainingTasks){
            setTasks(allRemainingTasks);
           }
        }
    }, [location]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate); 
    };
    

    const filteredTasks = tasks.filter(task => {
        return dayjs(task.startDate).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD');
    });

    useEffect(() => {
        const changeDrawerHeight = (e) => {
            if (!drawerRef.current) return;
            const newHeight = e.touches[0].clientY; 
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
                    <DateCalendar value={selectedDate} onChange={handleDateChange} />
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
                        <h4 style={{ fontSize: '32px', fontWeight: '200', margin: '0' }}>{selectedDate.format('DD/MM')}</h4>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ marginBottom: '0' }}>משימות להיום</h3>
                            <p style={{ marginTop: '0' }}>{completedTasks.length} משימות מתוך {filteredTasks.length}</p>
                        </div>
                    </div>
                    <div style={{ height: '100%', overflowY: 'auto', direction: 'rtl' }}>
                        <HomeTask tasks={filteredTasks} setTasks={setTasks} />
                    </div>

                </div>
            </div>
            <Navbar />
        </div>
    )
}
