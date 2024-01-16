import styles from "./Android.module.css";
import { useState } from "react";
import StepModal from "../StepModal/StepModal";
import { BsArrowDownCircle } from "react-icons/bs";
import Back from "../../../assets/DownloadIcons/Back.webp";
import step1 from "../../../assets/DownloadIcons/Android/Step1.webp";
import step2 from "../../../assets/DownloadIcons/Android/Step2.webp";
import step3 from "../../../assets/DownloadIcons/Android/Step3.webp";
import step4 from "../../../assets/DownloadIcons/Android/Step4.webp";
import step5 from "../../../assets/DownloadIcons/Android/Step5.webp";
import step6 from "../../../assets/DownloadIcons/Android/Step6.webp";
import step7 from "../../../assets/DownloadIcons/Android/Step7.webp";
import { useNavigate } from "react-router-dom";

const androidSteps = [
  { label: "Bước 1", image: step1 },
  { label: "Bước 2", image: step2 },
  { label: "Bước 3", image: step3 },
  { label: "Bước 4", image: step4 },
  { label: "Bước 5", image: step5 },
  { label: "Bước 6", image: step6 },
  ,
  { label: "Bước 7", image: step7 },
];

// href='gasv388.apk' download='gasv388.apk'

const Android = () => {
  const [stepModal, setStepModal] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.androidOverlay}>
      <div className={styles.downloadWrapper}>
        <div className={styles.backSection}>
          <img src={Back} alt="back" onClick={() => navigate("/downloads")} />
          Android
        </div>
        <div className={styles.downloadButton}>
          <a href="gasv388.apk" download="gasv388.apk">
            T<span className={styles.glowingTxt}>ả</span>i x
            <span className={styles.faultyLetter}>uốn</span>g
          </a>
          <BsArrowDownCircle color="#0D2259" />
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

export default Android;
