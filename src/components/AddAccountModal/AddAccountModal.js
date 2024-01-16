import { Modal } from '@mui/material';
import styles from './AddAccountModal.module.css';
import { useState } from 'react';
import vietnamBankArray from "../../data/vietnamBankArray";
import { useEffect } from 'react';
import { AddAccountAPI, bankListAPI } from '../../helpers/APIs/BankAPIs';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import MyLoader from '../MyLoader';

const AddAccountModal = ({show, hideModal}) => {
  const [accNumber, setAccNumber] = useState("");
  const [bankName, setBankName] = useState(vietnamBankArray[0]);
  const [userName, setUserName] = useState("");
  const [bankExist, setBankExist] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    bankList();
  }, [show]);

  // get bank list Api
  const bankList = async () => {
    const allBanks = await bankListAPI();
    if (allBanks && allBanks.length) {
      setUserName(allBanks[0].User_name);
      setBankExist(true);
    }
  };

  // submit func
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accNumber.length <= 30) {
      setIsButtonDisabled(true);
      if (bankName && accNumber && userName && checkIfOnlyCapital(userName) &&
      checkIfOnlyNumbers(accNumber)) {
        setLoader(true);
        const x = await AddAccountAPI(bankName, accNumber, userName);
        if ( x.data.message == 'Please delete any previous bank') {
          setApiError('Vui lòng xóa mọi ngân hàng trước đó')
          setIsButtonDisabled(false);
        } else if ( x.data.message == 'The account number already exists in this bank') {
          setApiError('Số tài khoản ngân hàng đã được thành viên khác sử dụng')
          setIsButtonDisabled(false);
        } else {
          closeModal();
        }
      }
    }
  };

  // check if only capital
  const checkIfOnlyCapital = (value) => {
    if(value) {
      return /^[A-Z]*$/.test(value.replace(/\s+/g, ""));
    }
  };

 // check if only numbers
 const checkIfOnlyNumbers = (value) => {
  return /^[0-9]+$/.test(value);
};

  // reset all
  const closeModal = () => {
    hideModal()
    setUserName('')
    setAccNumber('')
    setBankName(vietnamBankArray[0])
    setBankExist('')
    setError('')
    setApiError('')
    setLoader(false);
    setIsButtonDisabled(false)
  }

  return (
    <Modal open={show ? true: false} onClose={hideModal}>
      <div className={styles.modalOverlay} onClick={(e) => closeModal()}>
        <div className={styles.modalWrapper} onClick={(e) => { e.stopPropagation()}}>
          <form onSubmit={handleSubmit} className={styles.addAccountFormWrapper}>
            <div>
              <div className={styles.requiredLabel}>
                <span>*</span>Tên tài khoản
              </div>
              <div
                className={`${styles.helptext} ${
                 checkIfOnlyCapital(userName) ? "" : styles.danger
                }`}
              >
                Tên tài khoản viết IN HOA, không dấu, không có số.
              </div>
              <div className={styles.inputItem} style={{ marginTop: "5px" }}>
                <input
                  style={{ border: "none" }}
                  readOnly={bankExist}
                  placeholder="＊ Tên tài khoản"
                  required
                  value={userName}
                  onChange={(e) =>{setUserName(e.currentTarget.value)}}
                />
              </div>
            </div>
            <div>
              <div className={styles.requiredLabel}>
                <span>*</span>Ngân Hàng
              </div>
              <div className={styles.addBankSelectWrapper}>
                <select
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  {vietnamBankArray.map((val, index) => (
                    <option key={index}>{val}</option>
                  ))}
                </select>
                <span>
                  <MdOutlineKeyboardArrowDown color="#DCF6FE" />
                </span>
              </div>
            </div>
            <div>
              <div className={styles.requiredLabel}>
                <span>*</span>Số Tài Khoản
              </div>
              <div className={styles.inputItem}>
                <CiCreditCard1
                  size={25}
                  style={{ color: "#DCF6FE", paddingLeft: "20px" }}
                />
                <input
                  style={{ border: "none" }}
                  placeholder="＊ Vui lòng nhập số tài khoản"
                  required
                  value={accNumber}
                  onChange={(e) => {
                    setAccNumber(e.target.value);
                  }}
                  minLength={1}
                  maxLength={30}
                />
              </div>
              {accNumber && !checkIfOnlyNumbers(accNumber) ? (
                  <div className={styles.errorMsg}>Vui lòng chỉ nhập số</div>
                ) : (
                  ""
                )}
              {apiError && 
                <div className={styles.errorMsg}>
                  {apiError}
                </div>
              }
            </div>
            {loader && <MyLoader />}
            <button 
              type="submit" 
              disabled={isButtonDisabled || !checkIfOnlyCapital(userName) || !checkIfOnlyNumbers(accNumber)} 
              className={`${styles.button} ${styles.submitButton} ${!checkIfOnlyCapital(userName) || !checkIfOnlyNumbers(accNumber) ? styles.disabled :"" } `}
            >
              Xác nhận
            </button>  
          </form>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => closeModal()}>
            Hủy
          </button>         
        </div>
      </div>
    </Modal>
  )
}

export default AddAccountModal