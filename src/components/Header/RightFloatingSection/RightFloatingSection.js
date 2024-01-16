import styles from "./RightFloatingSection.module.css";
import CskhImg from "../../../assets/HeaderIcons/CSKH.webp";
// import ZaloImg from "../../../assets/HeaderIcons/Zalo.webp";
// import ZaloQR from "../../../assets/ZaloQR.webp";
import { useState } from "react";
import IOS from "../../../assets/DownloadIcons/iOS.webp";
import AndroidImg from "../../../assets/DownloadIcons/Android.webp";
import VPN from "../../../assets/DownloadIcons/VPN.webp";
const floatingOoptions = [
  // { name: "ZALO", img: ZaloImg },
  {
    name: "CSKH 24/7",
    img: CskhImg,
    link: "https://cskhga6789.com/",
  },
  { img: IOS, link: "/ios" },
  { img: AndroidImg, link: "/android" },
  { img: VPN, link: "/vpn" },
];

const RightFloatingSection = () => {
  const [zaloHover, setZaloHover] = useState(false);

  return (
    <div className={styles.floatingBtns}>
      {floatingOoptions.map((item) => (
        <div
          className={styles.floatingOptions}
          key={item.link}
          onClick={() => item.link && window.open(item.link)}
          onMouseEnter={() =>
            item.name == "ZALO"
              ? setZaloHover(true)
              : item.name == "CSKH 24/7" && setZaloHover(false)
          }
          onMouseLeave={() => setZaloHover(false)}
        >
          <img src={item.img} alt="img" />
          <span>{item.name}</span>
        </div>
      ))}

      {
        /*zaloHover && (
          <div
            className={`${styles.zaloModalContent} ${
              zaloHover ? styles.openSection : ""
            }`}
          >
            <div>Liên hệ zalo</div>
            <span>0588495596</span>
            <div className={styles.zaloImgWrapper}>
              <img src={ZaloQR} alt="zaloImg" />
            </div>
          </div>
        )*/
      }
    </div>
  );
};

export default RightFloatingSection;
