import React, { useContext } from 'react';
import { UserContext } from './UserHook';
import { Avatar, Typography, List, ListItem, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Navbar from './Navbar';

function UserProfile() {
    const { userDetails } = useContext(UserContext);

    return (
        <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <Avatar style={{ width: 120, height: 120}} />
            <h4>אורן</h4>
            <p>{`9 משימות שבוצעו מתוך 8`}</p>
        </div>
        <div style={{textAlign:'right'}}>
            <Stack direction="column" dir="rtl" textAlign="right" spacing={2} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: 2 }}>
                <List component="nav" aria-label="mailbox folders">
                    <ListItem>
                        <p>מדינת יעד: אוסטרליה</p>
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <p>תאריך היעד: 22/3</p>
                    </ListItem>
                    <ListItem>
                        <p>האם יש ילדים: כן</p>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <p>קטגוריות שנבחרו: בעלי חיים</p>
                    </ListItem>
                </List>
            </Stack>
            <Navbar />
            </div>
        </div>
    );
}

export default UserProfile;
