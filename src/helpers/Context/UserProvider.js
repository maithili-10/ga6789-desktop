import { useState } from "react";
import UserContext from "./user-context";

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [wheelInfo, setWheelInfo] = useState(null);
  const [dagaBalance, setDagaBalance] = useState(null);
  const [categoryGamesContext, setCategoryGamesContext] = useState(null);

  const userContext = {
    user,
    setUser,
    userInfo,
    setUserInfo,
    wheelInfo,
    setWheelInfo,
    dagaBalance,
    setDagaBalance,
    categoryGamesContext,
    setCategoryGamesContext,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;