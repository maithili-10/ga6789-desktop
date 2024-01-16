import CommaSeperator from '../CommaSeperator';
import styles from './PointsConverter.module.css';
import PointsArrow from "../../assets/PointsArrow.webp";

const PointsConverter = ({transferPoints, deposit, withdraw, convertedPointsRatio,daga}) => {

  return (
    <div className={`${styles.convertionWrapper} ${deposit || withdraw ? styles.depositConvertionWrapper : ''}`}>
      <strong>Thực tế</strong>
      <div className={styles.convertionContent}>
        { !withdraw && <span>{CommaSeperator(transferPoints ? daga ? Number( Math.trunc(transferPoints / 30) * 30): transferPoints: 0)}</span>}
        { !withdraw && <img src={PointsArrow} alt='arrow' />}
        <span>{CommaSeperator( 
          deposit || withdraw ? transferPoints * 1000 
          : daga?Number( Math.trunc(transferPoints / 30))
          : convertedPointsRatio && convertedPointsRatio?.multiply ? transferPoints * convertedPointsRatio.multiply 
          : convertedPointsRatio && convertedPointsRatio?.divide ? transferPoints / convertedPointsRatio.divide
          : 0 
          )}
          {withdraw && <span style={{fontSize:'12px'}}> VND</span>}
        </span>
      </div>
    </div>
  )
}

export default PointsConverter