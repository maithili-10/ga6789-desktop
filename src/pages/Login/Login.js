import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import {
  APICheckIfPhoneExists,
  APILoginUser,
} from "../../helpers/APIs/UserAPIs";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context/user-context";
import { AiOutlineArrowLeft } from "react-icons/ai";
import LoginPopupModal from "./LoginPopupModal/LoginPopupModal";
import MyLoader from "../../components/MyLoader";
import OpenEye from "../../assets/LoginIcons/OpenEye.webp";
import CloseEye from "../../assets/LoginIcons/CloseEye.webp";
import Logo from "../../assets/HeaderIcons/GA6789 Logo.webp";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [addPassword, setAddPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [popupError, setPopupError] = useState("");
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  // No of requests for login
  useEffect(() => {
    if (localStorage.getItem("loginRequest")) {
      setCount(localStorage.getItem("loginRequest"));
    }
  }, []);

  // Submit function
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (phone && phone.length === 10 && !addPassword) {
        const checkPhone = await APICheckIfPhoneExists(phone);
        if (checkPhone) {
          setAddPassword(true);
        } else {
          setErrorMessage(
            "Tài khoản không tồn tại. Vui lòng tạo tài khoản mới"
          );
        }
      } else if (phone && addPassword && password.length < 8) {
        setErrorMessage("Mật khẩu ít nhất 8 ký tự");
      } else if (phone && addPassword && password) {
        if (count < 5) {
          setLoading(true);
          const x = await APILoginUser(phone, password);
          if (!x) {
            setCount((prevCount) => prevCount + 1);
            // error for 5 times
            localStorage.setItem("loginRequest", count + 1);
            setErrorMessage(
              "Đã xảy ra lỗi trong quá trình kết nối tới hệ thống. Vui lòng liên hệ Chăm sóc khách hàng."
            );
            setLoading(false);
          } else if (x === "PASSWORD_INCORRECT") {
            setErrorMessage("Mật khẩu bạn vừa nhập không đúng.");
            setLoading(false);
          } else if (x === "PLAYER_NOT_ALLOWED_LOGIN") {
            setErrorMessage(
              "Tài khoản của bạn đang tạm khóa. Vui lòng liên hệ Chăm sóc khách hàng."
            );
            setLoading(false);
          } else {
            localStorage.removeItem("loginRequest");
            localStorage.setItem("auth_token", x);
            ctx.setUser(x);
            ctx.setUserInfo(null);
            setLoading(false);
            navigate("/");
          }
        } else {
          setPopupError(
            "Bạn đã nhập sai mật khẩu quá 5 lần. Vui lòng liên hệ Chăm sóc khách hàng."
          );
        }
      }
    } catch (e) {
      // console.log(e)
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formOverlay}>
        <div className={styles.formWrapper}>
          <form onSubmit={onSubmitHandler}>
            <div className={styles.loginHeader}>
              <div className={styles.logoImageWrapper}>
                <img src={Logo} alt="logo" onClick={() => navigate("/")} />
              </div>
              {/* <IoArrowBack
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                size={26}
              />
              Đăng Nhập */}
            </div>

            <div className={styles.loginFormbody}>
              {!addPassword && (
                <div>
                  <div className={styles.requiredLabel}>
                    <span>*</span>Số điện thoại
                  </div>
                  <div className={styles.formInput}>
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.currentTarget.value);
                        setErrorMessage();
                      }}
                      placeholder="Số điện thoại"
                      name="username"
                      required
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {phone && phone.length !== 10 ? (
                <div className={styles.error}>Vui lòng nhập 10 ký tự</div>
              ) : (
                ""
              )}

              {addPassword && (
                <div>
                  <AiOutlineArrowLeft
                    size={20}
                    onClick={() => {
                      setAddPassword("");
                      setPassword("");
                      setErrorMessage();
                    }}
                    style={{ cursor: "pointer", marginBottom: "8px" }}
                  />
                  <div>
                    <div className={styles.requiredLabel}>
                      <span>*</span>Mật khẩu
                    </div>
                    <div
                      className={`${styles.inputPasswordWrapper} ${styles.formInput}`}
                    >
                      <input
                        type={passwordHidden ? "password" : "text"}
                        placeholder="Xin vui lòng nhập mật khẩu"
                        name="username"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.currentTarget.value);
                          setErrorMessage();
                        }}
                        required
                        autoFocus
                      />
                      {passwordHidden ? (
                        <img
                          src={CloseEye}
                          alt="close"
                          onClick={() => setPasswordHidden(false)}
                        />
                      ) : (
                        <img
                          src={OpenEye}
                          alt="open"
                          onClick={() => setPasswordHidden(true)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className={styles.error}>{errorMessage}</div>
              )}

              {/*<div className={styles.forgotPassword}>
                  <div onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</div>
                </div>*/}

              {loading && (
                <div className={styles.apiResponseLoader}>
                  <MyLoader size={30} />
                  <div>
                    Đang lấy thông tin tài khoản, vui lòng chờ trong giây lát!
                  </div>
                </div>
              )}

              <button
                className={`${styles.submitButton} ${
                  loading ? styles.loading : ""
                }`}
                type="submit"
              >
                {loading ? "Đang tải" : "Đăng Nhập"}
              </button>

              <div className={styles.registerSection}>
                Bạn chưa có tài khoản?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className={styles.loginLink}
                >
                  Đăng ký ngay
                </span>
              </div>
            </div>
          </form>

          {/*<div style={{textAlign:'center',color:"#E2F8FF"}}>
              <p>Nếu đã có tài khoản nhấn vào đây để chơi ngay</p>
              <CoolAnimatedButton text="ĐẶT CƯỢC NGAY" link="https://sfv388.com/" />
              </div>*/}
        </div>
      </div>
      {popupError && (
        <LoginPopupModal
          message={popupError}
          show={popupError ? true : false}
          hideModal={() => {
            setPopupError("");
            setCount(0);
            localStorage.removeItem("loginRequest");
          }}
        />
      )}
    </div>
  );
};

export default Login;
