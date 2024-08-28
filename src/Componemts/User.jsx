import React, { useContext, useState } from "react";
import { UserContext } from "./UserHook";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  Divider,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Navbar from "./Navbar";
import SecButton from "./SecButton";

function UserProfile() {
  const initialCategories = [
    { id: 1, image: "public/animals.png", label: "בעלי חיים" },
    { id: 2, image: "public/flight.png", label: "טיסה" },
    { id: 3, image: "public/working.png", label: "עבודה" },
    { id: 4, image: "public/doctor.png", label: "בריאות" },
    { id: 5, image: "public/home.png", label: "מגורים" },
    { id: 6, image: "public/beer.png", label: "פנאי" },
    { id: 7, image: "public/classroom.png", label: "חינוך ילדים" },
    { id: 8, image: "public/truck.png", label: "הובלה" },
    { id: 9, image: "public/student.png", label: "חינוך בוגרים" },
    { id: 10, image: "public/shild.png", label: "ביטוחים" },
    { id: 11, image: "public/car.png", label: "רכב" },
    { id: 12, image: "public/friends.png", label: "קהילות" },
  ];
  const { userDetails } = useContext(UserContext);
  console.log(userDetails);
  const [DestinationCountry, set_DestinationCountry] = useState(
    userDetails &&
      userDetails.DestinationCountry &&
      userDetails.DestinationCountry.label
      ? userDetails.DestinationCountry.label
      : ""
  );
  const [have_kids, set_have_kids] = useState(
    userDetails && userDetails.HasChildren ? userDetails.HasChildren : ""
  );
  const [categories, setCategories] = useState(
    userDetails && userDetails.SelectedCategories
      ? userDetails.SelectedCategories
      : []
  );

  const set_date_to_input = (date) => {
    const dateObject = date ? new Date(date) : new Date();

    // Extract the year, month, and day
    const year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1; // Months are zero-indexed
    let day = dateObject.getDate();

    // Pad month and day with leading zeros if necessary
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  };
  const [moveDate, set_moveDate] = useState(
    set_date_to_input(
      userDetails && userDetails.moveDate && userDetails.moveDate
        ? moveDate
        : null
    )
  );
  const setSelectedCountry = (e, newValue) => {
    setCategories(newValue);
  };
  const handleClick = () => {
    const data={
        UserId:userDetails.UserId,
        MoveDate:moveDate,
        DestinationCountry:DestinationCountry,
        have_kids:have_kids
  }
  console.log('data',data)

};
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar style={{ width: 120, height: 120, marginBottom: '0' }} />
        <h4 style={{margintop:'0', marginBottom: '0'}}>אורן</h4>
        <p>{`9 משימות שבוצעו מתוך 8`}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <Stack
          direction="column"
          dir="rtl"
          textAlign="right"
          spacing={2}
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            marginTop: 2,
          }}
        >
          <List component="nav" aria-label="mailbox folders" style={{backgroundColor: '#F4F7FB'}}>
            <ListItem>
              <p>מדינת יעד:</p> 
              <TextField onChange={(e)=>{set_DestinationCountry(e.target.value)}} value={DestinationCountry} />
            </ListItem>
            <Divider />
            <ListItem divider>
              <p>תאריך היעד: </p>
              <input
                onChange={(e) => {
                  set_moveDate(e.target.value);
                }}
                type="date"
                value={moveDate}
              />
            </ListItem>
            <ListItem>
              <p>האם יש ילדים: </p>
              <input
                type="checkbox"
                checked={have_kids}
                onChange={(e) => {
                  set_have_kids(e.target.value);
                }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <p>קטגוריות שנבחרו: </p>
              <Autocomplete
                options={initialCategories}
                multiple={true}
                value={categories}
                onChange={setSelectedCountry}
                renderInput={(params) => (
                  <TextField {...params} label="categories" />
                )}
              />
            </ListItem >
          </List>
        </Stack>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        <SecButton
        btntxt="שמור"
        active={false}
            onClick={() => {
              handleClick();
            }}
          >
          </SecButton>
          </div>
        <Navbar />
      </div>
    </div>
  );
}

export default UserProfile;
