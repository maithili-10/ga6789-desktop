import styles from "./CustomerSupportAnimatedItem.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

const CustomerSupportAnimatedItem = () => {
  return (
    <div
      className={styles.buttonWrapper}
      onClick={() => window.open("https://cskhga6789.com/")}
    >
      <span>
        <FaHandPointRight size={20} />
      </span>
      <span>
        <IoIosCall size={20} /> Hỗ trợ
      </span>
    </div>
  );
};

export default CustomerSupportAnimatedItem;
