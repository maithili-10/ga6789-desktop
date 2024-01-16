import React from "react";
import { useState } from "react";
import styles from "./LeftFloatingSection.module.css";
import ArrowRight from "../../../assets/FooterIcons/ArrowRight.webp";
import ArrowLeft from "../../../assets/FooterIcons/ArrowLeft.webp";
import IOS from "../../../assets/DownloadIcons/iOS.webp";
import AndroidImg from '../../../assets/DownloadIcons/Android.webp';
import VPN from "../../../assets/DownloadIcons/VPN.webp";
import { useNavigate } from "react-router-dom";

const leftSectionArray = [
  { img: IOS, link: "/ios" },
  { img: AndroidImg, link: "/android" },
  { img: VPN, link: "/vpn" },
];

const LeftFloatingSection = () => {
  const [openSection, setOpenSection] = useState(true);
  const navigate = useNavigate()

  return (
    <div
      className={`${styles.floatingSectionOverlay} ${
        openSection ? styles.closeSection : ""
      }`}
    >
      <div className={styles.leftSection}>
        {leftSectionArray.map((item, index) => (
          <img key={index} src={item.img} alt="img" onClick={() => navigate(item.link)}/>
        ))}
      </div>
      <div
        className={`${styles.rightSection} ${openSection ? styles.hoverRight : styles.hoverLeft}`}
        onClick={() => setOpenSection(!openSection)}
      >
        <img  src={openSection ?  ArrowRight : ArrowLeft }  alt="img"  />
      </div>
    </div>
  );
};

export default LeftFloatingSection;