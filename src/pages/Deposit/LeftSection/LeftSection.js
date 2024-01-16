import { useContext } from 'react';
import MyLoader from '../../../components/MyLoader'
import UserContext from '../../../helpers/Context/user-context';
import styles from './LeftSection.module.css'
import CopyItem from '../../../components/CopyItem/CopyItem';
import CommaSeperator from '../../../components/CommaSeperator';

const LeftSection = ({ companyBanks, errorMessage, selectedBank, amount, setSelectedBank }) => {
  const ctx=useContext(UserContext)

  // .replace(/\d{4}(?=.)/g, "$& ")
  // user card data
  const items = [
    {
      label: "Ngân hàng nạp tiền",
      value: selectedBank ? selectedBank.bank_name : "Đang tải..",
      copy: false,
    },
    {
      label: "Tên tài khoản nhận",
      value: selectedBank ? selectedBank.bank_account_name : "Đang tải..",
      copy: false,
      fontSmall: true,
    },
    {
      label: "Số tài khoản",
      value: selectedBank
        ? selectedBank.bank_account_number
        : "Đang tải..",
      copy: true,
    },
    {
      label: "Số tiền nạp",
      value: amount ? CommaSeperator(amount * 1000) : 0,
      copy: false,
    },
    {
      label: "Nội dung chuyển khoản",
      value: ctx?.userInfo?.phone ? ctx.userInfo?.phone : "Đang tải..",
      copy: true,
      redText: true,
    },
  ];
  
  return (
    <div className={styles.leftSection}>
      {errorMessage ? (
        <p className={styles.errorMsg}>{errorMessage}</p>
      ) : (
        <div className={styles.companyBankSection}>
          {companyBanks && companyBanks.length ? (
            companyBanks.map((bank) => (
              <div
                className={`${styles.singleBankItem} ${
                  selectedBank && selectedBank.id === bank.id
                    ? styles.selectedBank
                    : ""
                }`}
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
              >
                <img src={bank.bank_image} alt="bankImg" />
              </div>
            ))
          ) : (
            <MyLoader/>
          )}
          <div className={styles.goldMessage}>
            Để » NẠP TIỀN « Chuyển khoản cho chúng tôi theo thông tin bên dưới đây
          </div>
          <div className={styles.userInfo}>
            {items.map((item, index) => (
              <CopyItem key={index} item={item} />
            ))}
          </div>
          <div className={styles.suggestMsg}>
            <p>
              Lưu ý: Điền chính xác mã{" "}
              <strong style={{ color: "#FF0000", fontSize: "20px" }}>
                "{ctx?.userInfo?.phone && ctx?.userInfo.phone}"
              </strong>{" "}
              vào mục "Nội dung/Lời nhắn"
            </p>
            <p>
              Thiếu NỘI DUNG CHUYỂN KHOẢN, GA6789 sẽ không thể nhận ra khoản
              chuyển từ Quý khách
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeftSection

//   <input
//     type="radio"
//     value={bank}
//     checked={selectedBank && selectedBank.id === bank.id}
//     onChange={() => setSelectedBank(bank)}
//     name={bank}
//   />
