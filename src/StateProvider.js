import { useState, createContext, useContext } from 'react';

const StateContext = createContext();

export function StateProvider({ children }){
  const [user, setUser] = useState({});

  const state = {
    user, 
    setUser
  };

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
}

export function useStateContext() {
  return useContext(StateContext);
}
