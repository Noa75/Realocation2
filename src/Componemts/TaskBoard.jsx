import React, { useState, useContext, useEffect } from 'react'
import Task from './Task'
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ArrowBack, FormatTextdirectionLToROutlined } from '@mui/icons-material';
import ChipButton from './ChipButton';
import Navbar from './Navbar';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserHook';
import { baseURL } from '../Utils';


export default function TaskBoard() {
    const navigate = useNavigate();
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
    const url = baseURL();

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
        const urlSuffix = isBeforeMove ? "false" : "true";
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

    const deleteTask = (taskId, isBeforeMove) => {
        if (isBeforeMove) {
            setTasksBefore(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
        } else {
            setTasksAfter(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
        }
    };
    console.log(tasksBefore, tasksAfter)

    const SaveTasks = () => {
        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const taskToSave = [...tasksBefore, ...tasksAfter];

const raw = JSON.stringify({
  "UserId": userDetails.userId,
  "TaskId": task.TaskId,
  "TaskName": task.RecommendedTask,
  "TaskDescription": task.DescriptionTask,
  "IsRecommended": true,
  "IsDeleted": false,
  "CreatedAt": new Date(),
  "SelectedCategories": filteredCategories.map(cat => cat.id)
});
console.log(raw)

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw
};

fetch(`${url}/UserCategories`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    // navigate('/home')
  })
  .catch((error) => console.error(error));
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
                        description={task.descriptionTask}
                        onDelete={() => deleteTask(task.taskId, true)}
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
                        description={task.descriptionTask}
                        onDelete={() => deleteTask(task.taskId, false)}
                    />
                ))}     

 </div>
            <Stack spacing={1} direction='column' sx={{ width: '50%', margin: 'auto' }}>
                <SecButton btntxt="הוספת משימה חדשה" >
                    {<AddIcon />}
                </SecButton>
                <PrimeButton onClick={SaveTasks} btntxt="הבא" />
            </Stack>
            <Navbar />
        </div>


    )
}
