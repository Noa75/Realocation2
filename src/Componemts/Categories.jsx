import React from 'react'
import { Grid, IconButton, Button } from '@mui/material';
import CategoryItem from './CategoryItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrimeButton from './PrimeButton';
import { Link } from 'react-router-dom';



export default function Categories() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: ' 0 16px' }}>
        <IconButton style={{ transform: 'scaleX(-1)', left: '270px' }}>
          <ArrowBackIcon />
        </IconButton>
        <h4 style={{ textAlign: 'center' }}>בחירת נושאי משימות </h4>
      </div>
      <Grid container direction="row-reverse" justifyContent="center" spacing={1}>
        <Grid item xs={4}>
          <CategoryItem image="public/animals.png" label="בעלי חיים" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/flight.png" label="טיסה" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/working.png" label="עבודה" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/doctor.png" label="בריאות" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/home.png" label="מגורים" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/beer.png" label="פנאי" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/classroom.png" label="חינוך ילדים" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/truck.png" label="הובלה" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/student.png" label="חינוך בוגרים" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/shild.png" label="ביטוחים" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/car.png" label="רכב" /></Grid>
        <Grid item xs={4}>
          <CategoryItem image="public/friends.png" label="קהילות" /></Grid>
      </Grid>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <Link to={"tasks-board"}><PrimeButton btntxt="הבא" /></Link>
      </div>
    </div>
  );
}
