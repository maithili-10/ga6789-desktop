import { useContext } from "react";
import styles from "./WithdrawalAmount.module.css";
import StepComponent from "../../../components/StepComponent/StepComponent";
import WithdrawBal from "../../../assets/WithdrawBalance.webp";
import UserContext from "../../../helpers/Context/user-context";
import CommaSeperator from "../../../components/CommaSeperator";
import MyLoader from "../../../components/MyLoader";
import { WithdrawAPI } from "../../../helpers/APIs/WithdrawAPI";
import { useNavigate } from "react-router-dom";
import InputTooltip from "../../../components/InputTooltip/InputTooltip";

const WithdrawalAmount = ({
  amount,
  setAmount,
  withdrawerrorMessage,
  loading,
  banks,
  selectedBank,
  isWithdraw,
  setLoading,
  setWithdrawerrorMessage,
  setErrorModal,
  loader,
}) => {
  const ctx = useContext(UserContext);

  const navigate = useNavigate();
  //submit withdraw function
  const submitWithdraw = async () => {
    if (selectedBank && amount) {
      // console.log('API call')
      setLoading(true);
      const x = await WithdrawAPI(
        selectedBank.id,
        amount * 1000,
        selectedBank.account_number
      );
      if (x === "Account Not Activated") {
        setWithdrawerrorMessage(
          "Tài khoản của bạn chưa được kích hoạt vui lòng gửi tiền trước"
        );
      } else if (x === "PLAYER_NOT_ALLOWED_TO_WITHDRAW") {
        setErrorModal(true);
        setWithdrawerrorMessage(
          "Tài khoản của bạn đang tạm khóa chức năng rút tiền, vui lòng liên hệ Chăm sóc khách hàng"
        );
      } else if (x === "INSUFFICIENT_BALANCE") {
        setErrorModal(true);
        setWithdrawerrorMessage(
          "Bạn không có đủ số dư để thực hiện giao dịch này"
        );
      } else if (x === "WAIT_PLEASE") {
        setErrorModal(true);
        setWithdrawerrorMessage(
          "Bạn có yêu cầu đang chờ xử lý. Bạn không thể tạo yêu cầu mới khi đang có yêu cầu chờ xử lý. Vui lòng yêu cầu lại sau."
        );
      } else if (x === "MAKE_DEPOSIT_REQUEST_FIRST") {
        setErrorModal(true);
        setWithdrawerrorMessage("Yêu cầu đặt cọc trước");
      } else {
        if (x?.status) {
          setLoading(false);
          navigate("/profile/transactions?tab=withdraw");
        } else if (x?.message === "not enough money") {
          setWithdrawerrorMessage("Số dư không đủ");
        }
      }
    }
  };
  // amount onChange
  const onWithdrawAmountChange = (val) => {
    if (!isNaN(val)) {
      setAmount(val);
    }
  };

  return (
    <div className={styles.WithdrawBalanceOverlay}>
      <div className={styles.WithdrawBalanceWrapper}>
        <StepComponent
          image={WithdrawBal}
          step={"Bước 2"}
          title={"Nhập Số tiền rút"}
        />
        <div className={styles.withdrawOverlay}>
          <div className={styles.withdrawCard}>
            <div className={styles.balanceLabel}>
              <span>Số tiền hiện tại: </span>
              <span>
                {ctx.userInfo?.balance ? (
                  `${CommaSeperator(ctx?.userInfo?.balance)} K`
                ) : (
                  <MyLoader size={15} margin="0 0 0 10px" />
                )}
              </span>
            </div>

            <InputTooltip
              amount={amount}
              setAmount={setAmount}
              title={"Số tiền rút"}
              onAmountChange={onWithdrawAmountChange}
              withdraw={true}
            />
            {!Number(amount) ? (
              <p className={styles.errorMsg}>Vui lòng nhập số tiền</p>
            ) : (
              ""
            )}
            {selectedBank?.length <= 0 || banks?.length <= 0 ? (
              <p className={styles.errorMsg}>
                Không có ngân hàng nào được chọn
              </p>
            ) : (
              ""
            )}

            {Number(amount) && Number(amount) < 100 ? (
              <p className={styles.errorMsg}>
                Số tiền rút tối thiểu từ 100 trở lên
              </p>
            ) : (
              ""
            )}
            {Number(amount) > 100000 ? (
              <p className={styles.errorMsg}>
                Số tiền rút vượt quá giới hạn 100,000 triệu
              </p>
            ) : (
              ""
            )}

            {amount &&
            Number(amount) &&
            (Number(amount) < 100 ||
              Number(amount) > 100000 ||
              Number(amount) > ctx?.userInfo?.balance) ? (
              <p className={styles.errorMsg}>
                "Bạn không có đủ số dư để thực hiện giao dịch này"
              </p>
            ) : (
              ""
            )}
            {amount?.toString()?.includes(".") &&
            amount?.toString()?.split(".")[1]?.length &&
            amount?.toString()?.split(".")[1].length > 2 ? (
              <p className={styles.errorMsg}>
                "Vui lòng nhập các số có nhỏ hơn hoặc bằng 2 dấu thập phân"
              </p>
            ) : (
              ""
            )}

            {/* {console.log("condition",!amount || amount  < 100||amount  > 90000||amount > ctx?.userInfo?.balance  || selectedBank?.length <= 0 )} */}
            {withdrawerrorMessage ? (
              <button
                className={styles.withdrawBtn}
                onClick={() =>
                  window.open(
                    "https://core2.vchat.vn/service/chat?code=18457&jwt=b7f4453260ba5cf7621e9dbc032e5d58"
                  )
                }
              >
                {" "}
                Customer Support
              </button>
            ) : loading ? (
              <MyLoader margin="40px 0 50px 0" size={25} color="#CBCBCB" />
            ) : banks && banks?.length > 0 ? (
              <button
                onClick={submitWithdraw}
                className={`${styles.withdrawBtn} ${
                  !amount ||
                  amount < 100 ||
                  amount > 90000 ||
                  amount > ctx?.userInfo?.balance ||
                  selectedBank?.length <= 0 ||
                  (amount?.toString()?.includes(".") &&
                    amount?.toString()?.split(".")[1]?.length &&
                    amount?.toString()?.split(".")[1].length > 2)
                    ? styles.disabled
                    : ""
                }`}
                disabled={
                  !amount ||
                  amount < 100 ||
                  amount > 90000 ||
                  amount > ctx?.userInfo?.balance ||
                  selectedBank?.length <= 0 ||
                  (amount?.toString()?.includes(".") &&
                    amount?.toString()?.split(".")[1]?.length &&
                    amount?.toString()?.split(".")[1].length > 2)
                }
              >
                nộp
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalAmount;
