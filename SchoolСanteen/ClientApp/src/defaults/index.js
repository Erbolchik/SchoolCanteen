import React, { Dispatch } from 'react';
export const Context = React.createContext({
  role: null,
  basket: null,
  token: null,
  counter: null,
  menuItems: null,
  setToken: Dispatch,
  addItem: Dispatch,
  removeItem: Dispatch,
});
