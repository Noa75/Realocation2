import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { isLocalhost, Translate } from '../Utils';

const url = isLocalhost ? "http://localhost:5231/api/" : "proj.ruppin.ac.il/bgroup30/test2";

export default function AutoComplete(props) {
  
  const { setInputCountry, defultCountry } = props;
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([{label:""}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(countries);
  const setSelectedCountry = (e, newValue) => {

    console.log(e, newValue);
    if (newValue) {
      setInputCountry(newValue.label);
    }
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Mapping countries data to the format that Autocomplete expects (label for display)
        const parsedData = sortedData.map((country) => ({
          label: country.name.common
        }));

        setCountries(parsedData); // Set default country (first country in the list)
        setLoading(false);

      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(defultCountry)
  return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={defultCountry?defultCountry:{label: ""}}
        options={countries}
        onChange={setSelectedCountry}
        renderInput={(params) => <TextField {...params} label="Country" />}
        getOptionLabel={(option) => option.label} // Specify how to display the options
      />
  );
}