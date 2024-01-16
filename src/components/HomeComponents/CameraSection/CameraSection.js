import React from "react";
import styles from "./CameraSection.module.css";
import topStar from "../../../assets/cameraSection/Stars Up.webp";
import downStar from "../../../assets/cameraSection/Stars Down.webp";

import coolInLive from "../../../assets/HomeImages/COOL-IN LIVE.webp";
import camera from "../../../assets/HomeImages/Camera.webp";
import cameraGirl from "../../../assets/HomeImages/Camera Girl.webp";
import { Fade, Flip, Bounce } from "react-awesome-reveal";
const CameraSection = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.topImg}>
        <img src={topStar} alt="topStars" />
      </div>
      <div className={styles.sectionOverlay}>
        <div className={styles.sectionWraper}>
          <div className={styles.imageWrapper}>
            <div>
              <Bounce left>
                <img src={coolInLive} alt="camera" />
                <p>COOL-IN LIVE</p>
              </Bounce>
            </div>
            <div>
              <Bounce left>
                <img src={camera} alt="camera" />
                <p>PHIM ẢNH</p>
              </Bounce>
            </div>

            <div>
              <Bounce left>
                <img src={cameraGirl} alt="cmaera" />
                <p>HẬU TRƯỜNG HOẠT ĐỘNG</p>
              </Bounce>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.downImg}>
        <img src={downStar} alt="downStars" />
      </div>
    </div>
  );
};

export default CameraSection;
