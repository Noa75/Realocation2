import React, { useContext, useState, useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import CategoryItem from './CategoryItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrimeButton from './PrimeButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { Category } from '@mui/icons-material';
import { UserContext } from './UserHook';
import { isLocalhost } from '../Utils';

const url = isLocalhost ? "http://localhost:5231/api/" : "proj.ruppin.ac.il/bgroup30/test2"

export default function Categories() {
  const navigate = useNavigate();
  const [active, setActive] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!userDetails) {
      navigate('/');
    }
  }, [])

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
      selectedCategories: active
    } }
  );
  })
  .catch((error) => console.error(error));
  }

  const toggleActive = (id) => {
    if (active.includes(id)) {
      setActive(active.filter(id => id !== id));
    }
    else {
      setActive([...active, id])
    }
    console.log(id,active)
  };
  return (
    <div className='Categories-container'>
      <div style={{ display: 'flex', alignItems: 'center', padding: ' 0 16px' }}>
        <IconButton style={{ transform: 'scaleX(-1)', left: '270px' }}>
          <ArrowBackIcon />
        </IconButton>
        <h4 style={{ textAlign: 'center' }}>בחירת נושאי משימות </h4>
      </div>
      <Grid container direction="row-reverse" justifyContent="center" spacing={1}>
        <Grid item xs={4}>
          <CategoryItem image="public/animals.png" label="בעלי חיים" active={active.includes(1)} onClick={() => toggleActive(1)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/flight.png" label="טיסה" active={active.includes(2)} onClick={() => toggleActive(2)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/working.png" label="עבודה" active={active.includes(3)} onClick={() => toggleActive(3)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/doctor.png" label="בריאות" active={active.includes(4)} onClick={() => toggleActive(4)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/home.png" label="מגורים" active={active.includes(5)} onClick={() => toggleActive(5)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/beer.png" label="פנאי" active={active.includes(6)} onClick={() => toggleActive(6)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/classroom.png" label="חינוך ילדים" active={active.includes(7)} onClick={() => toggleActive(7)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/truck.png" label="הובלה" active={active.includes(8)} onClick={() => toggleActive(8)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/student.png" label="חינוך בוגרים" active={active.includes(9)} onClick={() => toggleActive(9)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/shild.png" label="ביטוחים" active={active.includes(10)} onClick={() => toggleActive(10)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/car.png" label="רכב" active={active.includes(11)} onClick={() => toggleActive(11)} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/friends.png" label="קהילות" active={active.includes(12)} onClick={() => toggleActive(12)} /></Grid>
      </Grid>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <PrimeButton onClick={SaveCateegories} btntxt="הבא" />
      </div>
    </div>
  );
}
