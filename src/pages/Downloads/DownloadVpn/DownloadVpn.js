import styles from "./DownloadVpn.module.css";
import { useState } from "react";
import StepModal from "../StepModal/StepModal";
import Back from "../../../assets/DownloadIcons/Back.webp";
import step1 from "../../../assets/DownloadIcons/DownloadVpn/Vpn1.webp";
import step2 from "../../../assets/DownloadIcons/DownloadVpn/Vpn2.webp";
import step3 from "../../../assets/DownloadIcons/DownloadVpn/Vpn3.webp";
import step4 from "../../../assets/DownloadIcons/DownloadVpn/Vpn4.webp";
import step5 from "../../../assets/DownloadIcons/DownloadVpn/Vpn5.webp";
import step6 from "../../../assets/DownloadIcons/DownloadVpn/Vpn6.webp";
import IOSIcon from "../../../assets/DownloadIcons/DownloadVpn/IOSIcon.webp";
import AndroidIcon from "../../../assets/DownloadIcons/DownloadVpn/AndroidIcon.webp";
import { useNavigate } from "react-router-dom";

const androidSteps = [
  { label: "Bước 1", image: step1 },
  { label: "Bước 2", image: step2 },
  { label: "Bước 3", image: step3 },
  { label: "Bước 4", image: step4 },
  { label: "Bước 5", image: step5 },
  { label: "Bước 6", image: step6 },
];
const downloadBtns = [
  {
    link: "https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627",
    icon: IOSIcon,
  },
  {
    link: "https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone&pli=1",
    icon: AndroidIcon,
  },
];

// href='gasv388.apk' download='gasv388.apk'

const DownloadVpn = () => {
  const [stepModal, setStepModal] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.androidOverlay}>
      <div className={styles.downloadWrapper}>
        <div className={styles.backSection}>
          <img src={Back} alt="back" onClick={() => navigate("/downloads")} />
          {/* <GoChevronLeft style={{cursor:"pointer"}} size={30} onClick={() => navigate('/downloads')}/> */}
          VPN
        </div>
        <div className={styles.downloadsOverlay}>
          {downloadBtns.map((item) => (
            <DownButton item={item} />
          ))}
        </div>
      </div>
      <div className={styles.androidWrapper}>
        {androidSteps.map((step) => (
          <div
            className={styles.ImageCard}
            key={step.label}
            onClick={() => setStepModal(step.label)}
          >
            <p>{step.label}</p>
            <img src={step.image} alt="stepImg" />
          </div>
        ))}
      </div>
      {stepModal && (
        <StepModal
          openStep={stepModal ? true : false}
          hideModal={() => setStepModal()}
          stepList={androidSteps}
          stepModal={stepModal}
        />
      )}
    </div>
  );
};

export default DownloadVpn;
// Down button
const DownButton = ({ item }) => {
  return (
    <a
      className={styles.downloadButton}
      href={item.link}
      target="_blank"
      key={item}
    >
      <img src={item.icon} alt="icon" />
      <div>
        T<span className={styles.glowingTxt}>ả</span>i x
        <span className={styles.faultyLetter}>uốn</span>g<span> VPN</span>
      </div>
    </a>
  );
};
