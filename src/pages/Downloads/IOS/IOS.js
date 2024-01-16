import { useState } from "react";
import styles from "./IOS.module.css";
import StepModal from "../StepModal/StepModal";
import Back from "../../../assets/DownloadIcons/Back.webp";
import step1 from "../../../assets/DownloadIcons/IOS/IOS1.webp";
import step2 from "../../../assets/DownloadIcons/IOS/IOS2.webp";
import step3 from "../../../assets/DownloadIcons/IOS/IOS3.webp";
import step4 from "../../../assets/DownloadIcons/IOS/IOS4.webp";
import { useNavigate } from "react-router-dom";

const iosSteps = [
  { label: "Bước 1", image: step1 },
  { label: "Bước 2", image: step2 },
  { label: "Bước 3", image: step3 },
  { label: "Bước 4", image: step4 },
];

const IOS = () => {
  const [stepModal, setStepModal] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.iosOverlay}>
      <div className={styles.downloadWrapper}>
        <div className={styles.backSection}>
          <img src={Back} alt="back" onClick={() => navigate("/downloads")} />
          IOS
        </div>
      </div>
      <div className={styles.iosWrapper}>
        {iosSteps.map((step) => (
          <div
            className={styles.ImageCard}
            key={step.label}
            onClick={() => setStepModal(step.label)}
          >
            <p>{step.label}</p>
            <img src={step.image} alt="stepImg" />
          </div>
        ))}
        <StepModal
          openStep={stepModal ? true : false}
          hideModal={() => setStepModal()}
          stepList={iosSteps}
          stepModal={stepModal}
        />
      </div>
    </div>
  );
};

export default IOS;
