import React, { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import CategoryItem from './CategoryItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrimeButton from './PrimeButton';
import { Link } from 'react-router-dom';
import { Category } from '@mui/icons-material';
import { UserContext } from './UserHook';
import { isLocalhost } from '../Utils';


export default function Categories() {
  const [active , setActive] = useState([]);
  const {userDetails, setUserDetails} = useContext(UserContext);

  
  const toggleActive = (label) => {
    if (active.includes(label)){
      setActive(active.filter(item => item !== label));
    }
    else{
      setActive([...active, label])
    }
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
          <CategoryItem image="public/animals.png" label="בעלי חיים" active={active.includes("בעלי חיים")} onClick={() => toggleActive("בעלי חיים")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/flight.png" label="טיסה" active={active.includes("טיסה")} onClick={() => toggleActive("טיסה")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/working.png" label="עבודה" active={active.includes("עבודה")} onClick={() => toggleActive("עבודה")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/doctor.png" label="בריאות" active={active.includes("בריאות")} onClick={() => toggleActive("בריאות")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/home.png" label="מגורים" active={active.includes("מגורים")} onClick={() => toggleActive("מגורים")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/beer.png" label="פנאי" active={active.includes("פנאי")} onClick={() => toggleActive("פנאי")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/classroom.png" label="חינוך ילדים" active={active.includes("חינוך ילדים")} onClick={() => toggleActive("חינוך ילדים")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/truck.png" label="הובלה" active={active.includes("הובלה")} onClick={() => toggleActive("הובלה")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/student.png" label="חינוך בוגרים" active={active.includes("חינוך בוגרים")} onClick={() => toggleActive("חינוך בוגרים")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/shild.png" label="ביטוחים" active={active.includes("ביטוחים")} onClick={() => toggleActive("ביטוחים")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/car.png" label="רכב" active={active.includes("רכב")} onClick={() => toggleActive("רכב")} /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/friends.png" label="קהילות" active={active.includes("קהילות")} onClick={() => toggleActive("קהילות")} /></Grid>
      </Grid>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <Link to={"/tasks-board"}><PrimeButton btntxt="הבא" /></Link>
      </div>
    </div>
  );
}
