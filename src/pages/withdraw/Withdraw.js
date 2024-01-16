import { useEffect, useState } from "react";
import PopupErrorModal from "../../components/PopupErrorModal/PopupErrorModal";
import ProfileLayout from "../../layout/ProfileLayout/ProfileLayout";
import { withdrawAllowed } from "../../helpers/APIs/WithdrawAPI";
import SelectBank from "./SelectBank/SelectBank";
import { bankListAPI } from "../../helpers/APIs/BankAPIs";
import AddAccountModal from "../../components/AddAccountModal/AddAccountModal";
import WithdrawalAmount from "./WithdrawalAmount/WithdrawalAmount";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [errorModal, setErrorModal] = useState();
  const [withdrawerrorMessage, setWithdrawerrorMessage] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(true);
  const [bankErrorMessage, setBankErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [addAccountState, setAddAccountState] = useState(false);
  const [selectedBank, setSelectedBank] = useState([]);
  const [banks, setBanks] = useState();
  const [bankId, setBankId] = useState();

  // bank list API

  const bankList = async () => {
    setLoader(true);
    const allBanks = await bankListAPI();
    // console.log(allBanks, bankErrorMessage);
    if (allBanks?.length > 0) {
      setBanks(allBanks);
      setSelectedBank(allBanks && allBanks[0]);
      setBankId(allBanks[0] ? allBanks[0].id : null);
      setBankErrorMessage("");
    } else if (allBanks?.length <= 0 || allBanks == null) {
      setBankErrorMessage(
        "Chưa có thông tin ngân hàng. Vui lòng thêm ngân hàng để tiếp tục."
      );
      setBanks([]);
      setSelectedBank([]);
      setBankId(null);
    }
    setLoader(false);
  };

  const checkWithdrawAllow = async () => {
    try {
      const res = await withdrawAllowed();
      if (res.status === 200) {
        setIsWithdraw(res.data.status);
      }
    } catch (e) {}
  };

  useEffect(() => {
    bankList();
    checkWithdrawAllow();
    if (!isWithdraw) {
      setErrorModal(true);
      setWithdrawerrorMessage(
        // "your withdraw is disabled from admin kindy contact to custum service"
        "Tính năng rút tiền của bạn đã bị khoá, vui lòng liên hệ CS để được hỗ trợ."
      );
    }
  }, [isWithdraw, addAccountState]);

  return (
    // <ProfileLayout title="Withdraw">
    <>
      <div style={{ display: "flex", gap: "35px", flexDirection: "column" }}>
        <SelectBank
          amount={amount}
          withdrawerrorMessage={withdrawerrorMessage}
          loading={loading}
          setBankId={setBankId}
          banks={banks}
          bankId={bankId}
          bankErrorMessage={bankErrorMessage}
          loader={loader}
          setSelectedBank={setSelectedBank}
          setAddAccountState={setAddAccountState}
        />
        <WithdrawalAmount
          amount={amount}
          setAmount={setAmount}
          withdrawerrorMessage={withdrawerrorMessage}
          loading={loading}
          banks={banks}
          selectedBank={selectedBank}
          setWithdrawerrorMessage={setWithdrawerrorMessage}
          setErrorModal={setErrorModal}
          setLoading={setLoading}
          loader={loader}
        />
      </div>
      {errorModal && (
        <PopupErrorModal
          message={withdrawerrorMessage}
          show={errorModal}
          hideModal={() => {
            setErrorModal(false);
          }}
          rejectWithdraw={
            withdrawerrorMessage ===
            "Bạn có yêu cầu đang chờ xử lý. Bạn không thể tạo yêu cầu mới khi đang có yêu cầu chờ xử lý. Vui lòng yêu cầu lại sau."
              ? true
              : false
          }
          blockWithdraw={
            withdrawerrorMessage ===
            "Tính năng rút tiền của bạn đã bị khoá, vui lòng liên hệ CS để được hỗ trợ."
              ? true
              : false
          }
          modalClose={
            withdrawerrorMessage ===
              "Bạn có yêu cầu đang chờ xử lý. Bạn không thể tạo yêu cầu mới khi đang có yêu cầu chờ xử lý. Vui lòng yêu cầu lại sau." ||
            withdrawerrorMessage ===
              "Tính năng rút tiền của bạn đã bị khoá, vui lòng liên hệ CS để được hỗ trợ."
              ? false
              : true
          }
          bankId={selectedBank && selectedBank.id}
          transactionAmount={amount}
          bankAccountNumber={selectedBank && selectedBank.account_number}
          isWithdraw={isWithdraw}
        />
      )}
      <AddAccountModal
        show={addAccountState}
        hideModal={() => setAddAccountState(false)}
      />
    </>
    // </ProfileLayout>
  );
};

export default Withdraw;
