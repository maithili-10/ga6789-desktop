import styles from "./PageBanner.module.css";

const ImageWithText = ({ key,image ,text}) => {
  return (
    <div
      key={key}
      className={styles.imageWraper}
      onClick={() => alert("chess Game")}
    >
      <div className={styles.gameImgWraper}>
        <img src={image} alt="game" />
        <div className={styles.hoverButtonOverlay}>
          <button>Đặt Cược</button>
        </div>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ImageWithText;
