import { Modal } from "@mui/material";
import styles from "./LogoutConfirmationModal.module.css";
import LogoutImg from "./../../assets/LogoutConfirm.webp";
import useLogout from "../../helpers/useLogout";

const LogoutConfirmationModal = ({ logoutModal, closeLogoutModal }) => {
  const logout = useLogout()
  
  return (
    <Modal open={logoutModal}>
      <div className={styles.modalOverlay} onClick={closeLogoutModal}>
        <div
          className={styles.logoutOverlay}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.logoutImgwrapper}>
            <div>
              <img src={LogoutImg} alt="logout" width={45} />
            </div>
            <p>Đăng xuất</p>
          </div>
          <div className={styles.logoutMsg}>
            Bạn có chắc chắn rằng bạn muốn <br /> thoát ra?
          </div>
          <div className={styles.logoutButtons}>
            <button onClick={closeLogoutModal}>Không, ở lại</button>
            <button onClick={() => {logout(); closeLogoutModal()}}>Vâng, rời đi</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmationModal;