import { useContext, useEffect, useRef, useState } from "react";
import styles from "./AllGameStatusModal.module.css";
import GameModalContent from "./GameModalContent/GameModalContent";
import CommaSeperator from "../../../CommaSeperator";
import UserContext from "../../../../helpers/Context/user-context";
import MyLoader from "../../../MyLoader";
// import { useNavigate } from "react-router-dom";
import {
  APIAllCategoryGames,
  AllGameWithdrawAPI,
} from "../../../../helpers/APIs/GameAPIs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  APIDagaBalance,
  APIDagaWithdraw,
} from "../../../../helpers/APIs/DagaAPI";
import PendingTransactionModal from "../../../HomeComponents/PlayerGameModal/PendingTransaction/PendingTransactionModal";
import Refresh from "../../../../assets/HeaderIcons/DagaRefresh.webp";
import { motion } from "framer-motion";

const AllGameStatusModal = ({
  showBalance,
  // onClose,
  loader,
  setLoader,
  setShowBalance,
  allWallet,
}) => {
  const queryClient = useQueryClient();
  const divRef = useRef(null);
  const ctx = useContext(UserContext);

  // const navigate = useNavigate();
  // const [allCategoryGames, setAllCategoryGames] = useState();
  // const [dagaBalance, setDagaBalance] = useState();
  const [allTransferLoader, setAllTransferLoader] = useState(false);
  const [gamesWithdrawError, setGamesWithdrawError] = useState(false);
  const [dagaLoader, setDagaLoader] = useState(false);
  const [gameTransactionError, setGameTransactionError] = useState("");
  const [balance, setBalance] = useState(false);
  // const [gameTransactionErrormodal, setGameTransactionErrorModal] = useState(false);

  useEffect(() => {
    if (!ctx.dagaBalance && ctx.dagaBalance !== 0) {
      getDagaBalance();
    }

    // close all games section
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowBalance(false);
        setDagaLoader(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const useAllGameswithBalance = (showBalance) => {
    return useQuery(["all games with balance"], () => APIAllCategoryGames(), {
      enabled: showBalance, // Query will be enabled if `enabled` prop is true and `id` is truthy
    });
  };

  const { data: allCategoryGames, isLoading } =
    useAllGameswithBalance(showBalance);

  // all withdraw mutation
  const allWithdrawMutation = useMutation(
    (array) => {
      return AllGameWithdrawAPI(array);
    },
    {
      onSuccess: (data, variables) => {
        console.log(data);
        // console.log(data)
        const allGameBalanceData = Object.entries(data[0]);
        // console.log((allGameBalanceData))
        allGameBalanceData.map((item) => {
          // console.log(item)
          item.map((value) => {
            // console.log(value)
            setAllTransferLoader(false);
            if (value?.message === "PENDING_WITHDRAW") {
              setGamesWithdrawError("Sắp rút lui");
            } else if (value?.message === "PENDING_TRANSACTION") {
              setGamesWithdrawError(
                "Không thể chuyển điểm vào trò chơi vì đã có một yêu cầu chuyển điểm đang chờ xử lý."
              );
            } else if (value?.message === "BALANCE_NETWORK_ERROR") {
              setGamesWithdrawError("Lỗi mạng cân bằng");
            } else if (value?.message === "LACK_FUND") {
              setGamesWithdrawError("Thiếu vốn");
            } else if (value?.message === "NETWORK_ERROR") {
              setGamesWithdrawError("Lỗi mạng");
            } else if (value?.message === "ACCOUNT_DOESNT_EXIST") {
              setGamesWithdrawError("Tài khoản không tồn tại");
            } else if (value?.message === "POINTS_TRANSFERRED_SUCCESSFULLY") {
              setBalance(!balance);
              ctx.setUserInfo({
                ...ctx.userInfo,
                balance: data[1],
              });
              const cachedData = queryClient.getQueryData(
                "all games with balance"
              );
              // Assuming cachedData is an array of games with balance
              const updatedData = cachedData.map((game) => {
                const updatedGameItems = game.game_items.map((singleGame) => {
                  const matchingGame = variables.find(
                    (item) => item.game_id === singleGame.id
                  );
                  return {
                    ...singleGame,
                    balance: matchingGame ? 0 : singleGame.balance,
                  };
                });

                return {
                  ...game,
                  game_items: updatedGameItems,
                };
              });
              queryClient.setQueryData("all games with balance", updatedData);
              queryClient.invalidateQueries("all games with balance");
              setAllTransferLoader(false);
              setGamesWithdrawError();
            }
          });
        });
      },
      onError: (error) => {
        console.error("API Error:", error);
        setLoader(false);
        setAllTransferLoader(false);
      },
    }
  );

  // onTransferEverythingClicked Withdraw
  const onTransferEverythingClicked = async (e) => {
    e.stopPropagation();
    const finalBlanceArray = [];
    allCategoryGames?.map((item) => {
      item?.game_items &&
        item?.game_items?.length &&
        item?.game_items?.filter((game) => {
          if (game.balance != "LỖI MẠNG" && +game?.balance > 0) {
            finalBlanceArray.push({ game_id: game.id, amount: game.balance });
          }
          // console.log(finalBlanceArray)
        });
    });
    if (finalBlanceArray?.length) {
      setAllTransferLoader(true);
      allWithdrawMutation.mutate(finalBlanceArray);
      // }
    } else {
      setGamesWithdrawError("Không có gì để rút");
    }
  };

  // get daga game balance api
  const getDagaBalance = async () => {
    setDagaLoader(true);
    const res = await APIDagaBalance();
    // console.log(res);
    ctx.setDagaBalance(
      res == "FORBIDDEN"
        ? "FORBIDDEN"
        : res == "NETWORK_ERROR"
        ? "NETWORK_ERROR"
        : res?.result
    );
    setDagaLoader(false);
  };

  // Daga Withdraw api
  const dagaWithdraw = async () => {
    if (ctx.dagaBalance < 1) {
      setGameTransactionError("Số dư tối thiểu phải là 1");
    } else {
      setDagaLoader(true);
      const dagaPoints = Math.floor(ctx.dagaBalance);
      const res = await APIDagaWithdraw(dagaPoints);
      // console.log("Withdraw Response: ", res);
      if (res == "FORBIDDEN") {
        setGameTransactionError("CẤM");
      } else if (res == "LACK_FUND") {
        setGameTransactionError("Thiếu vốn");
      } else if (res == "NETWORK_ERROR") {
        setGameTransactionError("LỖI MẠNG");
      } else if (res == "WITHDRAW_LIMIT_OVER") {
        setGameTransactionError(
          "Tính năng rút tiền tạm đóng vì bạn đã có 1 giao dịch rút tiền hôm nay. Vui lòng thực hiện lại sau 00:00 hoặc liên hệ chăm sóc khách hàng"
        );
      } else if (res?.status) {
        ctx.setDagaBalance(ctx.dagaBalance - dagaPoints);
        ctx.setUserInfo({
          ...ctx.userInfo,
          balance: res.player_balance,
        });
      }
      setDagaLoader(false);
    }
  };

  useEffect(() => {
    console.log("allCategoryGames", allCategoryGames);
    allCategoryGames &&
      allCategoryGames.map((category, index) => {
        if (category && category.game_items.length) {
          category.game_items.map((game, index) => {
            if (game?.balance > 0) {
              // console.log("useeffect",game?.balance>0)
              setBalance(true);
            }
          });
        }
      });
  }, [allCategoryGames]);
  const popupVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring", // For a spring-like effect
        stiffness: 50, // Adjust stiffness for more or less "bounce"
        damping: 10, // Adjust damping for more or less resistance
        duration: 0.5, // Duration of the animation
      },
    },
  };
  console.log("all wallet....", allWallet);
  return (
    <motion.div
      ref={!allWallet ? divRef : null}
      className={`${styles.allGamesOverlay}${
        allWallet ? styles.allWalletGames : ""
      }`}
      variants={allWallet ? {} : popupVariants}
      initial={allWallet ? "visible" : "hidden"}
      animate={allWallet ? "hidden" : "visible"}
    >
      <div
        className={`${styles.allGamesWrapper} ${
          allWallet ? styles.allWalletGamesWrapper : ""
        }`}
      >
        <div
          className={`${styles.allGameHeader} ${
            allWallet ? styles.allWalletGamesHeader : ""
          }`}
        >
          <div className={styles.headerLeftStatus}>
            <span>30:1</span>
          </div>
          <div className={styles.allGameInnerHeader}>
            <div className={styles.dagaInfoOverlay}>
              {!dagaLoader ? (
                <div className={styles.dagaInfo}>
                  {ctx.userInfo?.user_id && ctx.userInfo.user_name && (
                    <img
                      src={Refresh}
                      alt="Refresh"
                      onClick={(e) => {
                        e.stopPropagation();
                        getDagaBalance();
                      }}
                    />
                  )}

                  <div>
                    <span
                      className={`${
                        ctx.dagaBalance == "FORBIDDEN" ||
                        ctx.dagaBalance == "NETWORK_ERROR"
                          ? styles.balanceError
                          : styles.balance
                      }`}
                    >
                      {ctx.dagaBalance == "NETWORK_ERROR"
                        ? "LỖI MẠNG"
                        : ctx.dagaBalance == "FORBIDDEN"
                        ? "CẤM"
                        : // : CommaSeperator(+ctx.dagaBalance)
                        ctx.dagaBalance > 0
                        ? CommaSeperator(ctx.dagaBalance)
                        : ctx.dagaBalance}
                    </span>
                  </div>
                  {ctx.dagaBalance > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dagaWithdraw();
                      }}
                    >
                      Chuyển ví
                    </button>
                  )}
                </div>
              ) : (
                <MyLoader size={20} color="#FFAD6F" />
              )}
            </div>
          </div>
        </div>

        <div className={styles.allGamesBody}>
          <div className={styles.allGamesBodyContent}>
            {allCategoryGames?.length > 0 && (
              <div className={styles.allGamesBodyRightStatus}>
                <span>1:1</span>
              </div>
            )}

            {allCategoryGames ? (
              allCategoryGames.map((category, index) => (
                <GameModalContent
                  allWallet={allWallet}
                  key={index}
                  category={category}
                  loader={loader}
                  setLoader={setLoader}
                  allGameLoading={isLoading}
                  allTransferLoader={allTransferLoader}
                  gameTransactionError={gameTransactionError}
                  setGameTransactionError={setGameTransactionError}
                  setBalance={setBalance}
                  balance={balance}
                  // setAllCategoryGames={setAllCategoryGames}
                />
              ))
            ) : (
              <div className={styles.loaderOverlay}>
                <MyLoader color="#CBCBCB" />
              </div>
            )}
          </div>
          {!isLoading && ctx.userInfo?.user_id && ctx.userInfo.user_name && (
            <div className={styles.allGamesFooterWraper}>
              {allTransferLoader && (
                <div style={{ width: "100%" }}>
                  <MyLoader margin="10px 0 20px 0" color="#CBCBCB" />
                </div>
              )}

              {!allTransferLoader && gamesWithdrawError && (
                <div className={styles.error}>{gamesWithdrawError}</div>
              )}
              <button
                onClick={onTransferEverythingClicked}
                className={`${styles.allGamesFooter} ${
                  balance == false || allTransferLoader ? styles.disabled : ""
                }`}
                disabled={balance == false || allTransferLoader}
              >
                Chuyển mọi thứ vào tài khoản chính
              </button>
            </div>
          )}
        </div>
      </div>

      {gameTransactionError && (
        <PendingTransactionModal
          gameTransactionError={gameTransactionError}
          hideModal={() => {
            setGameTransactionError("");
          }}
        />
      )}
    </motion.div>
  );
};

export default AllGameStatusModal;
