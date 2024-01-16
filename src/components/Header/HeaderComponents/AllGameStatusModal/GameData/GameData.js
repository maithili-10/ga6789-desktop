import { useState } from 'react';
import styles from './GameData.module.css';
import CommaSeperator from '../../../../CommaSeperator';
import MyLoader from '../../../../MyLoader';

const GameData = ({game, apiError, sLoader, loader, handleSingleWithdraw, allTransferLoader }) => {
  const [imgLoad, setImgLoad] = useState(true)
  
  return (
    <div className={styles.rowData}>
      <img src={game.icon} alt='icon' onLoad={() => setImgLoad(false)} style={{ display: imgLoad ? 'none' : 'block' }}/>
      {imgLoad && <MyLoader size={16} color='#CBCBCB'/>}
      <div className={styles.transferGrp}>
        {apiError == game.id && (
          <span className={styles.orangeTxt}>
            {game.balance === "NETWORK_ERROR"
              ? "LỖI MẠNG"
              : game.balance === "NOT_SUPPORTED"
              ? "KHÔNG ĐƯỢC HỖ TRỢ"
              : game.balance === "ACCOUNT_DOESNT_EXIST"
              ? 0
              : typeof game.balance === "number"
              ? CommaSeperator(game.balance)
              : 0
            }
          </span>
        )}
        {!apiError && sLoader?.id == game?.id &&  sLoader?.game_category_id == game?.game_category_id  && (
          <MyLoader size={14}/>
        )}
        {apiError != game.id && (
          <span
            className={`${
              game.balance == "NETWORK_ERROR" ? styles.orangeTxt : ""
            }`}
          >
            {game.balance === "NETWORK_ERROR"
              ? "LỖI MẠNG"
              : game.balance === "NOT_SUPPORTED"
              ? "KHÔNG ĐƯỢC HỖ TRỢ"
              : game.balance === "ACCOUNT_DOESNT_EXIST"
              ? 0
              : typeof game.balance === "number"
              ? CommaSeperator(game.balance)
              : 0}
          </span>
        )}
        {+game.balance > 0 && !loader && apiError != game.id && !allTransferLoader ? (
          <button onClick={(e) => handleSingleWithdraw(e, game)}>
            Chuyển khoản
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default GameData