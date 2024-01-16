import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./ProfileLayout.module.css";
import ActiveProfile from "../../assets/ProfilePage/ActiveProfile.webp";
import InActiveProfile from "../../assets/ProfilePage/InActiveProfile.webp";
import ActiveDeposit from "../../assets/ProfilePage/ActiveDeposit.webp";
import InActiveDeposit from "../../assets/ProfilePage/InActiveDeposit.webp";
import ActiveWithdraw from "../../assets/ProfilePage/ActiveWithdrawal.webp";
import InActiveWithdraw from "../../assets/ProfilePage/InactiveWithdrawal.webp";
import ActiveAllWallet from "../../assets/ProfilePage/ActiveAllWallet.webp";
import InActiveAllWallet from "../../assets/ProfilePage/InactiveAllWallet.webp";
import ActiveTransactions from "../../assets/ProfilePage/ActiveTransations.webp";
import InActiveTransactions from "../../assets/ProfilePage/InactiveTransations.webp";
import ActiveBankManagement from "../../assets/ProfilePage/ActiveBankManagement.webp";
import InActiveBankManagement from "../../assets/ProfilePage/InactiveBankManagement.webp";
import { useContext } from "react";
import UserContext from "../../helpers/Context/user-context";
import MyLoader from "../../components/MyLoader";

const pageOptions = [
  {
    name: "Thông tin tài khoản",
    link: "/profile",
    activeImg: ActiveProfile,
    inActiveImg: InActiveProfile,
  },
  {
    name: "Nạp tiền",
    link: "/profile/deposit",
    activeImg: ActiveDeposit,
    inActiveImg: InActiveDeposit,
  },
  {
    name: "Rút tiền",
    link: "/profile/withdraw",
    activeImg: ActiveWithdraw,
    inActiveImg: InActiveWithdraw,
  },
  {
    name: "Chuyển Quỹ",
    link: "/profile/all-wallet",
    activeImg: ActiveAllWallet,
    inActiveImg: InActiveAllWallet,
  },
  {
    name: "Lịch sử nạp rút",
    link: "/profile/transactions",
    activeImg: ActiveTransactions,
    inActiveImg: InActiveTransactions,
  },
  {
    name: "Quản lý ngân hàng",
    link: "/profile/bank-account-management",
    activeImg: ActiveBankManagement,
    inActiveImg: InActiveBankManagement,
  },
];

const ProfileLayout = () => {
  const ctx = useContext(UserContext);
  const location = useLocation();
  const getLastPathSegment = (path) => {
    const segments = path.split("/");
    let lastSegment = segments.pop() || segments.pop(); // Handle trailing slashes
    lastSegment = lastSegment.replace(/-/g, " "); // Replace all hyphens with spaces
    return lastSegment;
  };
  const formattedLastSegment = getLastPathSegment(location?.pathname);
  function processFormattedLastSegment(formattedLastSegment) {
    switch (formattedLastSegment) {
      case "profile":
        return "Thông tin";
      case "deposit":
        return "Nạp tiền";
      case "withdraw":
        return "Rút tiền";
      case "all wallet":
        return "tất cả ví";
      case "transactions":
        return "giao dịch";
      case "bank account management":
        return "quản lý tài khoản ngân hàng";
      default:
        return "";
    }
  }
  return (
    <div className={styles.profileLayoutOverlay}>
      <div className={styles.profileLayoutWrapper}>
        <div className={styles.profileLayoutHeader}>
          {ctx.user && ctx?.userInfo?.name ? (
            <span>
              {ctx?.userInfo?.name} - {ctx?.userInfo?.balance}
            </span>
          ) : (
            <MyLoader />
          )}
          {ctx.user && ctx?.userInfo?.created_at ? (
            <span>
              Joined {new Date(ctx?.userInfo?.created_at).toLocaleDateString()}
            </span>
          ) : (
            <MyLoader />
          )}
        </div>
        <div className={styles.profileLayoutBody}>
          <PageOptionsComponent pageOptions={pageOptions} />
          <div className={styles.profileLayoutMainOverlay}>
            <div className={styles.profileLayoutMainWrapper}>
              <div className={styles.pageTitle}>
                {processFormattedLastSegment(
                  formattedLastSegment
                ).toUpperCase()}
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;

// Page options component
const PageOptionsComponent = ({ pageOptions }) => {
  const navigate = useNavigate();
  const activePage = window.location.pathname;

  return (
    <div className={styles.profileLayoutAside}>
      {pageOptions.map((item) => (
        <div
          className={`${styles.pageOption} ${
            activePage == item.link ? styles.activePage : ""
          }`}
          onClick={() => navigate(item.link)}
          key={item.name}
        >
          <img
            src={activePage == item.link ? item.activeImg : item.inActiveImg}
            alt="img"
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};
