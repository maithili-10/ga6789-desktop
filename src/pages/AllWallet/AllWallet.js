import AllGameStatusModal from "../../components/Header/HeaderComponents/AllGameStatusModal/AllGameStatusModal";
import styles from "./AllWallet.module.css";

const AllWallet = () => {
  return (
    <div className={styles.allWalletOverlay}>
      <AllGameStatusModal allWallet={true} />
    </div>
  );
};

export default AllWallet;
