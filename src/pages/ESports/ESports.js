import styles from './ESports.module.css';
import ESportsIcon from '../../assets/ESportsPage/ESportsIcon.png';
import ESportsBanner from '../../assets/ESportsPage/ESportsBanner.png';
import MainGame1 from '../../assets/ESportsPage/MainGame1.png';
import MainGame2 from '../../assets/ESportsPage/MainGame2.png';
import GoButton from '../../assets/ESportsPage/GoButton.png';
import OtherGame1 from '../../assets/ESportsPage/OtherGame1.png';
import OtherGame2 from '../../assets/ESportsPage/OtherGame2.png';
import OtherGame3 from '../../assets/ESportsPage/OtherGame3.png';
import OtherGame4 from '../../assets/ESportsPage/OtherGame4.png';

const ESports = () => {
  return (
    <div className={styles.eSportsWrapper}>
      <div className={styles.iconTitleWrapper}>
        <img src={ESportsIcon} alt='ESportsIcon'/>
        <h1>E-SPORTS</h1>
      </div>
      <div className={styles.eSportsaContentWrapper}>
        <img src={ESportsBanner} alt='CasinoBanner'/>
        <div className={styles.mainGamesWrapper}>
          <div className={styles.mainGameWrapper}>
            <div><img src={MainGame1} alt='MainGame'/></div>
            <div><img src={GoButton} alt='GoButton'/></div>
          </div>
          <div className={styles.mainGameWrapper}>
            <div><img src={MainGame2} alt='MainGame'/></div>
            <div><img src={GoButton} alt='GoButton'/></div>
          </div>
        </div>
        <div className={styles.otherGamesWrapper}>
          <div className={styles.otherGamesHeader}>
            <h3>POPULAR & MASSIVE MULTIPLAYER</h3>
            <h1>E-SPORTS GAMES</h1>
          </div>
          <div>
            <div className={styles.mainGamesWrapper}>
              <div className={styles.mainGameWrapper}>
                <div><img src={OtherGame1} alt='OtherGame1'/></div>
              </div>
              <div className={styles.mainGameWrapper}>
                <div><img src={OtherGame2} alt='OtherGame2'/></div>
              </div>
            </div>
            <div className={styles.mainGamesWrapper}>
              <div className={styles.mainGameWrapper}>
                <div><img src={OtherGame3} alt='OtherGame3'/></div>
              </div>
              <div className={styles.mainGameWrapper}>
                <div><img src={OtherGame4} alt='OtherGame4'/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ESports