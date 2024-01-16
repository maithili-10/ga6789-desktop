import { useContext, useEffect, useState } from "react";
import { APIGetCompanyBanks } from "../../helpers/APIs/BankAPIs";
import UserContext from "../../helpers/Context/user-context";
import ProfileLayout from "../../layout/ProfileLayout/ProfileLayout";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";
import PopupErrorModal from "../../components/PopupErrorModal/PopupErrorModal";
import { depositAllowed } from "../../helpers/APIs/TransactionAPI";

const Deposit = () => {
  const [isDeposit, setIsDeposit] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [depositPermissionError, setDepositPermissionError] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [companyBanks, setCompanyBanks] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const ctx = useContext(UserContext);

  // companybanks, user Data
  useEffect(() => {
    getCompanyBanks();
    checkDiposetAllow();
  }, []);

  //  get company all bank list
  const getCompanyBanks = async () => {
    if (localStorage.getItem("auth_token")) {
      const x = await APIGetCompanyBanks();
      if (!x) {
        setErrorMessage("Đã xảy ra lỗi, vui lòng liên hệ Chăm sóc khách hàng");
      } else if (x.length == 0) {
        setErrorMessage(
          "Không tim thấy ngân hàng nạp tiền. Vui lòng liên hệ CSKH"
        );
      } else {
        if (x && x.length) {
          setCompanyBanks(x);
          const defaultBank = x?.filter((bank) => bank.is_default === 1);
          if (defaultBank.length) {
            setSelectedBank(defaultBank[0]);
          } else {
            setSelectedBank(x[0]);
          }
        }
      }
    }
  };

  // deposit blocked API
  const checkDiposetAllow = async () => {
    try {
      const res = await depositAllowed();
      if (res.status === 200) {
        setIsDeposit(res.data.status);
      }
    } catch (e) {}
  };

  // set block deposit error
  useEffect(() => {
    if (!isDeposit) {
      setErrorModal(true);
      setDepositPermissionError(
        "Tính năng nạp tiền của bạn đã bị khoá, vui lòng liên hệ CS để được hỗ trợ."
      );
    }
  }, [isDeposit]);

  return (
    // <ProfileLayout title='Deposit'>
    <>
      <div style={{ display: "flex" }}>
        <LeftSection
          companyBanks={companyBanks}
          errorMessage={errorMessage}
          selectedBank={selectedBank}
          amount={amount}
          setSelectedBank={setSelectedBank}
        />
        <RightSection
          amount={amount}
          setAmount={setAmount}
          selectedBank={selectedBank}
        />
      </div>
      {errorModal && (
        <PopupErrorModal
          message={depositPermissionError}
          show={errorModal}
          hideModal={() => setErrorModal(false)}
          blockDeposit={
            depositPermissionError ===
            "Tính năng nạp tiền của bạn đã bị khoá, vui lòng liên hệ CS để được hỗ trợ."
              ? true
              : false
          }
          modalClose={
            depositPermissionError ===
            "Tính năng nạp tiền của bạn đã bị khoá, vui lòng liên hệ CS để được hỗ trợ."
              ? false
              : true
          }
          isDeposit={isDeposit}
        />
      )}
    </>
    // </ProfileLayout>
  );
};

export default Deposit;
