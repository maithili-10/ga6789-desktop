import { useContext, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Layout.module.css";
import UserContext from "../../helpers/Context/user-context";
import useLogout from "../../helpers/useLogout";
import { APIUser } from "../../helpers/APIs/UserAPIs";
import { Outlet } from "react-router-dom";
import HelmetComponent from "../../components/HelmetComponent/HelmetComponent";

const Layout = () => {
  const ctx = useContext(UserContext);
  const logout = useLogout();
  const token=localStorage.getItem("auth_token")
  // get user info
  useEffect(() => {
    if (token) {
      ctx.setUser(token);
      userInfoApi();
    }
  }, [token]);

  // User balance API
  const userInfoApi = async () => {
    const userInfoApiRes = await APIUser();
    if (
      userInfoApiRes.response &&
      (userInfoApiRes.response.data.message === "Unauthenticated." ||
        userInfoApiRes.response.data.message === "timeout exceeded")
    ) {
      logout();
    } else {
      // console.log("userInfoApiRes", userInfoApiRes);
      ctx.setUserInfo({
        ...userInfoApiRes,
        balance: Number(userInfoApiRes.balance),
      });
    }
  };
  return (
    <div className={styles.layoutOverlay}>
      <HelmetComponent/>
      <Header />
      <div className={styles.layoutPagesOverlay}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
