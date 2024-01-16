import { useContext, useEffect, useState } from "react";
import styles from "./RightSection.module.css";
import PointsConverter from "../../../components/PointsConverter/PointsConverter";
import PopupErrorModal from "../../../components/PopupErrorModal/PopupErrorModal";
import {
  APIMakeDepositRequest,
  depositAllowed,
} from "../../../helpers/APIs/TransactionAPI";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../helpers/Context/user-context";
import MyLoader from "../../../components/MyLoader";
import InputTooltip from "../../../components/InputTooltip/InputTooltip";

const RightSection = ({ amount, setAmount, selectedBank }) => {
  const [isDeposit, setIsDeposit] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [isDepositLoader, setIsDepositLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rejectDeposit, setRejectDeposit] = useState(false);
  const [loading, setLoading] = useState(false);

  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  // check deposit block API
  useEffect(() => {
    checkDiposetAllow();
  }, []);

  // deposit blocked API
  const checkDiposetAllow = async () => {
    try {
      setIsDepositLoader(true);
      const res = await depositAllowed();
      if (res.status === 200) {
        setIsDeposit(res.data.status);
        setIsDepositLoader(false);
      }
    } catch (e) {
      setIsDepositLoader(false);
    }
  };

  // amount onChange
  const onDepositAmountChange = (val) => {
    if(isNaN(val) || val.includes('.')){
      setAmount(val);
      setErrorMessage("Vui lòng chỉ nhập số không có giá trị thập phân")
    }
   else if (!isNaN(val)) {
      setAmount(val);
      setErrorMessage("")
    }
  };

  const sugestedAmount = [
    { label: "150", value: "150" },
    { label: "300", value: "300" },
    { label: "900", value: "900" },
    { label: "3 Triệu", value: "3000" },
    { label: "30 Triệu", value: "30000" },
  ];

  // deposit submit
  const sendDepositRequest = async () => {
    if (selectedBank && selectedBank.id && amount) {
      const x = await APIMakeDepositRequest(amount, selectedBank.id);
      // console.log(x);
      if (!x) {
        setErrorModal(true);
        setErrorMessage(
          "Đã có lỗi trong quá trình nạp tiền. Vui lòng liên hệ Chăm sóc khách hàng"
        );
      } else if (x === "WAIT_PLEASE") {
        setErrorModal(true);
        setRejectDeposit(true);
        setErrorMessage(
          "Bạn có yêu cầu đang chờ xử lý. Bạn không thể tạo yêu cầu mới khi đang có yêu cầu chờ xử lý. Vui lòng yêu cầu lại sau."
        );
      } else {
        return x;
      }
    }
    return null;
  };

  const myDate = new Date();

  //submit func
  const onDepositSubmitClicked = async (e) => {
    e.preventDefault();
    if (
      !amount ||
      amount < 150 ||
      amount > 90000 ||
      !selectedBank ||
      amount.includes(".")
    ) {
      return;
    } else {
      setLoading(true);
      const deposit = await sendDepositRequest();
      if (deposit) {
        if (!ctx.userInfo?.user_id && !ctx.userInfo?.user_name) {
          // set time for first deposit after registeration
          localStorage.setItem("initialDeposit", myDate);
          navigate("/");
        } else {
          navigate("/profile/transactions");
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.rightSectionOverlay}>
      <div className={styles.rightSectionWrapper}>
        

        {/* <div className={styles.depositInput}>
          <div className={styles.requiredLabel}>
            <span>* </span>Số điểm nạp
          </div>
          
          <input
            value={amount}
            type="number"
            placeholder="150 ~ 90,000"
            onChange={(e) => onDepositAmountChange(e.target.value)}
          />

          {amount && (
            <AiOutlineCloseCircle
              onClick={() => {
                setAmount("");
              }}
              className={styles.cancelIcon}
            />
          )}

          <div  className={styles.tooltipWrapper}>
            { amount && amount < 150 || amount > 90000 ? (
            <>
              <div className={styles.tooltip}>
                <span>150 ~ 90,000</span>
                <div className={styles.arrowDown}>
                  <img src={triangle} alt="arrow"/>
                </div>
              </div>
          
            </>
          ) : (
            ""
          )}
          </div>
        </div> */}
        <InputTooltip errorMessage={errorMessage} amount={amount} setAmount={setAmount} title={"Số điểm nạp"} onAmountChange={onDepositAmountChange}/>
        <div className={styles.errorMsg}>{errorMessage}</div>
        <PointsConverter transferPoints={amount} deposit={true} />

        {amount && (
          <div className={styles.depositButtonSection}>
            {sugestedAmount.map((item) => (
              <button
                onClick={() => onDepositAmountChange(item.value)}
                className={styles.depositButton}
                key={item.label}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className={styles.loader}>
            <MyLoader size={30} />
          </div>
        )}

        <button
          className={`${styles.submitButton} ${
            loading||
            !amount ||
            amount < 150 ||
            amount > 90000 ||
            !selectedBank ||
            amount.includes(".")
              ? styles.disabled
              : ""
          }`}
          onClick={onDepositSubmitClicked}
          disabled={isDepositLoader || !isDeposit || loading }
        >
          Tiếp theo
        </button>

        {errorModal && (
          <PopupErrorModal
            show={errorModal}
            setErrorMessage={setErrorMessage}
            setErrorModal={setErrorModal}
            message={errorMessage}
            hideModal={() => {
              setErrorModal(false);
              setRejectDeposit(false);
              setErrorMessage(null);
            }}
            selectedBankId={selectedBank.id}
            rejectDeposit={rejectDeposit}
            amount={amount}
            modalClose={ errorMessage == 'Bạn có yêu cầu đang chờ xử lý. Bạn không thể tạo yêu cầu mới khi đang có yêu cầu chờ xử lý. Vui lòng yêu cầu lại sau.' ? false : true}
          />
        )}
      </div>
    </div>
  );
};

export default RightSection;
