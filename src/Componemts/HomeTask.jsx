import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';
import { de } from 'date-fns/locale';


export default function HomeTask() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "משימת חבילה", description: "nnn", location: "תל אביב", urgency: "22.4", completed: false},
        { id: 2, title: "משימת חבילה", description: "nnn", location: "תל אביב", urgency: "22.4", completed: false},
        { id: 3, title: "משימת חבילה", description: "nnn", location: "תל אביב", urgency: "22.4", completed: false}
    ]);


    const handleComplete = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed};
            }
            return task;
        }))
    };

    return (
        <>
        {tasks.map((task) =>(
        <div key={task.id} style={{
            padding: '16px 32px',
            backgroundColor: task.completed ? '#D9E4F4' : 'white',
            borderRadius: '16px',
            marginBottom: '16px',
            border: '1px solid #E7EFFA',
            direction: 'rtl',
            width: '80%',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden', 
            marginTop: '16px'
        }}>
            <div style={{
                height: '100%',
                width: '16px',
                backgroundColor: 'red',
                borderRadius: '0 16px 16px 0',
                position: 'absolute',
                right: '0',
                top: '0'
            }} />
            <div style={{
                 height: '16px',
                 width: '16px',
                 border: '2px solid #0C8CE9',
                 backgroundColor: task.completed ? '#0C8CE9' : 'transparent',
                 borderRadius: '50%',
                 position: 'absolute',
                 right: '4px',
                 top: '50%',
                 transform: 'translateY(-50%)'
            }}
            />
            <div>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0C8CE9', margin: '0' }}>{task.title}</h4>
                <p style={{ fontSize: '14px', color: '#0C8CE9', margin:'0' }}>{task.description}</p>
                <p style={{ fontSize: '14px' }}>{task.location} <br /> {task.urgency}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }} >
                    <SecButton disabled={!task.completed} btntxt="השאר חוות דעת" active={task.completed}/>
                    <SecButton onClick={() => handleComplete(task.id)} btntxt={task.completed ? "שחזר" : "בוצע"} active={!task.completed}/>
                </div>
            </div>
        </div>
        ))}
        </>
    )
}
