import React from 'react'
import { Grid, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrimeButton from './PrimeButton';
import Navbar from './Navbar';

export default function NewPost() {
  return (
    <div style={{padding: '16px', height: '88vh'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <IconButton onClick={() => navigate(-1)} style={{ transform: 'scaleX(-1)', position: 'absolute', left: '320px' }}>
          <ArrowBackIcon />
        </IconButton>
        <h4 style={{ textAlign: 'center' }}>שיתוף פוסט</h4>
      </div>
      <TextField
        fullWidth
        multiline
        rows={8}
        placeholder="מה היית רוצה לשתף?"
        variant="outlined"
        style={{ marginBottom: '24px', direction: 'rtl' }}
      />
      <PrimeButton btntxt="פרסם"/>
      <Navbar />
    </div>
  )
}
