import  React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { isLocalhost, Translate } from '../Utils';

const url = isLocalhost ? "http://localhost:5231/api/" : "proj.ruppin.ac.il/bgroup30/test2"

export default function AutoComplete(props) {
  const [country, setCountry] = useState([]);
    const {setInputCountry} = props
  useEffect(() => {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


const requestOptions = {
  method: "GET",
  headers: myHeaders
};

fetch(`${url}get`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    
    if  (result && result.length > 0) {
    let parseData = result.map(x => ({label: Translate(x.countryName), id: x.countryId }))
    console.log({parseData})
    setCountry(parseData)
}
})
  .catch((error) => console.error(error));
  },[])

  const getValue = (e, newValue) => {
    console.log(e,newValue)
    setInputCountry(newValue.countryName)
  }
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={country}
      onChange={getValue}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="country" />}
    />
  );
}
