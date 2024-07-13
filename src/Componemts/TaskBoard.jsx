import React, { useState, useContext, useEffect } from 'react'
import Task from './Task'
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ArrowBack } from '@mui/icons-material';
import ChipButton from './ChipButton';
import Navbar from './Navbar';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserHook';
import { isLocalhost } from '../Utils';

const url = isLocalhost?"http://localhost:5231/api/":"proj.ruppin.ac.il/bgroup30/test2"

export default function TaskBoard() {
    const [selectedOption, setSelectedOption] = useState('בית ספר');
    const [task, setTask] = useState();
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);

    
    
    const location = useLocation();
    const selectedCategories = location.state.selectedCategories;
    console.log(location)

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
    console.log(filteredCategories)

    useEffect (() => {
        if (selectedOption && userDetails.userId) {
            const raw = "";

const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch(`${url}UserCategories/tasks/user/${userDetails.userId}/true`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
        }
    },[selectedOption, userDetails.userId])

    const handleButton = (selection) => {
        setSelectedOption(selection);
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
                            onClick={() => handleButton(category.name)} active={selectedOption === category.name}
                        />
                    ))}
                </Stack>
            </div>
            <div className='taskrec'>
                <h3 style={{ width: '100%', fontSize: '18px', textAlign: 'right', fontWeight: '300' }}>לפני</h3>


                {tasks.filter(task => task.isBeforeMove).map(task => (
                    <Task 
                        key={task.id}
                        date={task.date}
                        label={task.label}
                        description={task.description}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))}


                {/* <Task date="17.1" label="מציאת בית ספר" description="בדוק בין האופציות השונות באזורך החדש" onDelete={deleteTask} />
                <Task date="20.1" label="בדיקת תכני לימוד" description="עיין בתכנית הלימודים ובדוק התאמה" />
                <Task date="21.1" label="סיור וירטואלי בבית הספר" description="הכר מראש את הבית הספר" />
                <Task date="30.1" label="ביצוע הרשמה" description="השלם את תהליך ההרשמה ואסוף את המסמכים הנדרשים" /> */}



            </div>
            <div className='taskrec'>
                <h3 style={{ fontSize: '18px', float: 'right', fontWeight: '300' }}>אחרי</h3>
                <Task date="5.8" label="בדיקת הסעות לבית הספר" description="בדיקת מרחק וסרכי הגעה לבית הספר" />
                <Task date="5.8" label="התאמת ציוד לימודי" description="רכישת ציוד נדרש לשנה החדשה" />
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
