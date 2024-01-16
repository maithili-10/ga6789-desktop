import { useContext, useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import ProfileLayout from "../../layout/ProfileLayout/ProfileLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { addCommasToNumber } from "../../helpers/NumberHelper";
import { APIGetAllTransactions } from "../../helpers/APIs/TransactionAPI";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import MyLoader from "../../components/MyLoader";
import UserContext from "../../helpers/Context/user-context";
import TimeConverter from "../../helpers/TimeConverter";
import SingleTransactionPopup from "./SingleTransactionPopup/SingleTransactionPopup";

const Transactions = () => {
  const { search } = useLocation();
  const [transections, setTransections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState(false);
  const [activeTab, setActiveTab] = useState(search ? "2" : "1");
  const ctx = useContext(UserContext);
  const [singleTransactionModal, setSingleTransactionModal] = useState(false);
  const [transactionId, setTransactionId] = useState();

  // get transactions
  useEffect(() => {
    transactionsAPI();
  }, []);

  // transaction API
  const transactionsAPI = async () => {
    setLoading(true);
    const res = await APIGetAllTransactions(localStorage.getItem("auth_token"));
    if (res) {
      setTransections(res);
      setSelectedTransactions(
        res.filter(
          (t) => t.transaction_purpose === (search ? "withdraw" : "deposit")
        )
      );
    } else {
      setTransections([]);
    }
    setLoading(false);
  };

  // Tabs change
  const handleChange = (e, newValue) => {
    setActiveTab(newValue);
    if (newValue === "1") {
      setSelectedTransactions(
        transections.filter((t) => t.transaction_purpose === "deposit")
      );
    } else {
      setSelectedTransactions(
        transections.filter((t) => t.transaction_purpose === "withdraw")
      );
    }
  };

  return (
    // <ProfileLayout title="Transactions">
    <>
      <div className={styles.transactionWrapper}>
        <Tabs
          variant="fullWidth"
          value={activeTab}
          onChange={loading !== true ? handleChange : null}
          sx={{ "& button.Mui-selected": { color: "#DCF6FE" } }}
          TabIndicatorProps={{ style: { backgroundColor: "#FFEB72" } }}
        >
          <Tab label="Nạp Tiền" value="1" />
          <Tab label="Rút Tiền" value="2" />
        </Tabs>
        {loading ? (
          <MyLoader margin="20px" />
        ) : transections.length > 0 && selectedTransactions ? (
          <div className={styles.transactionTable}>
            <table>
              <thead>
                <tr>
                  <th>{activeTab === "1" ? "Số Tiền Nạp" : "Số Tiền Rút"}</th>
                  <th>Ngày</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              {selectedTransactions &&
                selectedTransactions.map((transection) => {
                  // console.log(transection);
                  return (
                    <tbody key={transection.id}>
                      <tr
                        onClick={() => {
                          setSingleTransactionModal(true);
                          setTransactionId(transection.id);
                        }}
                      >
                        <td>
                          {transection.transaction_purpose == "deposit"
                            ? "+"
                            : "-"}
                          {addCommasToNumber(transection.transaction_amount)}
                        </td>
                        <td>
                          {TimeConverter(
                            new Date(transection.created_at).toISOString([])
                          )}
                        </td>
                        <td>{TransactionStatusChip(transection)}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        ) : (
          <h3>Không có giao dịch</h3>
        )}
      </div>
      {singleTransactionModal && (
        <SingleTransactionPopup
          show={singleTransactionModal}
          hideModal={() => setSingleTransactionModal(false)}
          transactionId={transactionId}
        />
      )}
      {/* </ProfileLayout> */}
    </>
  );
};

export default Transactions;

// ytransaction chip component
const TransactionStatusChip = (transection) => {
  return (
    <span
      className={`${styles.chip} 
      ${
        transection.is_approved === 0
          ? styles.pendingChip
          : transection.is_approved === 1
          ? styles.successChip
          : transection.is_approved === 2
          ? styles.rejectChip
          : transection.is_approved === 3 //processing deposit
          ? styles.processingChip
          : transection.is_approved === 4 //processing withdraw
          ? styles.processingChip
          : styles.rejectChip
      }`}
    >
      {transection.is_approved === 0
        ? "Đang chờ"
        : transection.is_approved === 1
        ? "Đã phê duyệt"
        : transection.is_approved === 2
        ? "Từ chối"
        : transection.is_approved === 3 //processing deposit
        ? "Đang xử lý"
        : transection.is_approved === 4 //processing withdraw
        ? "Đang xử lý"
        : "Từ chối"}
    </span>
  );
};

// transaction status
// STATUS_PENDING = 0;//Đang chờ
// STATUS_SUCCESS = 1;//Đã phê duyệt
// STATUS_REJECT = 2;//Từ chối
// STATUS_PROCESSING = 3;//Đang xử lý(deposit-processing)
// STATUS_PROCESSING = 4;//Đang xử lý(withdraw-processing)
