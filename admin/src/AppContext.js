// AppContext.js

import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(() => {
    // Retrieve session data from sessionStorage on component mount
    const storedData = sessionStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    // Update sessionStorage whenever sessionData changes
    sessionStorage.setItem('userData', JSON.stringify(sessionData));
  }, [sessionData]);

  const updateSessionData = (newData) => {
    setSessionData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <AppContext.Provider value={{ sessionData, updateSessionData }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
