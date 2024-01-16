import styles from './Casion.module.css';
import CasinoIcon from '../../assets/CasinoPage/CasinoIcon.png';
import CasinoBanner from '../../assets/CasinoPage/CasinoBanner.png';
import Game1 from '../../assets/CasinoPage/Game1.png';
import Game2 from '../../assets/CasinoPage/Game2.png';
import Game3 from '../../assets/CasinoPage/Game3.png';
import Game4 from '../../assets/CasinoPage/Game4.png';
import Game5 from '../../assets/CasinoPage/Game5.png';
import Game6 from '../../assets/CasinoPage/Game6.png';
import Game7 from '../../assets/CasinoPage/Game7.png';
import Game8 from '../../assets/CasinoPage/Game8.png';
import PageBanner from '../../components/PageBanner/PageBanner';
import GameButton from '../../components/GameComponents/GameButton/GameButton';

const gamesList = [{img: Game1, link:'link'}, {img: Game2, link:'link'}, {img: Game3, link:'link'}, {img: Game4, link:'link'}, {img: Game5, link:'link'}, {img: Game6, link:'link'}, 
  {img: Game7, link:'link'}, {img: Game8, link:'link'}
]

const Casion = () => {
  return (
    <div className={styles.casinoWrapper}>
      <PageBanner BannerIcon={CasinoIcon} title='SÒNG BÀI' description='TƯƠNG TÁC VỚI NHÀ CÁI, CẢM GIÁC NHƯ SÒNG BẠC CÓ SỐ ĐẤT!' BannerImg={CasinoBanner}/>
      <div className={styles.gamesOverlay}>
        <div className={styles.gamesWrapper}>
          {gamesList.map(item => (
            <div key={item.img} className={styles.games}>
              <img src={item.img} alt='game'/>
              <div className={styles.gamesButtonWrapper}><GameButton buttonLink={item.img}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Casion