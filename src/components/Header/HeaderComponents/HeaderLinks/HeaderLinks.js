import { useState } from "react";
import BalanceSection from "../BalanceSection/BalanceSection";
import styles from "./HeaderLinks.module.css";
import LogoutImg from "../../../../assets/HeaderIcons/Logout.webp";
import LoginButtons from "../LoginButtons/LoginButtons";
import LogoutConfirmationModal from "../../../LogoutConfirmationModal/LogoutConfirmationModal";
import { useNavigate } from "react-router-dom";
import MyLoader from "../../../MyLoader";

const linkArray = [
  { name: "Nạp tiền", link: "/profile/deposit" },
  { name: "Rút tiền", link: "/profile/withdraw" },
  { name: "Khuyến mãi", link: "/promotions" },
  { name: "Tài Khoản", link: "/profile" },
];

const HeaderLinks = ({ ctx }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const activePage = window.location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  return (
    <div className={styles.headerLinksOverlay}>
      <div className={styles.headerLinks}>
        {linkArray.map((item) => (
          <div
            key={item.name}
            className={`${
              activePage == item.link ? styles.activeLink : styles.link
            }`}
            onClick={() => navigate(item.link)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {token ? (
        <>
          <BalanceSection />
          {ctx?.user && (
            <div style={{ display: "flex" }}>
              Chào Mừng,
              {ctx?.userInfo?.name ? (
                ctx?.userInfo?.name
              ) : (
                <MyLoader size={18} />
              )}
            </div>
          )}
          <div
            className={styles.logoutBtn}
            onClick={() => setLogoutModal(true)}
          >
            <img src={LogoutImg} alt="logoutIcon" />
            Đăng Xuất
          </div>
        </>
      ) : (
        <LoginButtons />
      )}

      {logoutModal && (
        <LogoutConfirmationModal
          logoutModal={logoutModal}
          closeLogoutModal={() => setLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default HeaderLinks;
