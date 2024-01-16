import { useNavigate } from "react-router-dom";
import styles from "./LoginButtons.module.css";

const LoginButtons = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.loginButtonsOverlay}>
      <button onClick={() => navigate("/login")}>Đăng Nhập</button>
      <button onClick={() => navigate("/register")}>Đăng Ký</button>
    </div>
  );
};

export default LoginButtons;
