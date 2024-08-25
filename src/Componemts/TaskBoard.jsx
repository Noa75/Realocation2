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


export default function TaskBoard(props) {
    const {userData} = props

    const navigate = useNavigate();
    const [task, setTask] = useState();
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [tasksBefore, setTasksBefore] = useState([]);
    const [tasksAfter, setTasksAfter] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const hasChildren = userData.HasChildren;
    const selectedCategories = userData.SelectedCategories;
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const allCategories = [
        { id: 1, name: 'בעלי חיים' },
        { id: 2, name: 'טיסה' },
        { id: 3, name: 'עבודה' },
        { id: 4, name: 'בריאות' },
        { id: 5, name: 'מגורים' },
        { id: 6, name: 'פנאי' },
        { id: 7, name: 'חינוך ילדים' },
        { id: 8, name: 'הובלה' },
        { id: 9, name: 'חינוך בוגרים' },
        { id: 10, name: 'ביטוחים' },
        { id: 11, name: 'רכב' },
        { id: 12, name: 'קהילות' }
    ]
    const filteredCategories = allCategories.filter(cat => selectedCategories.includes(cat.id));
    const url = baseURL();

    const addNewTask = () => {
        // Navigate to the EditTask component with initial empty data for creating a new task
        navigate('/edit-task', { state: { task: { recommendedTask: "כותרת משימה", descriptionTask: "תיאור משימה" } } });
    };
 

    useEffect(() => {
            fetchTasks();
    }, []);

    useEffect(() => {
        if (filteredCategories.length > 0 && !selectedOption) {
            setSelectedOption(filteredCategories[0].id)
        }
    }, [])
   

    const handleButton = (categoryId) => {
        console.log("changing:", categoryId);
        setSelectedOption(categoryId);

    }

    useEffect(() => {
        if (selectedOption && userDetails.userId) {
            fetchTasks(selectedOption);
        }
    }, [selectedOption]);
    console.log(selectedOption);


    const fetchTasks = (selectedOption) => {
        console.log("Fetching tasks for category:", selectedOption, " with children: ", hasChildren);

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${url}UserTasks/tasks/user/${userDetails.userId}/final`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const releventTasks = result.filter(task => {
                    const categoryMatch = task.categoryId === selectedOption;
                    const notDeleted = !task.IsDeleted;
                    return categoryMatch && notDeleted;
            });
            
            setTasksBefore(releventTasks.filter(task => task.isBeforeMove)); // אם יש תכונה כזו
            setTasksAfter(releventTasks.filter(task => !task.isBeforeMove)); 
            })
            .catch((error) => console.error(error));
    }

    const deleteTask = (taskId, isBeforeMove) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = {
            "userTaskId": userDetails.userId,
            "TaskId": taskId,
            "IsDelete": true
        };

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${url}UserTasks/${userDetails.userId}/task/${taskId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("task deleted:", result)
                const updateTasks = (tasks) => tasks.filter(task => task.taskId !== taskId);
                if (isBeforeMove) {
                    setTasksBefore(updateTasks);
                } else {
                    setTasksAfter(updateTasks);
                }

            })
            .catch((error) => console.error(error));
    }


    const handleTaskClick = (task) => {
        console.log(task)
        navigate('/edit-task/${taskId}', { state: { task } });
    }

    return (
        <div className='taskboard-container' >
            <div className='stepIndicator' dir='rtl' >
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot active'></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={() => navigate(-1)} style={{ transform: 'scaleX(-1)', left: '240px' }}>
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
                <h3 style={{ width: '100%', fontSize: '18px', textAlign: 'right', fontWeight: '300', fontWeight: 'bold' }}>לפני המעבר</h3>
                {tasksBefore.map((task, index) => (
                    <Task onClick={() => handleTaskClick(task)}
                        key={`${task.taskId}-${index}`}
                        date={(task.daysToComplete)}
                        label={task.taskName}
                        description={task.taskDescription
                        }
                        onDelete={() => deleteTask(task.taskId, true)}
                    />
                ))}
            </div>
            <div className='taskrec'>
                <h3 style={{ fontSize: '18px', float: 'right', fontWeight: '300', fontWeight: 'bold' }}>אחרי המעבר</h3>

                {tasksAfter.map((task, index) => (
                    <Task onClick={() => handleTaskClick(task)}
                        key={`${task.taskId}-${index}`}
                        date={task.daysToComplete}
                        label={task.recommendedTask}
                        description={task.descriptionTask}
                        onDelete={() => deleteTask(task.taskId, false)}
                    />
                ))}

            </div>
            <Stack spacing={1} direction='column' sx={{ width: '70%', margin: 'auto' }}>
                <SecButton btntxt="הוספת משימה חדשה" onClick={addNewTask} >
                    {<AddIcon />}
                </SecButton>
                <PrimeButton btntxt="הבא" />
            </Stack>
            {userDetails.userId === "true" ? <Navbar /> : null}
        </div>


    )
}
