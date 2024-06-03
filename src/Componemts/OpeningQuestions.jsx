import './Realocation.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PrimeButton from './PrimeButton';
import SecButton from './SecButton';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';


function OpeningQuestions() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');


    return (
        <div className='OQ-container' style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: ' 0 16px' }}>
                <IconButton style={{ transform: 'scaleX(-1)', left: '270px' }}>
                    <ArrowBackIcon />
                </IconButton>
                <h4 style={{ textAlign: 'center' }}>שאלות לדיוק התהליך</h4>
            </div>
            <Stack spacing={4}>
                <TextField id="descountry"
                    label="לאן המעבר"
                    variant="outlined" />
                <div>
                    <p style={{ textAlign: 'right' }}>מתי המעבר</p>
                    <Grid container spacing={1} justifyContent={'center'} alignItems="center">
                        <Grid item xs={4}>
                            <TextField fullWidth id="year"
                                label="שנה" type="number"
                                variant="outlined" name="year" value={year}
                                onChange={(e) => setYear(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth id="month"
                                label="חודש" type="number"
                                variant="outlined" name="month" value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                inputProps={{ min: 1, max: 12 }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth id="day"
                                label="יום" type="number"
                                variant="outlined" name="day" value={day}
                                onChange={(e) => setDay(e.target.value)}
                                inputProps={{ min: 1, max: 31 }} />
                        </Grid>
                    </Grid>
                </div>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={3.5}>
                        <SecButton btntxt="לא" /></Grid>
                    <Grid item xs={3.5}>
                        <SecButton btntxt="כן" /></Grid>
                    <Grid item xs={5}>
                        <p>?האם יש לך ילדים</p></Grid>
                </Grid>
            </Stack>
            <Link to={"/categoies"}><PrimeButton btntxt="הבא" /></Link>
        </div>
    )
}

export default OpeningQuestions;