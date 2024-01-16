import React from 'react';
import triangle from '../../assets/triangle.webp'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './InputTooltip.module.css';
import CommaSeperator from '../CommaSeperator';
// import { useContext } from 'react';
// import UserContext from '../../helpers/Context/user-context';

const InputTooltip = ({title,amount,setAmount,onAmountChange, withdraw}) => {
  // const ctx = useContext(UserContext);

  let tooltipMinCheck = withdraw ? 100 : 150
  let tooltipMaxCheck = withdraw ? 100000 : 90000

  return (
    <div className={styles.depositInput}>
      <div className={styles.requiredLabel}>
        <span>* </span>{title}
      </div>
    
      <div className={styles.inputWrapper}>
        <input
          value={amount}
          type="number"
          placeholder={ `${CommaSeperator(tooltipMinCheck)} ~ ${CommaSeperator(tooltipMaxCheck)}` }
          onChange={(e) => onAmountChange(e.target.value)}
        />
       
        <div  className={styles.tooltipWrapper}>
          { amount && amount < tooltipMinCheck || amount > tooltipMaxCheck ? (
          <>
            <div className={styles.tooltip}>
              <span>{CommaSeperator(tooltipMinCheck)} ~ {CommaSeperator(tooltipMaxCheck)}</span>
              <div className={styles.arrowDown}>
                <img src={triangle} alt="arrow"/>
              </div>
            </div>
        
          </>
          ) : (
            ""
          )}
        </div>
      </div>

      {amount && (
        <AiOutlineCloseCircle
          onClick={() => {
            setAmount("");
            }}
          className={styles.cancelIcon}
        />
      )}
      
  </div>
  )
}

export default InputTooltip;