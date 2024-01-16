import GameButton from "../GameComponents/GameButton/GameButton";
import styles from "./PageBanner.module.css";

const PageBanner = ({
  BannerIcon,
  title,
  description,
  gamesList,
  BannerImg,
}) => {
  return (
    <div className={styles.pageBannerWrapper}>
      <div className={styles.pageBannerContent}>
        <div
          className={`${styles.iconTitleWrapper} ${
            gamesList ? styles.gap : ""
          }`}
        >
          <img src={BannerIcon} alt="Icon" />
          <h1>{title}</h1>
        </div>
        {description && <h2>{description}</h2>}
        {gamesList && (
          <div className={styles.gamesWrapper}>
            {gamesList.map((item) => (
              <div key={item.img} className={styles.game}>
                <img src={item.img} alt="game" />
                <div className={styles.gameContentWrapper}>
                  <h3>{item.name}</h3>
                  <div className={styles.gamesButtonWrapper}>
                    <GameButton buttonLink={item.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div className={styles.bannerWrapper}>
        <img src={BannerImg} alt="Banner" />
      </div> */}
    </div>
  );
};

export default PageBanner;
