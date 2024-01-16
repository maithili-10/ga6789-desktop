import { useRef, useState } from "react";
import styles from "./Footer.module.css";
import Sponsors from "./Sponsors/Sponsors";
import Up from "../../assets/FooterIcons/Up.webp";
import Down from "../../assets/FooterIcons/Down.webp";
import FooterDetails from "./FooterDetails/FooterDetails";

const mainFooterLinksList = [
  {
    id: 1,
    name: "Giới Thiệu",
    link: "#",
  },
  { id: 2, name: "Trợ Giúp", link: "#" },
  {
    id: 3,
    name: "Điều Khoản",
    link: "#",
  },
  {
    id: 4,
    name: "Hỗ Trợ",
    link: "https://cskhga6789.com/",
  },
  {
    id: 5,
    name: "Link Dự Bị",
    link: "#",
  },
];

const Footer = () => {
  const [showFooterDetails, setShowFooterDetails] = useState(true);
  const footerDetailsRef = useRef(null);

  const handleClick = (link) => {
    window.open(link);
  };
  const toggleFooterDetails = () => {
    setShowFooterDetails((prevState) => !prevState);
  };

  // Use the ref to add and remove the 'open' class
  const handleToggleAnimation = () => {
    if (footerDetailsRef.current) {
      footerDetailsRef.current.classList.toggle(styles.open);
    }
  };
  // console.log(showFooterDetails)
  return (
    <div className={styles.footerOverlay}>
      {/*
        <div className={styles.mainFooter}>
          <div className={styles.mainFooterLinks}>
            {mainFooterLinksList.map((link) => (
              <span
                key={link.name}
                className={
                  link.id === mainFooterLinksList.length ? styles.noBorder : ''
                }
                onClick={() => handleClick(link.link)}
              >
                {link.name}
              </span>
            ))}
          </div>
          <div className={styles.showDetails}>
            <span>Sơ Đồ Trang Mạng</span>
            <img
              src={showFooterDetails ? Up : Down}
              alt="arrows"
              onClick={() => {
                toggleFooterDetails();
                handleToggleAnimation();
              }}
            />
          </div>
        </div>
      */}

      <FooterDetails
        showFooterDetails={showFooterDetails}
        ref={footerDetailsRef}
      />

      <Sponsors />
      <div className={styles.copyrightWrapper}>Copyright © ga6789 Reserved</div>
    </div>
  );
};

export default Footer;
