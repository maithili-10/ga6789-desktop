import React from "react";

const UserContext = React.createContext({
  user: null,
  setUser: () => { },
  userInfo: null,
  setUserInfo: () => { },
  wheelInfo: null,
  setWheelInfo: () => { },
  dagaBalance: null,
  setDagaBalance: () => { },
  userbankdetails: null,
  setUserbankdetails: () => { },
  categoryGamesContext : null, 
  setCategoryGamesContext : () => {},
});

export default UserContext;