import React from "react";
import Modal from "@mui/material/Modal";
import styles from "./PendingTransactionModal.module.css";
// import { useNavigate } from "react-router";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { withdrawAllPoints } from '../helpers/APIs/GameAPIs';
// isWithdraw, setErrorMessage, setErrorModal,

const PendingTransactionModal = ({ gameTransactionError, hideModal }) => {
  // console.log(gameTransactionError)

  return (
    <Modal
      open={gameTransactionError ? true : false}
      onClose={hideModal}
      onClick={hideModal}
    >
      <div className={styles.modalOverlay} onClick={hideModal}>
        <div
          className={styles.loadingSection}
          onClick={(e) => e.stopPropagation()}
        >
          <span>
            {gameTransactionError?.message == "PENDING_TRANSACTION"
              ? "Không thể chuyển điểm vào trò chơi vì đã có một yêu cầu chuyển điểm đang chờ xử lý."
              : gameTransactionError?.message == "PENDING_DEPOSIT"
              ? "Đang thực hiện chuyển điểm vào trò chơi. Điểm sẽ được chuyển thành công trong vài phút. Cám ơn vì sự kiên nhẫn của bạn."
              : gameTransactionError?.message == "PLEASE_DEPOSIT"
              ? "Tài khoản của bạn không đủ số dư để chuyển điểm vào trò chơi. Vui lòng nạp tiền vào tài khoản."
              : gameTransactionError}
          </span>

          <div className={styles.rejectButtons}>
            {typeof gameTransactionError == "object" && (
              <button
                className={styles.gameButton}
                onClick={() => {
                  hideModal();
                  window.open(gameTransactionError.link);
                }}
              >
                Game Link
              </button>
            )}
            <button
              className={styles.okButton}
              onClick={() => {
                hideModal();
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PendingTransactionModal;
