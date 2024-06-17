import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const localizer = momentLocalizer(moment)

export default function HomePage() {
    
    const [date, setDate] = useState(new Date());

    const customToolbar = () => {
        return null;
    }

    const prevMonth = () => {
        setDate(moment(date).subtract(1,'month').toDate());
    }

    const nextMonth = () => {
        setDate(moment(date).add(1,'month').toDate());
    }
    
    const events = [
        {
            title: 'מפגש עבודה',
            start: moment().toDate(),
            end: moment().add(1, 'hours').toDate(),
            allDay: false
        }
    ];

    

    return (
    <div style={{backgroundColor:'#1170f4'}}>
        <div style={{paddingTop:'54px', textAlign:'center', color:'white'}}>
            <img src="public/White R.png" alt="logo" />
        </div>
        <IconButton>
            <ArrowBackIcon onClick={nextMonth} style={{color:'white' }} />
        </IconButton>
        {/* {months(date).format('MMMM YYYY')} */}
        <IconButton>
            <ArrowBackIcon onClick={prevMonth} style={{color:'white', transform: 'scaleX(-1)' }} />
        </IconButton>
        
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                
                date={date}
                onNavigate={date => setDate(date)}
                startAccessor="start"
                endAccessor="end"
                toolbar={customToolbar}
                style={{ height: '100%', margin: '50px' }}
            />
        </div>
    </div>
  )
}
