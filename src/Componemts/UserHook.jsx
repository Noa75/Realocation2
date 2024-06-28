import React, { useState,createContext} from 'react';

export const UserContext = createContext();

export const UserHook = () => {

  const [userDetails, setUserDetails] = useState();

  return {
    userDetails,
    setUserDetails
  }
}