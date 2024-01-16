import React from "react";
import styles from "./SelectBank.module.css";
import StepComponent from "../../../components/StepComponent/StepComponent";
import PointsConverter from "../../../components/PointsConverter/PointsConverter";
import MyLoader from "../../../components/MyLoader";
import TransferPoints from "../../../assets/TransferPoints.webp";
import AddImage from "../../../assets/Add.webp";

const SelectBank = ({
  setSelectedBank,
  setBankId,
  banks,
  bankId,
  bankErrorMessage,
  amount,
  setAddAccountState,
}) => {
  return (
    <div className={styles.SelectBankOverlay}>
      <div className={styles.SelectBankWrapper}>
        <StepComponent
          image={TransferPoints}
          step={"Bước 1"}
          title={"Chọn ngân hàng"}
        />
        <div className={styles.BankSectionOverlay}>
          <span className={styles.selectBankHeader}>Chọn ngân hàng</span>
          {bankErrorMessage && (
            <div className={styles.noBanksMsg}>{bankErrorMessage}</div>
          )}
          <div className={styles.BankSectionWrapper}>
            {banks && banks?.length > 0
              ? banks?.slice(0, 3).map((bank) => {
                  return (
                    <div
                      className={styles.bankCardWrappwr}
                      key={bank.id}
                      onClick={() => {
                        setBankId(bank.id);
                        setSelectedBank(bank);
                      }}
                    >
                      <div
                        className={`${styles.bankCard} ${
                          bankId == bank.id ? styles.selectedBank : ""
                        }`}
                      >
                        <div className={styles.bankCardContent}>
                          <span>{bank.User_name}</span>
                          <div>{bank.bank_name}</div>
                          <span
                            style={{
                              display: "inline-block",
                              wordBreak: "break-word",
                            }}
                          >
                            {bank.account_number}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : banks == undefined && (
                  <div style={{ width: "100%" }}>
                    <MyLoader />
                  </div>
                )}

            <>
              {(() => {
                const arr = [];
                for (let i = 0; i <= 3; i++) {
                  arr.push(
                    banks && banks?.length < i && (
                      <div key={i}>
                        <AddBank setAddAccountState={setAddAccountState} />
                      </div>
                    )
                  );
                }
                return arr;
              })()}
            </>
          </div>
          <PointsConverter transferPoints={amount} withdraw={true} />
        </div>
      </div>
    </div>
  );
};

export default SelectBank;
const AddBank = ({ setAddAccountState }) => {
  return (
    <div
      className={styles.AddBankBtnWrapper}
      onClick={() => setAddAccountState(true)}
    >
      <div className={styles.AddBankBtn}>
        <img src={AddImage} alt="add" />
        <span>Thêm ngân hàng</span>
      </div>
    </div>
  );
};
