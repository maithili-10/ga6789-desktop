import { useContext, useEffect, useState } from "react";
import styles from "./PlayGameModal.module.css";
import { Modal, Box } from "@mui/material";
import UserContext from "../../../helpers/Context/user-context";
import CommaSeperator from "../../CommaSeperator";
import JsonFormate from "../../JsonFormate";
import MyLoader from "../../MyLoader";
import Backdrop from "@mui/material/Backdrop";
import dbIcon from "../../../assets/HeaderIcons/Balance.webp";
import Refresh from "../../../assets/Refresh.webp";
import { useNavigate } from "react-router-dom";
import PointsConverter from "../../PointsConverter/PointsConverter";
import { APIGameBalance, APIGameDeposit } from "../../../helpers/APIs/GameAPIs";
import {
  APIDagaBalance,
  APIDagaDeposit,
  APIDagaPoints,
} from "../../../helpers/APIs/DagaAPI";
import MaxMinLimit from "../../MaxMinLimit/MaxMinLimit";
import PendingTransactionModal from "./PendingTransaction/PendingTransactionModal";
import useLogout from "../../../helpers/useLogout";

const PlayGameModal = ({
  playGameState,
  setPlayGameState,
  singleGameModal,
  setSingleGameModal,
  daga,
  setShowGames,
  setDaga,
}) => {
  const [transferPoints, setTransferPoints] = useState("");
  const [gameBalance, setGameBalance] = useState();
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const [balanceloader, setbalanceLoader] = useState(false);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const [convertedPointsRatio, setConvertedPointsRatio] = useState();
  const [buttonEnabled, setButtonEnabled] = useState(); // Store the result here
  const [pendingModal, setPendingModal] = useState();
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  // category game API call
  useEffect(() => {
    if (daga) {
      if (ctx.dagaBalance === 0 || ctx.dagaBalance > 0) {
        // set daga balance if its in context
        setGameBalance(ctx.dagaBalance);
      } else {
        // get DAGA balance if context is empty
        gameBalanceApi();
      }
      // get DAGA points API call
      dagaPointsApi();
    } else {
      // get normal game balance, set max, min and convertion points
      gameBalanceApi();
      setMinValue(
        ctx.categoryGamesContext?.rates[singleGameModal?.game_id].min_amount
      );
      setMaxValue(
        ctx.categoryGamesContext?.rates[singleGameModal?.game_id].max_amount
      );
      checkRates(ctx.categoryGamesContext?.rates[singleGameModal?.game_id]);
    }
  }, []);

  const logout = useLogout();
  // console.log(ctx.gamesRates[singleGameModal?.game_id])
  // console.log(singleGameModal)

  // game Balance API
  const gameBalanceApi = async () => {
    if (daga) {
      setbalanceLoader(true);
      const dagaBal = await APIDagaBalance();
      if (dagaBal == "Unauthenticated") {
      } else {
        setGameBalance(
          dagaBal == "FORBIDDEN"
            ? "CẤM"
            : dagaBal == "NETWORK_ERROR"
            ? "LỖI MẠNG"
            : dagaBal.result
        );
        setbalanceLoader(false);
        ctx.setDagaBalance(dagaBal.result);

        // console.log(dagaBal == "NETWORK_ERROR")
      }
    } else {
      setbalanceLoader(true);
      // console.log(singleGameModal.id)
      const gameBal = await APIGameBalance(singleGameModal.id);

      setGameBalance(
        gameBal == "ACCOUNT_DOESNT_EXIST"
          ? 0
          : gameBal == "NETWORK_ERROR"
          ? "LỖI MẠNG"
          : gameBal == "NOT_SUPPORTED"
          ? "KHÔNG ĐƯỢC HỖ TRỢ"
          : gameBal == null
          ? 0
          : gameBal == undefined
          ? 0
          : gameBal.result
      );
      setbalanceLoader(false);
      console.log(gameBal);
    }
  };

  // get DAGA Points API
  const dagaPointsApi = async () => {
    const dagaPointsRes = await APIDagaPoints();
    // console.log(dagaPointsRes);
    setMinValue(dagaPointsRes?.daga_rate?.min_amount);
    setMaxValue(dagaPointsRes?.daga_rate?.max_amount);
    checkRates(dagaPointsRes?.daga_rate);
    // setConvertedPointsRatio({'' : dagaPointsRes?.daga_rate?.division_rate});
    // console.log(dagaPointsRes)
  };

  // check rates
  const checkRates = (rates) => {
    if (rates) {
      const myRates = Object.keys(rates);
      const myRatesValue = Object.values(rates);
      myRates.map((item) => {
        if (item == "division_rate") {
          setConvertedPointsRatio({ divide: myRatesValue[0] });
        } else if (item == "multiply_rate") {
          setConvertedPointsRatio({ multiply: myRatesValue[0] });
        }
      });
    }
  };

  // play now, login in game
  const playNow = async (points) => {
    // console.log((points))
    // // console.log("transfer all ponts");
    // console.log(points?.toString()?.includes("."));
    // console.log( points?.toString()?.split(".")[1]?.length);
    // console.log( points?.toString()?.split(".")[1].length >2);

    // if points
    if (Number(points)) {
      // console.log('Points')
      // all transfer points
      if (Number(points) > Number(ctx.userInfo.balance)) {
        // Not enough balance, Insufficient Balance Please Recharge First
        setError(
          "Tài khoản của bạn không đủ số dư để chuyển điểm vào trò chơi. Vui lòng nạp tiền vào tài khoản."
        );
        // console.log('points greater than user balance');
      } else if (Number(points) < minValue && maxValue == null) {
        // min individual game, Not Max, Please select minimum points
        setError("Vui lòng chọn điểm tối thiểu");
        // console.log('points les than minimum, no maximum');
      } else if (maxValue && Number(points) < minValue) {
        // max value and tp < min value
        setError(
          "Tài khoản của bạn không đủ số dư để chuyển điểm vào trò chơi. Vui lòng nạp tiền vào tài khoản."
        );
        // console.log('points les than minimum, no maximum');
      } else if (
        !daga &&
        points?.toString()?.includes(".") &&
        points?.toString()?.split(".")[1]?.length &&
        points?.toString()?.split(".")[1].length > 2
      ) {
        // games have decimal and length greater than 2
        setError("Chỉ chấp nhận hai số thập phân");
        // console.log("Decimal length error");
      } else if (
        Number(points) === Number(ctx.userInfo?.balance) &&
        Number(points) > maxValue
      ) {
        if (daga) {
          //user balance is greater than DAGA max value
          gameDepositCall(null, maxValue);
          // console.log('Daga maximum value if points are greater than maximum points')
        } else {
          //user balance is greater than GAME max value
          gameDepositCall(
            singleGameModal.id,
            maxValue ? maxValue : Number(points)
          );
          // console.log('Game maximum value if points are greater than maximum points')
        }
      } else {
        if (daga) {
          // daga decimal , no decimal
          // console.log(typeof(points))
          if (
            Number(points) === Number(ctx?.userInfo?.balance) &&
            points.toString()?.includes(".")
          ) {
            // console.log("no decimal check section")
            //if points has decimal, conversion of points
            let dagaPoints = Math.trunc(points / 30) * 30;
            // console.log('daga have decimal points, convert them and send')
            // converted points more than max, send converted points
            if (dagaPoints > maxValue) {
              //converted points are greater than max value
              gameDepositCall(null, maxValue);
              // console.log('daga have decimal points, convert points greater than max')
            } else {
              //sending converted points
              gameDepositCall(null, dagaPoints);
              // console.log('daga have decimal points, send converted points')
            }
          } else {
            // console.log("no decimal check section")
            //points dont have decimal,calculate if points divisible by 30 and send
            let dagaPoints = Math.trunc(points / 30) * 30;

            gameDepositCall(null, dagaPoints);
            // console.log('daga doesnot have decimal, send points')
          }
        } else {
          //other games deposit
          // console.log("id,points",singleGameModal.id, points )
          gameDepositCall(singleGameModal.id, points);
        }
      }
    } else if (gameBalance && daga) {
      // daga balance
      setPlayGameState(false);
      // setShowGames(false);
      navigate("/game-links");
    } else {
      // console.log("am in else");
      // console.log("am in elseid,points",singleGameModal.id, points )
      gameDepositCall(singleGameModal.id, points);
    }

    // else if (gameBalance) {
    //   // game balance
    //   gameDepositCall(singleGameModal.id, points);
    // } else if (!gameBalance && !Number(points)) {
    //   // no balance, no points
    //   setError(
    //     "Tài khoản của bạn không đủ số dư để chuyển điểm vào trò chơi. Vui lòng nạp tiền vào tài khoản."
    //   );
    // }
  };

  // play now API call
  const gameDepositCall = async (id = singleGameModal.id, points) => {
    setLoader(true);
    // console.log(points);
    if (daga) {
      // console.log(points);
      const depositApiRes = await APIDagaDeposit(points);
      gameDepositResponse(depositApiRes);
    } else {
      const depositApiRes = await APIGameDeposit(id, points || 0);
      // console.log("depositApiRes", depositApiRes);
      gameDepositResponse(depositApiRes);
    }
  };

  // play now API response
  const gameDepositResponse = (depositRes) => {
    // console.log(depositRes);
    if (depositRes == "INSUFFICIENT_BALANCE") {
      setError(
        "Tài khoản của bạn không đủ số dư để chuyển điểm vào trò chơi. Vui lòng nạp tiền vào tài khoản."
      );
      setLoader(false);
    } else if (depositRes == "BALANCE_NETWORK_ERROR") {
      setError("LỖI MẠNG");
      setLoader(false);
    } else if (depositRes == "REGISTRATION_NETWORK_ERROR") {
      setError("Lỗi mạng đăng ký");
      setLoader(false);
    } else if (depositRes == "LOGIN_NETWORK_ERROR") {
      setError("Lỗi mạng đăng nhập");
      setLoader(false);
    } else if (depositRes?.message == "PENDING_TRANSACTION") {
      setPendingModal(depositRes);
      setLoader(false);
    } else if (depositRes?.message == "PLEASE_DEPOSIT") {
      setPendingModal(depositRes);
      setLoader(false);
    } else if (depositRes && depositRes?.message == "PENDING_DEPOSIT") {
      setPendingModal(depositRes);
      setLoader(false);
    } else if (depositRes == "DEPOSIT_NETWORK_ERROR") {
      setError("Lỗi mạng tiền gửi");
      setLoader(false);
    } else if (depositRes == "NETWORK_ERROR") {
      setError("Lỗi mạng");
      setLoader(false);
    } else if (depositRes == "FORBIDDEN") {
      setError("CẤM");
      setLoader(false);
    } else if (depositRes == "AMOUNT_NOT_ACCEPTED") {
      setError("Số tiền không được chấp nhận");
      setLoader(false);
    } else if (depositRes?.status) {
      if (daga) {
        setDaga(false);
        navigate("game-links");
      } else {
        window.open(depositRes?.link, "_blank");
      }
      ctx.setUserInfo({
        ...ctx.userInfo,
        balance: depositRes?.player_balance,
      });
      closeModal();
      setShowGames && setShowGames(false);
    }

    // if (depositRes && depositRes[0] == "LOGIN_SUCCESS") {
    //   navigate("game-links");
    //   ctx.setUserInfo({
    //     ...ctx.userInfo,
    //     balance: depositRes[1],
    //   });
    // } else if (depositRes == "FORBIDDEN") {
    //   setError("Admin Forbidden");
    //   setLoader(false);
    // } else if (depositRes == "INSUFFICIENT_BALANCE") {
    //   setError("Insufficient Balance");
    //   setLoader(false);
    // } else if (depositRes == "AMOUNT_NOT_ACCEPTED") {
    //   setError("Amount not accepted");
    //   setLoader(false);
    // } else if (depositRes == "NETWORK_ERROR") {
    //   setError("Network");
    //   setLoader(false);
    // } else if (depositRes) {
    //   ctx.setUserInfo({
    //     ...ctx.userInfo,
    //     balance: depositRes[1],
    //   });
    //   window.open(depositRes && depositRes[0], "_blank");
    //   closeModal();
    // } else {
    //   setError("Some Error");
    //   setLoader(false);
    // }
  };

  // Close modal
  const closeModal = () => {
    setSingleGameModal(false);
    setPlayGameState(false);
    setTransferPoints("");
    setGameBalance();
    setError();
    setLoader(false);
    setPendingModal();
    setMinValue();
    setMaxValue();
    setDaga && setDaga(false);
  };

  // play now button enable
  const isButtonEnabled = () => {
    switch (true) {
      case transferPoints && transferPoints?.charAt(0) == "0":
        setError("Vui lòng không nhập số bắt đầu bằng 0");
        return false;
      // if game balance is there no tp, allow play
      case Number(gameBalance) > 0 && !Number(transferPoints):
        console.log("in this condition");
        // console.log("gamebal > 0 no tp");
        return true;
      //no game balance no tp
      case !Number(gameBalance) && !Number(transferPoints) && !daga:
        console.log("in this condition");
        // console.log("gamebal ==0 0 no tp");
        return true;
      case daga && !Number(gameBalance) && !Number(transferPoints):
        console.log("in this condition");
        // console.log("gamebal ==0 0 no tp");
        return false;
      //daga and tp and tp includes decimal
      case daga && transferPoints && transferPoints?.includes("."):
        // console.log("daga decimal");
        setError("Giá trị thập phân không được chấp nhận");
        return false;
      //tp and tp includes decimal and length greater than 2
      case transferPoints &&
        transferPoints?.includes(".") &&
        transferPoints?.split(".")[1]?.length &&
        transferPoints?.split(".")[1].length > 2:
        // console.log(" decimal and lenght greater than 2");
        setError("Chỉ chấp nhận hai số thập phân");
        return false;
      //daga tp min max
      case daga &&
        transferPoints &&
        (Number(transferPoints) < minValue ||
          Number(transferPoints) > maxValue):
        // console.log("daga tp min max");
        return false;
      //other games tp is in min and max
      case Number(transferPoints) >= minValue &&
        maxValue &&
        Number(transferPoints) <= maxValue:
        // console.log("amount range");
        return true;
      //tp and minvalue only
      case Number(transferPoints) >= minValue && maxValue == null:
        // console.log("Smaller Min");
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    // console.log("button enabling");
    if (playGameState && gameBalance?.toString()) {
      setButtonEnabled(isButtonEnabled());
    }
  }, [playGameState, transferPoints, gameBalance]);

  return (
    <>
      <Modal
        open={playGameState ? true : false}
        BackdropComponent={Backdrop}
        BackdropProps={{
          // timeout: 5000,
          onClick: closeModal, // This ensures clicking on the backdrop closes the modal
        }}
      >
        <Box className={styles.modalTopOverlay}>
          <div
            className="modal"
            style={{ width: "100%", position: "relative" }}
          >
            <div className={styles.modalOverlay}>
              <div className={styles.modalWrapper}>
                <div className={styles.playGameheader}>
                  <span>Chuyển điểm</span>
                  {/* <span onClick={closeModal}>
                  <AiOutlineClose size={20} />
                </span> */}
                  <div className={styles.balanceSectionWrapper}>
                    <div className={styles.dbIconWrapper}>
                      <img src={dbIcon} alt="balance Img" />
                    </div>
                    <span>{`${CommaSeperator(ctx?.userInfo?.balance)} K`}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div className={styles.playGameBody}>
                    <div className={styles.playGameBodyDataHeading}>
                      <span>
                        {daga && "Daga"}{" "}
                        {singleGameModal && JsonFormate(singleGameModal.name)}
                      </span>
                      <span>
                        Chuyển điểm
                        <span style={{ marginLeft: "3px" }}>(K)</span>
                      </span>
                    </div>
                    <div className={styles.playGameBodyDataValue}>
                      {gameBalance || gameBalance == 0 ? (
                        !balanceloader ? (
                          <div className={styles.gameBalanceWrapper}>
                            <span
                              className={
                                gameBalance == "KHÔNG ĐƯỢC HỖ TRỢ" ||
                                gameBalance == "LỖI MẠNG" ||
                                gameBalance == "CẤM"
                                  ? styles.balanceError
                                  : styles.balance
                              }
                            >
                              {gameBalance == "LỖI MẠNG"
                                ? "LỖI MẠNG"
                                : gameBalance == "CẤM"
                                ? "CẤM"
                                : gameBalance == "KHÔNG ĐƯỢC HỖ TRỢ"
                                ? "KHÔNG ĐƯỢC HỖ TRỢ"
                                : gameBalance === 0
                                ? 0
                                : CommaSeperator(gameBalance)}
                            </span>

                            <img
                              src={Refresh}
                              alt="Refresh"
                              onClick={(e) => {
                                e.stopPropagation();
                                gameBalanceApi();
                              }}
                            />
                          </div>
                        ) : (
                          <MyLoader size={20} />
                        )
                      ) : (
                        <div className={styles.loaderWrapper}>
                          <MyLoader />
                        </div>
                      )}
                      <div className={styles.pointsContent}>
                        <input
                          type="number"
                          required={Number(gameBalance) <= 0 ? true : false}
                          placeholder={daga ? "150" : "1"}
                          value={transferPoints}
                          onChange={(e) => {
                            setTransferPoints(e.target.value);
                            setError();
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.transferAllBtnWrapper}>
                      {!loader &&
                        gameBalance !== null &&
                        gameBalance !== undefined &&
                        gameBalance !== "" && (
                          <div
                            className={styles.transferAllBtn}
                            onClick={() => playNow(ctx.userInfo?.balance)}
                          >
                            Chuyển tất cả điểm
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className={styles.loadingErrorWrapper}>
                  {error && <strong>{error}</strong>}
                  {loader && <MyLoader margin="15px 0 0 0" />}
                </div>

                {daga && convertedPointsRatio?.divide ? (
                  <p className={styles.pointsInfo}>
                    {convertedPointsRatio?.divide} = 1
                  </p>
                ) : (
                  !daga &&
                  !convertedPointsRatio?.multiply && (
                    <p className={styles.pointsInfo}>30 = 1</p>
                  )
                )}
                {!daga && convertedPointsRatio?.multiply && (
                  <p className={styles.pointsInfo}>
                    1 ={" "}
                    {CommaSeperator(
                      convertedPointsRatio?.multiply
                        ? 1 * convertedPointsRatio.multiply
                        : convertedPointsRatio?.divide
                        ? 1 / convertedPointsRatio.divide
                        : ""
                    )}
                  </p>
                )}

                <MaxMinLimit
                  min={minValue}
                  max={maxValue}
                  game={true}
                  transferPoints={transferPoints}
                />

                <PointsConverter
                  daga={daga}
                  transferPoints={transferPoints}
                  convertedPointsRatio={convertedPointsRatio}
                />

                {!loader &&
                  gameBalance !== null &&
                  gameBalance !== undefined &&
                  gameBalance !== "" && (
                    <div
                      className={
                        buttonEnabled?.toString() === "false"
                          ? styles.playGameFooterDisable
                          : styles.playGameFooter
                      }
                    >
                      <button
                        onClick={() => playNow(transferPoints)}
                        disabled={
                          buttonEnabled?.toString() === "false" ? true : false
                        }
                      >
                        Chơi ngay
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {pendingModal && (
        <PendingTransactionModal
          gameTransactionError={pendingModal}
          hideModal={() => {
            closeModal();
            setPendingModal(false);
          }}
        />
      )}
    </>
  );
};

export default PlayGameModal;

// {prevTransactionLoader ? (
//   <MyLoader />
// ) : prevTransactionError ? (
//   <strong style={{ color: "red", textAlign:'center', fontSize:'14px' }}>{prevTransactionError}</strong>
// ) : (
//   !loader && ( gameBalance > 0 || gameBalance == 0 ) && (
//     <div
//       className={
//         buttonEnabled?.toString() === "false"
//           ? styles.playGameFooterDisable
//           : styles.playGameFooter
//       }
//     >
//       <button
//         onClick={() => playNow(transferPoints)}
//         disabled={
//           buttonEnabled?.toString() === "false" ? true : false
//         }
//       >
//         Play Now
//       </button>
//     </div>
//   )
// )}

// if(daga && transferPoints.includes('.')){
//   // if points have decimal value only for DAGA
//   setError("Decimal error");
// } else
