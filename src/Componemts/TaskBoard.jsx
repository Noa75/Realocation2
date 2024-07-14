import React, { useState, useContext, useEffect } from 'react'
import Task from './Task'
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ArrowBack, FormatTextdirectionLToROutlined } from '@mui/icons-material';
import ChipButton from './ChipButton';
import Navbar from './Navbar';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserHook';
import { isLocalhost } from '../Utils';

const url = isLocalhost?"http://localhost:5231/api/":"proj.ruppin.ac.il/bgroup30/test2"

export default function TaskBoard() {
    
    const [task, setTask] = useState();
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [tasksBefore, setTasksBefore] = useState([]);
    const [tasksAfter, setTasksAfter] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const location = useLocation();
    const selectedCategories = location.state.selectedCategories;
    const allCategories = [
        { id: 1, name: 'בעלי חיים'},
        { id: 2, name: 'טיסה'},
        { id: 3, name: 'עבודה'},
        { id: 4, name: 'בריאות'},
        { id: 5, name: 'מגורים'},
        { id: 6, name: 'פנאי'},
        { id: 7, name: 'חינוך ילדים'},
        { id: 8, name: 'הובלה'},
        { id: 9, name: 'חינוך בוגרים'},
        { id: 10, name: 'ביטוחים'},
        { id: 11, name: 'רכב'},
        { id: 12, name: 'קהילות'}
    ]
    const filteredCategories = allCategories.filter(cat => location.state.selectedCategories.includes(cat.id));

    useEffect(() => {
        if (filteredCategories.length > 0 && !selectedOption) {
            setSelectedOption(filteredCategories[0].id)
        }
    },[filteredCategories, selectedOption])

    const handleButton = (categoryId) => {
        console.log("changing:", categoryId);
        setSelectedOption(categoryId);
        
    }

    useEffect (() => {
        if (selectedOption && userDetails.userId) {
            fetchTasks(selectedOption, true);
            fetchTasks(selectedOption, false);
        }
    }, [selectedOption, userDetails.userId]);

    const fetchTasks = (categoryId, isBeforeMove) => {
        const urlSuffix = isBeforeMove ? "true" : "false";
        console.log("Fetching tasks for category:", selectedOption);
            const requestOptions = {
  method: "GET",
  redirect: "follow"
};


fetch(`${url}UserCategories/tasks/user/${userDetails.userId}/${urlSuffix}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    const releventTasks = result.filter(task => task.categoryId === selectedOption);
    isBeforeMove ? setTasksBefore(releventTasks) : setTasksAfter(releventTasks);
    console.log(releventTasks);
  })
  .catch((error) => console.error(error));
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
                    {filteredCategories.map(category => (
                        <ChipButton 
                            key={category.id}
                            txt={category.name}
                            onClick={() => handleButton(category.id)} active={selectedOption === category.id}
                        />
                    ))}
                </Stack>
            </div>
            <div className='taskrec'>
                <h3 style={{ width: '100%', fontSize: '18px', textAlign: 'right', fontWeight: '300' }}>לפני</h3>
                {tasksBefore.map(task => (
                    <Task 
                        key={task.taskId}  
                        date="20.1"
                        label={task.recommendedTask}
                        description="asc"
                        onDelete={() => deleteTask(task.taskId)}
                    />
                ))}     
            </div>
            <div className='taskrec'>
                <h3 style={{ fontSize: '18px', float: 'right', fontWeight: '300' }}>אחרי</h3>
                
                {tasksAfter.map(task => (
                    <Task 
                        key={task.taskId}  
                        date="20.1"
                        label={task.recommendedTask}
                        description="asc"
                        onDelete={() => deleteTask(task.taskId)}
                    />
                ))}     

 </div>
            <Stack spacing={1} direction='column' sx={{ width: '50%', margin: 'auto' }}>
                <SecButton btntxt="הוספת משימה חדשה" >
                    {<AddIcon />}
                </SecButton>
                <Link to="/edit-task"><PrimeButton btntxt="הבא" /></Link>
            </Stack>
            <Navbar />
        </div>


    )
}
