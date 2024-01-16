import styles from "./CopyItem.module.css";
import { MdContentCopy } from "react-icons/md";

const CopyItem = ({ item, home }) => {
  const onCopyClicked = () => {
    navigator.clipboard.writeText(item.value);
  };

  return (
    <div className={`${styles.bankDetailItem} ${home ? styles.homeMsg : ""}`}>
      <div className={styles.divWrapper} style={{ textAlign: "left" }}>
        <span className={styles.copyLabel}>{item.label}</span>
        {/* <br /> */}
        <span
          className={`${styles.copyValue} ${
            item.fontSmall && styles.smallValue
          } ${item.redText && styles.redText}`}
        >
          {item.value}
        </span>
      </div>
      {item.copy && (
        <span className={styles.copyButton} onClick={onCopyClicked}>
          <MdContentCopy size={20} color="#FFEB72" />
          <span>Copy</span>
        </span>
      )}
    </div>
  );
};

export default CopyItem;
