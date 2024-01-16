import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import SecondaryHeader from "./HeaderComponents/SecondaryHeader/SecondaryHeader";
import Logo from "../../assets/HeaderIcons/GA6789 Logo.webp";
import HeaderLinks from "./HeaderComponents/HeaderLinks/HeaderLinks";
import { useContext } from "react";
import UserContext from "../../helpers/Context/user-context";
import RightFloatingSection from "./RightFloatingSection/RightFloatingSection";
// import LeftFloatingSection from "./LeftFloatingSection/LeftFloatingSection";

const Header = () => {
  const navigate = useNavigate();
  const ctx = useContext(UserContext);
  // console.log(ctx)
  return (
    <Fragment>
      <div className={styles.headerOverlay}>
        <video autoPlay muted loop>
          <source src='https://res.cloudinary.com/du1rrhqko/video/upload/v1703838171/Header_PC_1920X95_VP9_V2_1_j2r5xd.webm' alt='Video'/>
        </video>
        <div className={styles.logoImageWrapper}>
          <img src={Logo} alt="logo" onClick={() => navigate("/")} />
        </div>
        <HeaderLinks ctx={ctx} />
      </div>

      <SecondaryHeader />
      {/* <LeftFloatingSection /> */}
      <RightFloatingSection />
    </Fragment>
  );
};

export default Header;
