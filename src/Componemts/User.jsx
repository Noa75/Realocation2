import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserHook";
import { Avatar, List, ListItem, Divider, TextField, Autocomplete } from "@mui/material";
import Stack from "@mui/material/Stack";
import Navbar from "./Navbar";
import SecButton from "./SecButton";
import { baseURL } from '../Utils';
import { getLocalStorage, setLocalStorage } from '../utils/functions';

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
  const url = baseURL();
  const userId = getLocalStorage("currentUser");
  const [DestinationCountry, set_DestinationCountry] = useState("");
  const [have_kids, set_have_kids] = useState(false);
  const [categories, setCategories] = useState([]);
  const [moveDate, set_moveDate] = useState("");

  const mapCategoriesFromServer = (categoriesFromServer) => {
    return categoriesFromServer.map(cat => ({
      id: cat.categoryId,
      label: cat.categoryName
    }));
  };

  const set_date_to_input = (date) => {
    const dateObject = date ? new Date(date) : new Date();
    const year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`${url}UserDetails/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        set_DestinationCountry(result.relocationDetails.destinationCountry || "");
        set_have_kids(result.relocationDetails.hasChildren || false);
        set_moveDate(set_date_to_input(result.relocationDetails.moveDate || ""));
        setCategories(mapCategoriesFromServer(result.categories || []));
      })
      .catch((error) => console.error(error));
  }

  const setSelectedCountry = (e, newValue) => {
    setCategories(newValue);
  };

  const handleClick = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(categories)
    const raw = JSON.stringify({
      "DestinationCountry": DestinationCountry,
      "MoveDate": moveDate,
      "HasChildren": have_kids,
      "SelectedCategories": categories.map(category => category.id)
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${url}details/update-relocation-details-and-categories/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        const user = getLocalStorage(userId);
        user.selected_country.label = DestinationCountry;
        user.moveDate = moveDate;
        user.have_kids = have_kids;
        user.category_active = categories.map(category => category.id)
        setLocalStorage(userId, user);
      })
      .catch((error) => { console.error(error) });

  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh' }} >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar style={{ width: 120, height: 120, marginBottom: '0' }} />
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
          <List component="nav" aria-label="mailbox folders" style={{ backgroundColor: '#F4F7FB' }}>
            <ListItem>
              <p>מדינת יעד:</p>
              <TextField onChange={(e) => { set_DestinationCountry(e.target.value) }} value={DestinationCountry} />
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
                  set_have_kids(e.target.checked);
                }}
              />
            </ListItem>
            <Divider />
            <ListItem style={{ textAlign: 'right' }}>
              <p>קטגוריות שנבחרו: </p>
              <Autocomplete
                options={initialCategories}
                multiple={true}
                value={categories}
                onChange={setSelectedCountry}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="categories" />
                )}
              />
            </ListItem >
          </List>
        </Stack>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
