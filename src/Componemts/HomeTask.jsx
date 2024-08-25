import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';
import { de } from 'date-fns/locale';


export default function HomeTask({tasks}) {
    const [task, setTask] = useState();

    const handleComplete = (taskId) => {
        console.log("before", tasks);
        setTask(tasks.map(task => {
            if (taskId === task.userTaskId) {
                console.log(taskId);
                return { ...task, completed: !task.completed};
            }
            return task;
        }))
    };

    const urgencyColor = (urgency) => {
        switch (urgency) {
            case 1: return '#E55C5C';
            case 2: return '#E5E05C';
            case 3: return '#67E55C';
            default: return 'grey';
        }
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
                backgroundColor: urgencyColor(task.priority),
                borderRadius: '0 16px 16px 0',
                position: 'absolute',
                right: '0',
                top: '0'
            }} />
            <div style={{textAlign: 'right'}}>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: task.completed ?'gray': '#0C8CE9', margin: '0' }}>{task.taskName}</h4>
                <p style={{ fontSize: '14px', color: task.completed ?'gray':'#0C8CE9', margin:'0' }}>{task.taskDescription}</p>
                <p style={{ fontSize: '14px' }}> עד {task.endDate}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }} >
                    <SecButton disabled={!task.completed} btntxt="השאר חוות דעת" active={task.completed}/>
                    <SecButton onClick={() => handleComplete(task.userTaskId)} btntxt={task.completed ? "שחזר" : "בוצע"} active={!task.completed}/>
                </div>
            </div>
        </div>
        ))}
        </>
    )
}
