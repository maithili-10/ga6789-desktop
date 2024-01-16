import { useContext, useState } from "react";
import styles from "./BalanceSection.module.css";
import UserContext from "../../../../helpers/Context/user-context";
import CommaSeperator from "../../../CommaSeperator";
// import AllGameStatusModal from "../AllGameStatusModal/AllGameStatusModal";
// import { RxExit } from "react-icons/rx";
import dbIcon from "../../../../assets/HeaderIcons/Balance.webp";
import upIcon from "../../../../assets/HeaderIcons/Up.webp";
import downIcon from "../../../../assets/HeaderIcons/Down.webp";
// import LogoutConfirmationModal from "../../LogoutConfirmationModal/LogoutConfirmationModal";
// import MyLoader from "../../MyLoader.js";
import { useNavigate } from "react-router-dom";
import AllGameStatusModal from "../AllGameStatusModal/AllGameStatusModal";
import MyLoader from "../../../MyLoader";

const BalanceSection = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [loader, setLoader] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  // open all game status modal
  const openAllGameStatusModal = (e) => {
    e.stopPropagation();
    if (!ctx?.userInfo?.user_id && !ctx?.userInfo?.user_name) {
      navigate("/profile/deposit");
    } else {
      setShowBalance(!showBalance);
    }
  };

  return (
    <><div className={styles.balanceSection} onClick={(e) => { openAllGameStatusModal(e)}} >
    {/* <div className={styles.userName}>{user?.user_name ? user?.user_name  : '' }</div> */}
    {/* {Number(user?.balance) > 0 && <>   <FaDatabase className={styles.userIcons}/> */}
    
    { (ctx.userInfo?.balance) >= 0 ?
      <div className={styles.balanceSectionWrapper} onClick={(e) => openAllGameStatusModal(e)}>
        <div className={styles.dbIconWrapper}>
          <img src={dbIcon} alt="balance Img" />
        </div>
        <span>{`${CommaSeperator((ctx.userInfo?.balance))} K`}</span> 
        <div className={styles.modalArrow}>
          <img src={showBalance ? upIcon : downIcon} alt="modal Arrow" />
        </div>
      </div>
      : <MyLoader size={18}/>
    }
  
  </div>
  {showBalance && (
        <AllGameStatusModal
          Expand
          Down
          showBalance={showBalance}
          setShowBalance={setShowBalance}
          onClose={() => {
            setShowBalance(false);
            setLoader(null);
          }}
          loader={loader}
          setLoader={setLoader}
        />
        )}
  </>
    
  );
};
export default BalanceSection;

// {Number(ctx.userInfo?.balance) >= 0 ? (
//   <div className={styles.balanceSectionWrapper}>
//     <div className={styles.dbIconWrapper}>
//       <img src={dbIcon} alt="balance Img" />
//     </div>
//     <span>{`${CommaSeperator(Number(ctx.userInfo?.balance))} K`}</span>

//     <div className={styles.modalArrow}>
//       <img src={showBalance ? upIcon : downIcon} alt="modal Arrow" />
//     </div>
//   </div>
// ) : (
//   <MyLoader size={20}/>
// )}
