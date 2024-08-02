import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import PrimeButton from './PrimeButton';

export default function Post() {
  
  const [comments, setComments] = useState([
    { id: 1, user: "משתמש 1", content: "תגובה ראשונה" },
    { id: 2, user: "משתמש 2", content: "תגובה שנייה" }
  ]);
  const [newComment, setNewComment] = useState("");

  const sendComment = () => {
    const newId = comments.length + 1;
    const updatedComments = [...comments, { id: newId, user: "משתמש חדש", content: newComment }];
    setComments(updatedComments);
    setNewComment(""); // Clear input after sending
  };

  return (
    <div style={{padding: '24px 16px', backgroundColor: 'white', margin: '16px 0', borderRadius: '16px'}}>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <Avatar style={{ marginLeft: '16px' }} src="/static/images/avatar/1.jpg" />
            <ListItemText style={{marginRight: '8px', textAlign: 'right', margin: '0'}} primary="שם משתמש" secondary="תוכן הפוסט" />
        </div>
        <Button style={{display: 'flex', justifyContent: 'flex-start'}}>לכל התגובות</Button>
        <List style={{padding: '0'}}>
            {comments.map(comment => (
              <ListItem key={comment.id} style={{padding: '0'}}>
                <ListItemAvatar>
                <Avatar />
                </ListItemAvatar>
                <ListItemText style={{textAlign: 'right'}} primary={comment.user} secondary={comment.content} />
              </ListItem>
            ))}
        </List>
        <Grid container spacing={1} style={{margintop:'8xp'}}>
          <Grid item xs={9}>
        <TextField
          placeholder="הוסף תגובה"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        </Grid>
        <Grid item xs={3}>
        <Button style={{
          padding: '8px 16px',
          backgroundColor: '#0C8CE9',
          color: 'white',
          borderRadius: '40px',
          fontSize:'16px',
          fontWeight: 'bold',
          textAlign: 'center',
          }} onClick={sendComment}>שלח</Button>
        </Grid>
        </Grid>
    </div>
  )
}
