import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import styles from "./SingleTransactionPopup.module.css";
import { APIGetSingleTransaction } from "../../../helpers/APIs/TransactionAPI";
import { addCommasToInput } from "../../../helpers/NumberHelper";
import CopyItem from "../../../components/CopyItem/CopyItem";
import TimeConverter from "../../../helpers/TimeConverter";

const SingleTransactionPopup = ({ show, hideModal, transactionId }) => {
  const [tranData, setTranData] = useState();

  // get single transaction
  useEffect(() => {
    transactionCall();
  }, []);

  // Single transaction API
  const transactionCall = async () => {
    const res = await APIGetSingleTransaction(
      localStorage.getItem("auth_token"),
      transactionId
    );
    setTranData(res);
  };

  // All items
  const items = [
    {
      label: "Ngân hàng nạp tiền",
      value: tranData ? tranData.bankable.bank_name : "Đang tải..",
      copy: false,
    },
    {
      label: "Tên tài khoản nhận",
      value: tranData ? tranData.bankable.bank_account_name : "Đang tải..",
      copy: false,
      fontSmall: true,
    },
    {
      label: "Số tài khoản",
      value: tranData
        ? tranData.bankable.bank_account_number &&
          tranData.bankable.bank_account_number.replace(/\d{4}(?=.)/g, "$& ")
        : "Đang tải..",
      copy: true,
    },
    {
      label: "Số tiền nạp",
      value: tranData
        ? addCommasToInput(tranData.transaction_amount)
        : "Đang tải..",
      copy: false,
    },
    {
      label: "Nội dung chuyển khoản",
      value: tranData ? tranData.user.phone : "Đang tải..",
      copy: true,
      redText: true,
    },
    {
      label: "Ngày",
      value: tranData
        ? TimeConverter(new Date(tranData.created_at).toISOString())
        : "Đang tải..",
      copy: false,
    },
    {
      label: "Trạng thái",
      value: tranData ? checkStatus(tranData.is_approved) : "Đang tải..",
      copy: false,
    },
  ];

  // add item if transaction status is 2 Rejected
  if (tranData && tranData.is_approved === 2) {
    items.push({
      label: "Lý do",
      value: tranData ? tranData.note : "Đang tải..",
      redText: true,
    });
  }

  return (
    <Modal open={show} onClose={hideModal}>
      <div className={styles.singleTranContentOverlay}>
        <div className={styles.singleTranContentWrapper}>
          <div className={styles.titleWrapper}>
            <h3>Giao dịch</h3>
            <span className={styles.closeIcon}>
              <AiOutlineClose className={styles.icon} onClick={hideModal} />
            </span>
          </div>
          {items.map((item, index) => (
            <CopyItem key={index} item={item} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SingleTransactionPopup;

// check Transaction Status
const checkStatus = (status) => {
  if (status === 0) {
    return "Đang chờ";
  } else if (status === 1) {
    return "Đã phê duyệt";
  } else if (status === 2) {
    return "Từ chối";
  } else if (status === 3) {
    return "Đang xử lý";
  } else if (status === 4) {
    return "Đang xử lý";
  }else {
    return "Từ chối";
  }
};
