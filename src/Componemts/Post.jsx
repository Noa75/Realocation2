import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { UserContext } from "./UserHook";

export default function Post() {
  const { userDetails } = useContext(UserContext); // קבלת המידע על המשתמש מהקונטקסט
  console.log(userDetails);
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "This is the first post.",
      user: "user1",
      comment_to: null,
    },
    {
      id: 2,
      content: "This is a comment on the first post.",
      user: "user2",
      comment_to: 1,
    },
    {
      id: 3,
      content: "Another post from user3.",
      user: "user3",
      comment_to: null,
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);
  const [commentTo, setCommentTo] = useState([]);

  const openCommentTo = (id) => {
    const comment_to = comments.filter((c) => c.comment_to == id);
    // setCommentTo(comment_to);
  };
  const sendComment = () => {
    const newId = comments.length + 1;
    const updatedComments = [
      ...comments,
      { id: newId, user: "משתמש חדש", content: newComment },
    ];
    setComments(updatedComments);
    setNewComment(""); // Clear input after sending
  };

  return (
    <>
      <div
        style={{
          padding: "24px 16px",
          backgroundColor: "white",
          margin: "16px 0",
          borderRadius: "16px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Avatar
            style={{ marginLeft: "16px" }}
            src="/static/images/avatar/1.jpg"
          />
          <ListItemText
            style={{ marginRight: "8px", textAlign: "right", margin: "0" }}
            primary="שם משתמש"
            secondary="תוכן הפוסט"
          />
        </div>
        <Button style={{ display: "flex", justifyContent: "flex-start" }}>
          לכל התגובות
        </Button>
        <List style={{ padding: "0" }}>
          {comments
            .filter((c) => c.comment_to == null)
            .map((comment) => (
              <ListItem
                onClick={() => {
                  openCommentTo(comment.id);
                }}
                key={comment.id}
                style={{ padding: "0" }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  style={{ textAlign: "right" }}
                  primary={comment.user}
                  secondary={comment.content}
                />
              </ListItem>
            ))}
        </List>
        <Grid container spacing={1} style={{ margintop: "8xp" }}>
          <Grid item xs={9}>
            <TextField
              placeholder="הוסף תגובה"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                padding: "8px 16px",
                backgroundColor: "#0C8CE9",
                color: "white",
                borderRadius: "40px",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
              }}
              onClick={sendComment}
            >
              שלח
            </Button>
          </Grid>
        </Grid>
        {commentTo.length > 0 && (
          <Dialog
            open={open}
            onClose={setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {commentTo.map((comment) => (
              <ListItem
                onClick={() => {
                  openCommentTo(comment.id);
                }}
                key={comment.id}
                style={{ padding: "0" }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  style={{ textAlign: "right" }}
                  primary={comment.user}
                  secondary={comment.content}
                />
              </ListItem>
            ))}
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>{" "}
    </>
  );
}
