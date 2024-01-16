import styles from './Sponsors.module.css';
import Cmd from '../../../assets/FooterIcons/Sponsors/cmd.webp';
import Lucky from '../../../assets/FooterIcons/Sponsors/lucky.webp';
import Rich88 from '../../../assets/FooterIcons/Sponsors/rich88.webp';
import UnitedGames from '../../../assets/FooterIcons/Sponsors/unitedGames.webp';
import Saba from '../../../assets/FooterIcons/Sponsors/saba.webp';
import Rcb from '../../../assets/FooterIcons/Sponsors/rcb.webp';
import Sexy from '../../../assets/FooterIcons/Sponsors/sexy.webp';
import Sbobet from '../../../assets/FooterIcons/Sponsors/sbobet.webp';
import Via from '../../../assets/FooterIcons/Sponsors/via.webp';
import Jdb from '../../../assets/FooterIcons/Sponsors/jdb.webp';
import M from '../../../assets/FooterIcons/Sponsors/m.webp';
import V8poker from '../../../assets/FooterIcons/Sponsors/v8poker.webp';

const sponsorList = [ Cmd, Lucky, Rich88, UnitedGames, Saba, Rcb, Sexy, Sbobet, Via, Jdb, M, V8poker]

const Sponsors = () => {
  return (
    <div className={styles.sponsorsWrapper}>
      {sponsorList.map(item => (
        <img src={item} alt='Sponsors' key={item}/>
      ))}
    </div>
  )
}

export default Sponsors