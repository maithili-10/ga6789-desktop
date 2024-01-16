import { useContext } from "react";
import UserContext from "./Context/user-context";
import { useNavigate } from "react-router-dom";

const useOpenPlayGameModal = ({ setPlayGameState, setSingleGameModal }) => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  const openPlayGameModal = (game) => {
    console.log("game--------------", game);
    console.log("ctx.user--------------", ctx.user);
    if (!ctx.user) {
      navigate("/login");
    } else {
      setPlayGameState(true);
      setSingleGameModal(game);
    } 
    // if (
    //   ctx.user &&
    //   ctx?.userInfo &&
    //   ctx?.userInfo?.user_id &&
    //   ctx?.userInfo?.user_name
    // ) {
    //   setPlayGameState(true);
    //   setSingleGameModal(game);
    // } else if (
    //   ctx.user &&
    //   ctx?.userInfo &&
    //   !ctx?.userInfo?.user_id &&
    //   !ctx?.userInfo?.user_name
    // ) {
    //   navigate("/profile/deposit");
    // }
  };
  return openPlayGameModal;
};

export default useOpenPlayGameModal;
