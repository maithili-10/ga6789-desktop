import React from "react";
import styles from "./StepComponent.module.css";

const StepComponent = ({ step, image, title }) => {
  return (
    <div className={styles.stepOverlay}>
      <img src={image} />
      <span>{step}</span>
      <span
        style={{
          textAlign: "center",
          // width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {title}
      </span>
    </div>
  );
};

export default StepComponent;
