import { useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./PopupErrorModal.module.css";
import errorIcon from "../../assets/Error.webp";
import successIcon from "../../assets/Success.webp";
import { APIMakeDepositRequest } from "../../helpers/APIs/TransactionAPI";
import { useNavigate } from "react-router";
import { WithdrawAPI } from "../../helpers/APIs/WithdrawAPI";
// import { withdrawAllPoints } from '../helpers/APIs/GameAPIs';
// isWithdraw, setErrorMessage, setErrorModal,

const PopupErrorModal = ({
  message,
  show,
  hideModal,
  error = true,
  amount,
  selectedBankId,
  rejectDeposit = false,
  rejectWithdraw = false,
  blockDeposit = false,
  blockWithdraw = false,
  bankId,
  transactionAmount,
  bankAccountNumber,
  modalClose,
}) => {
  // invoiceFile,
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    setLoading(true);
    if (rejectDeposit) {
      // invoiceFile,
      const x = await APIMakeDepositRequest(amount, selectedBankId, true);
      if (x) {
        navigate("/profile/transactions");
      }
      // if (x === 'ERR_FILE_FORMAT_INVALID') {
      //   setErrorModal(true)
      //   setErrorMessage("Định dạng ảnh không phù hợp. Vui lòng liên CSKH để được hỗ trợ");
      // }
    } else if (rejectWithdraw) {
      await WithdrawAPI(
        bankId,
        transactionAmount * 1000,
        bankAccountNumber,
        true
      );
      navigate("/profile/transactions?tab=withdraw");
    }
    setLoading(false);
  };

  return (
    <Modal open={show ? true : false} onClose={hideModal}>
      <div
        className={styles.modalOverlay}
        onClick={() => {
          modalClose && hideModal();
        }}
      >
        <div
          className={styles.loadingSection}
          // onClick={(e) => e.stopPropagation()}
        >
          {error ? (
            <img src={errorIcon} className={styles.errorImg} alt="errorImg" />
          ) : (
            <img
              src={successIcon}
              className={styles.errorImg}
              alt="successImg"
            />
          )}
          <div className={styles.messageText}>{message}</div>

          {rejectDeposit || rejectWithdraw || blockDeposit || blockWithdraw ? (
            <div className={styles.rejectButtons}>
              {rejectDeposit || rejectWithdraw ? (
                <button
                  className={styles.okButton}
                  onClick={handleReject}
                  disabled={loading}
                >
                  Xóa và Tạo giao dịch mới
                </button>
              ) : (
                ""
              )}

              {blockDeposit || blockWithdraw ? (
                <button
                  className={`${styles.okButton} ${styles.csBtn}`}
                  onClick={() => window.open("https://cskhga6789.com/")}
                >
                  Hỗ trợ khách hàng
                </button>
              ) : (
                ""
              )}
              <button className={styles.okButton} onClick={() => navigate("/")}>
                OK
              </button>
            </div>
          ) : (
            ""
          )}

          {/* {message =="tiền gửi của bạn bị vô hiệu hóa từ quản trị viên, vui lòng liên hệ với dịch vụ tùy chỉnh" && (
            <div className={styles.rejectButtons}>
              <button onClick={() => navigate("/")}>OK</button>
            </div>
          )} */}
        </div>
      </div>
    </Modal>
  );
};

export default PopupErrorModal;
