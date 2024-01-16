import styles from './Lottery.module.css';
import Layout from '../../layout/Layout/Layout';
import PageBanner from '../../components/PageBanner/PageBanner';
import LotteryIcon from '../../assets/LotteryPage/LotteryIcon.png';
import LotteryBanner from '../../assets/LotteryPage/LotteryBanner.png';
import Game1 from '../../assets/LotteryPage/Game1.png';
import Game2 from '../../assets/LotteryPage/Game2.png';
import Game3 from '../../assets/LotteryPage/Game3.png';
import Game4 from '../../assets/LotteryPage/Game4.png';
import Game5 from '../../assets/LotteryPage/Game5.png';
import Game6 from '../../assets/LotteryPage/Game6.png';
import Game7 from '../../assets/LotteryPage/Game7.png';
import Game8 from '../../assets/LotteryPage/Game8.png';
import Game9 from '../../assets/LotteryPage/Game9.png';
import Game10 from '../../assets/LotteryPage/Game10.png';
import Game11 from '../../assets/LotteryPage/Game11.png';
import Game12 from '../../assets/LotteryPage/Game12.png';
import GameButton from '../../components/GameComponents/GameButton/GameButton';

const gamesList = [{img: Game1, link:'link'}, {img: Game2, link:'link'}, {img: Game3, link:'link'}, {img: Game4, link:'link'}, {img: Game5, link:'link'}, {img: Game6, link:'link'}, 
  {img: Game7, link:'link'}, {img: Game8, link:'link'}, {img: Game9, link:'link'}, {img: Game10, link:'link'}, {img: Game11, link:'link'}, {img: Game12, link:'link'}
]

const Lottery = () => {
  return (
    <div className={styles.lotteryWrapper}>
      <PageBanner BannerIcon={LotteryIcon} title='XỔ SỐ' description='LUCKY WHEEL TURN YOU ON !' BannerImg={LotteryBanner}/>
      <div className={styles.gamesWrapper}>
        {gamesList.map(item => (
          <div key={item.img} className={styles.games}>
            <img src={item.img} alt='game'/>
            <div className={styles.gamesButtonWrapper}>
              <GameButton buttonLink={item.img}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lottery