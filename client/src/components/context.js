import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logIn, setLogIn] = useState(false);
  const [events, setEvents] = useState([])
  const [createEventId, setCreateEventId] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([])

  const globalState = { user, setUser, logIn, setLogIn, events, setEvents, createEventId, setCreateEventId, selectedUsers, setSelectedUsers, hostedEvents, setHostedEvents };

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
