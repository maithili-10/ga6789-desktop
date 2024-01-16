import styles from './CockFight.module.css';
import CockFightIcon from '../../assets/CockFightPage/CockFightIcon.png';
import CockFightBanner from '../../assets/CockFightPage/CockFightBanner.png';
import Game1 from '../../assets/CockFightPage/Game1.png';
import Game2 from '../../assets/CockFightPage/Game2.png';
import Game3 from '../../assets/CockFightPage/Game3.png';
import Game4 from '../../assets/CockFightPage/Game4.png';
import PageBanner from '../../components/PageBanner/PageBanner';

const gamesList = [{img: Game1, link:'link', name: 'THỂ THAO SABA'}, {img: Game2, link:'link', name: 'CMDBET'}, {img: Game3, link:'link', name: 'BTI'}, 
  {img: Game4, link:'link', name: 'LUCKY_SPORTS'}
]

const CockFight = () => {
  return (
    <div className={styles.cockFightWrapper}>
      <PageBanner BannerIcon={CockFightIcon} title='ĐÁ GÀ' gamesList={gamesList} BannerImg={CockFightBanner}/>
    </div>
  )
}   

export default CockFight