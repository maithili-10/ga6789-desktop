import styles from './Sports.module.css';
import PageBanner from '../../components/PageBanner/PageBanner';
import SportsIcon from '../../assets/SportsPage/SportsIcon.png';
import SportsBanner from '../../assets/SportsPage/SportsBanner.png';
import Game1 from '../../assets/SportsPage/Game1.png';
import Game2 from '../../assets/SportsPage/Game2.png';
import Game3 from '../../assets/SportsPage/Game3.png';
import Game4 from '../../assets/SportsPage/Game4.png';
import Game5 from '../../assets/SportsPage/Game5.png';
import Game6 from '../../assets/SportsPage/Game6.png';
import GameButton from '../../components/GameComponents/GameButton/GameButton';

const gamesList = [{img: Game1, link:'link', name: 'THỂ THAO SABA'}, {img: Game2, link:'link', name: 'CMDBET'}, {img: Game3, link:'link', name: 'BTI'}, 
  {img: Game4, link:'link', name: 'LUCKY_SPORTS'}, {img: Game5, link:'link', name: 'SBOBET'}, {img: Game6, link:'link', name: 'THỂ THAO UG'}
]

const Sports = () => {
  return (
    <div className={styles.sportsWrapper}>
      <PageBanner BannerIcon={SportsIcon} title='THỂ THAO' description='THAM GIA CÁC SỰ KIỆN TRÊN TOÀN THẾ GIỚI ĐỂ VUI CHƠI HƠN!' BannerImg={SportsBanner}/>
      <div className={styles.gamesWrapper}>
        {gamesList.map(item => (
          <div key={item.img} className={styles.game}>
            <img src={item.img} alt='game'/>
            <div className={styles.gameContentWrapper}>
              <h3>{item.name}</h3>
              <div className={styles.gamesButtonWrapper}>
                <GameButton buttonLink={item.name}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sports