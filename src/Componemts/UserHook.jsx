import React, { useState,createContext} from 'react';

export const UserContext = createContext(null);

export const UserHook = () => {

  const [userDetails, setUserDetails] = useState(null);

  return {
    userDetails,
    setUserDetails
  }
}