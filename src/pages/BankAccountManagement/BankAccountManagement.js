import styles from "./BankAccountManagement.module.css";
import ProfileLayout from "../../layout/ProfileLayout/ProfileLayout";
import { useState, useEffect } from "react";
import { bankListAPI } from "../../helpers/APIs/BankAPIs";
import MyLoader from "../../components/MyLoader";
import AddAccountModal from "../../components/AddAccountModal/AddAccountModal";

const BankAccountManagement = () => {
  const [banks, setBanks] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(null);
  const [addAccountState, setAddAccountState] = useState(false);

  // user bank list
  useEffect(() => {
    bankList();
    setErrorMessage("");
  }, [addAccountState]);

  // bank list API
  const bankList = async () => {
    setLoader(true);
    const allBanks = await bankListAPI();
    if (allBanks?.length == 0 || allBanks == null) {
      setErrorMessage(
        "Chưa có thông tin ngân hàng. Vui lòng thêm ngân hàng để tiếp tục."
      );
      setBanks([]);
    } else {
      setBanks(allBanks);
    }
    setLoader(false);
  };

  // disable Bank API
  // const disableBankApi = async (id) => {
  //   setLoader(true)
  //   setDeleteLoader(id);
  //   const disableApiRes = await disableBankAPI(id);
  //   if (disableApiRes?.length > 0) {
  //     setBanks(disableApiRes);
  //   } else  {
  //     setErrorMessage("Chưa có thông tin ngân hàng. Vui lòng thêm ngân hàng để tiếp tục.");
  //     setBanks([]);
  //   }
  //   setDeleteLoader(null);
  //   setLoader(false)
  // };

  return (
    // <ProfileLayout title='Bank Account Management'>
    <>
      <div className={styles.bankAccountWrapper}>
        <div className={styles.allBanksOverlay}>
          {errorMessage ? (
            <div className={styles.errorMsg}>{errorMessage}</div>
          ) : banks && banks?.length ? (
            <div className={styles.banksSection}>
              {banks &&
                banks?.slice(0, 3).map((bank) => {
                  return (
                    <div className={styles.bankCardWrapper} key={bank.id}>
                      <div className={styles.bankCard}>
                        <span>{bank.User_name}</span>
                        <div className={styles.bankCardContent}>
                          <span>{bank.bank_name}</span>
                          <span style={{ paddingLeft: "10px" }}>
                            {bank.account_number}
                          </span>
                        </div>
                      </div>
                      {/*
                      <div className={styles.deleteBankImage}>
                        {deleteLoader == bank.id ? (
                          <MyLoader size={15} />
                        ) : (
                          <img
                            src={deleteImg}
                            alt="delete bank"
                            onClick={() => disableBankApi(bank.id)}
                          />
                        )}
                      </div>
                    */}
                    </div>
                  );
                })}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <MyLoader />
            </div>
          )}
        </div>
        <div
          className={`${styles.addBnksBtn} ${
            (banks?.length >= 3 || loader) && styles.disabled
          }`}
          onClick={() => {
            banks?.length < 3 && !loader && setAddAccountState(true);
          }}
        >
          + &nbsp;Thêm ngân hàng
        </div>
      </div>
      {addAccountState && (
        <AddAccountModal
          show={addAccountState}
          hideModal={() => setAddAccountState(false)}
        />
      )}
      {/* </ProfileLayout> */}
    </>
  );
};

export default BankAccountManagement;
