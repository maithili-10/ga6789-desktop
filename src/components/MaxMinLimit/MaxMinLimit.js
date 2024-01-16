import CommaSeperator from "../CommaSeperator";
import styles from "./MaxMinLimit.module.css";

const MaxMinLimit = ({
  minText,
  maxText,
  min,
  max,
  withdraw,
  game,
  transferPoints,
}) => {
 
  return (
    <div className={`${styles.maxMinWrapper} ${minText ? styles.columnView : ""}`} >
      <MaxMix minText={minText} min={min} withdraw={withdraw} game={game} transferPoints={transferPoints}/>
      <MaxMix maxText={maxText} max={max} withdraw={withdraw} game={game} transferPoints={transferPoints}/>  
    </div>
  );
};

export default MaxMinLimit;

const MaxMix = ({minText, maxText, min, max, withdraw, game, transferPoints }) => {
  return (
    <div>
      { min && <span>{minText ? minText : "Min:"}</span> }
      { min && <span className={`${styles.maxMinValue} ${transferPoints && transferPoints < min ? styles.invalidValue : ''}`}> {CommaSeperator(min)} {withdraw || game ? "" : "VND"}</span>}
      { max && <span>{maxText ? maxText : "Max:"}</span> }
      { max && <span className={`${styles.maxMinValue} ${transferPoints && transferPoints > max ? styles.invalidValue : ''}`}> {CommaSeperator(max)} {withdraw || game ? "" : "VND"}</span>}
    </div>
  )
}
