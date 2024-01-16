import { useContext, useState } from "react";
import { Divider } from "@mui/material";
import styles from "./GameModalContent.module.css";
import JsonFormate from "../../../../JsonFormate";
import CommaSeperator from "../../../../CommaSeperator";
import UserContext from "../../../../../helpers/Context/user-context";
import MyLoader from "../../../../MyLoader";
import { SingleGameWithdrawAPI } from "../../../../../helpers/APIs/GameAPIs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PendingTransactionModal from "../../../../HomeComponents/PlayerGameModal/PendingTransaction/PendingTransactionModal";

const GameModalContent = ({
  category,
  wallet,
  allTransferLoader,
  setGameTransactionError,
  allWallet,
  balance,
  setBalance

}) => {
  
  const queryClient = useQueryClient();
  const [sLoader , setSLoader] = useState(null)
  const [apiError, setApiError] = useState();
  const [loader , setLoader] = useState(false)

  // const [individualGameBalance, setIndividualGameBalance] = useState()  
  // const authToken = localStorage.getItem('auth_token')
  const ctx = useContext(UserContext);

  const withdrawMutation = useMutation(
    (obj) => {
      return SingleGameWithdrawAPI(obj.id, obj.balance);
    },
    {
      onMutate: () => {
        setLoader(true);
      },
      onSuccess: (data, variables) => {
        const { id ,game_category_id } = variables;
        // console.log(data)
        if (data?.message === "POINTS_TRANSFERRED_SUCCESSFULLY") {

          ctx.setUserInfo({
            ...ctx.userInfo,
            balance: data.balance,
          });
          // console.log(data.balance)
          const cachedData = queryClient.getQueryData("all games with balance");
          
          // Assuming cachedData is an array of games with balance
          const updatedData = cachedData.map((game) => {

            if (game.id === game_category_id) {
              const updatedGameItems =   game.game_items.map((singleGame) => {
               
                if (singleGame.game_category_id === game_category_id && singleGame.id === id) {
                  return {
                    ...singleGame,
                    balance: 0,
                  };
                }
                return singleGame;
              });
              return {
                ...game,
                game_items: updatedGameItems,
              };
            }
            return game;
          });
          queryClient.setQueryData("all games with balance", updatedData);
          queryClient.invalidateQueries("all games with balance");
          const updatedbal=updatedData.map(updated=>{
            updated.game_items.map(gameitem=>{
              // console.log("all zero",gameitem?.balance==0)
              if(gameitem?.balance==0){
                setBalance(false)
              }
            })
          })
        } else if (data === "PENDING_TRANSACTION") {
          setGameTransactionError('Không thể chuyển điểm về tài khoản vì đã có một yêu cầu chuyển điểm đang chờ xử lý.')
        }
        else if (data === "PENDING_WITHDRAW") {
          setGameTransactionError(' Đang thực hiện chuyển điểm về tài khoản. Điểm sẽ được chuyển thành công trong vài phút. Cám ơn vì sự kiên nhẫn của bạn.')
        }
        else if (data === "BALANCE_NETWORK_ERROR") {
          setGameTransactionError(' Lỗi mạng cân bằng')
        }
        else if (data === "LACK_FUND") {
          setGameTransactionError(' Thiếu vốn')
        }
        else if (data === "ACCOUNT_DOESNT_EXIST") {
          setGameTransactionError(' Tài khoản không tồn tại')
        }
        else if (data === "NETWORK_ERROR") {
          setGameTransactionError(' Lỗi mạng')
        }

        setLoader(false);
        setSLoader(null)
      },
      onError: (error) => {
        console.error("API Error:", error);
        setLoader(false);
        setSLoader(null)
      },
    }
  );

  const handleSingleWithdraw = (e, selectedGame) => {
    
    e.stopPropagation();
    const gameData = {
      id: selectedGame.id ,
      game_category_id : selectedGame.game_category_id

    }
    setSLoader(gameData)
    // setLoader(selectedGame.id);
    // Call the mutation function to withdraw from the single game
    withdrawMutation.mutate(selectedGame);
  };

  return (
    <div className={`${wallet&& allWallet ? styles.walletInner : styles.innerOverlay}`}>
      <div className={styles.innerContent}>
        <h5>{JsonFormate(category.name)}</h5>
        <Divider color="white" />
        {category && category.game_items.length ? (
          category.game_items.map((game, index) => (
            <div className={styles.rowData} key={index}>
              <h6>{JsonFormate(game.name)}</h6>
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
                    className={`${styles.balance} ${
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
          ))
        
        ) : (
          <div className={styles.noGames}>không có trò chơi</div>
        )}
       
      </div>
      {/* 
        { gameTransactionError&&
          <PendingTransactionModal
            message={gameTransactionError}
            show={gameTransactionError?true:false}
            hideModal={() => {setGameTransactionErrorModal(false)}}
          />
        } 
      */}
    </div>
  );
};

export default GameModalContent;

// {+game.balance > 0 && !loader && apiError != game.id && !allTransferLoader ? (
//   <button onClick={(e) => handleSingleWithdraw(e, game)}>
//     Chuyển khoản
//   </button>
// ) : (
//   ""
// )}