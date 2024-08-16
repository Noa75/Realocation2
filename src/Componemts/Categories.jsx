import React, { useContext, useState, useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import CategoryItem from './CategoryItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrimeButton from './PrimeButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { Category, SignalWifiStatusbarConnectedNoInternet4Rounded } from '@mui/icons-material';
import { UserContext } from './UserHook';
import { baseURL } from '../Utils';


export default function Categories() {
  const url = baseURL();
  const navigate = useNavigate();
  const [active, setActive] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const initialCategories = [
    { id: 1, image:"public/animals.png", label: "בעלי חיים" },
    { id: 2, image:"public/flight.png", label: "טיסה" },
    { id: 3, image:"public/working.png", label: "עבודה" },
    { id: 4, image:"public/doctor.png", label: "בריאות" },
    { id: 5, image:"public/home.png", label: "מגורים" },
    { id: 6, image:"public/beer.png", label: "פנאי" },
    { id: 7, image:"public/classroom.png", label: "חינוך ילדים" },
    { id: 8, image:"public/truck.png", label: "הובלה" },
    { id: 9, image:"public/student.png", label: "חינוך בוגרים" },
    { id: 10, image:"public/shild.png", label: "ביטוחים" },
    { id: 11, image:"public/car.png", label: "רכב" },
    { id: 12, image:"public/friends.png", label: "קהילות" }
  ];
  const[categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    console.log(userDetails);
    if (!userDetails) {
      navigate('/');
    }
    else{
      const filteredCategories = userDetails.hasChildren
      ? initialCategories
      : initialCategories.filter(Category => Category.label !== "חינוך ילדים");
      setCategories(filteredCategories);
      console.log(filteredCategories, userDetails.hasChildren)
    }
  }, [userDetails, navigate])

  const SaveCateegories = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "UserId": userDetails.userId,
  "SelectedCategories": active 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw
};

fetch(`${url}UserCategories`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result.userId)
    setUserDetails(prev => ({ ...prev, userId: result.userId }));
    navigate('/tasks-board', { state: {
      userId: result.userId,
      selectedCategories: active,
      hasChildren: userDetails.hasChildren
    } }
  );
  })
  .catch((error) => console.error(error));
  }

  const toggleActive = (id) => {
    setActive(currentActive => {
      if (currentActive.includes(id)) {
        return currentActive.filter(item => item !== id);
      }
      else {
        return [...currentActive, id];
      }
    });
    
  };
  return (
    <div className='Categories-container'>
      <div className='stepIndicator' dir='rtl' >
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot active'></div>
                <div className='dot'></div>
            </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: ' 0 16px' }}>
        <IconButton onClick={() => navigate(-1)} style={{ transform: 'scaleX(-1)', left: '280px' }}>
          <ArrowBackIcon />
        </IconButton>
        <h4 style={{ textAlign: 'center' }}>בחירת נושאי משימות </h4>
      </div>
      <Grid container direction="row-reverse" justifyContent="center" spacing={0.5}>
        {categories.map(Category => (
          <Grid key={Category.id} item xs={4}>
            <CategoryItem
            image={Category.image}
            label={Category.label}
            active={active.includes(Category.id)}
            onClick={() => toggleActive(Category.id)} />
          </Grid >
        ))}
      </Grid>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <PrimeButton onClick={SaveCateegories} btntxt="הבא" />
      </div>
    </div>
  );
}
