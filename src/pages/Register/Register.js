import React, { useContext, useEffect, useState } from "react";
import styles from "./Register.module.css";
import {
  APICheckIfPhoneExists,
  APIRegisterUser,
} from "../../helpers/APIs/UserAPIs";
import UserContext from "../../helpers/Context/user-context";
import RegisterPopupModal from "./RegisterPopupModal/RegisterPopupModal";
import CaptchaInput from "../../components/CaptchaInput/CaptchaInput";
import { BsCheckLg, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FcCancel, FcOk } from "react-icons/fc";
import OpenEye from "../../assets/LoginIcons/OpenEye.webp";
import CloseEye from "../../assets/LoginIcons/CloseEye.webp";
import MyLoader from "../../components/MyLoader";
import Logo from "../../assets/HeaderIcons/GA6789 Logo.webp";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [randomCaptcha, setRandomCaptcha] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneValid, setPhoneValid] = useState(0);
  const [agentId, setAgentId] = useState("");
  const ctx = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();
  const [registerModal, setRegisterModal] = useState("");

  // getting url param value
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    if (params && params.ag_id) {
      setAgentId(params.ag_id);
      localStorage.setItem("agID", params.ag_id);
    } else {
      setAgentId(null);
      localStorage.removeItem("agID");
    }
  }, []);

  // check phone exist API
  const checkPhone = async () => {
    const res = await APICheckIfPhoneExists(phone);
    if (res) {
      setPhoneValid(2);
      setErrorMessage(
        "Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ."
      );
    } else {
      setPhoneValid(1);
      setErrorMessage("");
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (phone.length === 0) {
    //   setErrorMessage("");
    //   return;
    // }
    // if (phoneValid === 2 || phone.length < 10 || phone.length > 10) {
    //   setErrorMessage("Vui lòng nhập 10 chữ số cho số điện thoại");
    //   return;
    // }
    // if (password.length < 8 || password.length > 13) {
    //   setErrorMessage("Mật khẩu phải có từ 8 đến 13 ký tự");
    //   return;
    // }
    // if (!passwordAgain || passwordAgain !== password) {
    //   setErrorMessage("Mật khẩu không phù hợp");
    //   return;
    // }
    if (
      !captcha ||
      captcha.trim().toLowerCase() !== randomCaptcha.value.trim().toLowerCase()
    ) {
      setErrorMessage("Mã xác nhận không hợp lệ");
      return;
    }
    if (
      phone &&
      phone.length === 10 &&
      password &&
      checkIfHasLowerCaseChar(password) &&
      checkIfHasNumber(password) &&
      checkIfHasUpperCaseChar(password) &&
      !checkIfHasSpecialChar(password) &&
      checkifCorrectLength(password)
    ) {
      setLoading(true);
      const x = await APIRegisterUser(phone, password, agentId);
      if (!x) {
        setRegisterModal(
          "Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ."
        );
      } else {
        // setRegisterResponse(x);
        localStorage.setItem("auth_token", x);
        localStorage.removeItem("agID");
        // setRegisterModal(
        //   "Tài khoản của bạn đã được tạo thành công. Để kích hoạt tài khoản vui lòng nạp tiền"
        // );
        ctx.setUser(x);
        navigate("/");
        // ctx.setUserInfo(null);
        // navigate("/deposit?initial=true");
      }
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (timerInterval && timerTime <= 0) {
  //     setTimerTime(-1);
  //     clearInterval(timerInterval);
  //   }
  // }, [timerTime]);

  // phone start
  const checkPhoneStart = (value) => {
    const x = value.charAt(0);
    if (x == 0) {
      return value;
    }
  };

  // upper case
  const checkIfHasUpperCaseChar = (value) => {
    return /[A-Z]/.test(value);
  };

  // lowe case
  const checkIfHasLowerCaseChar = (value) => {
    return /[a-z]/.test(value);
  };

  // special char
  const checkIfHasSpecialChar = (value) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,. <>\/?~]/;
    return specialChars.test(value);
  };

  // check number
  const checkIfHasNumber = (value) => {
    return /\d/.test(value);
  };

  // check length
  const checkifCorrectLength = (value) => {
    return value.length >= 8 && value.length <= 12;
  };

  const onInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= 10) {
      setPhone(value);
      setErrorMessage("");
    } else if (value.length > 10) {
      setErrorMessage(" Độ dài điện thoại vượt quá");
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.formOverlay}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={styles.registerHeader}>
              <div className={styles.logoImageWrapper}>
                <img src={Logo} alt="logo" onClick={() => navigate("/")} />
              </div>
              {/* <IoArrowBack
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                size={26}
              />
              Đăng ký */}
            </div>

            <div className={styles.registerFormbody}>
              {agentId && (
                <div className={styles.agentIdWrapper}>
                  <span>Mã giới thiệu:</span>
                  <span>{agentId}</span>
                </div>
              )}

              <div>
                <div className={styles.requiredLabel}>
                  <span>*</span>Số điện thoại
                </div>
                <div
                  className={`${styles.formInput} 
                    ${
                      phoneValid === 1 && phone.length === 10
                        ? styles.successPhoneNumber
                        : phone.length === 0
                        ? ""
                        : phoneValid === 2 ||
                          phone.length < 10 ||
                          phone.length > 10
                        ? styles.errorPhoneNumber
                        : ""
                    }
                    `}
                >
                  <input
                    onBlur={phone.length == 10 ? checkPhone : null}
                    disabled={loading}
                    type="number"
                    value={phone}
                    onChange={onInputChange}
                    placeholder="Số điện thoại"
                    name="username"
                    required
                    autoFocus
                    // className={`${styles.inputPhone}`}
                    // className={styles.inputPassword}
                  />
                  {phoneValid === 1 && phone.length === 10 ? (
                    <BsCheckLg
                      style={{ marginRight: "10px", color: "#41DF60" }}
                      size={25}
                    />
                  ) : phone.length === 0 ? (
                    ""
                  ) : phoneValid === 2 || phone.length < 10 ? (
                    <BsX
                      size={32}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#FF0000",
                      }}
                      onClick={() => {
                        setPhone("");
                        setErrorMessage("");
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>

                {phone && !checkPhoneStart(phone) && (
                  <div className={styles.error}>Sai quy cách SĐT</div>
                )}

                {phone && phone.length < 10 && (
                  <div className={styles.error}>Vui lòng nhập 10 ký tự</div>
                )}
              </div>

              {errorMessage && (
                <span className={styles.error}>{errorMessage}</span>
              )}

              <div>
                <div className={styles.requiredLabel}>
                  <span>*</span>Mật khẩu
                </div>

                <p className={styles.passwordChecksMsg}>
                  Ví dụ : Daga123123 (chữ<span> "D" </span>viết IN HOA, không
                  dấu)
                </p>

                <div className={styles.formInput}>
                  <input
                    disabled={loading}
                    type={passwordHidden ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    placeholder="Mật khẩu"
                    name="password"
                    required
                    className={styles.inputPassword}
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

                {password ? (
                  <div style={{ marginTop: "7px" }}>
                    <div className={styles.passwordValidation}>
                      <span style={{ marginBottom: "0px" }}>
                        {checkIfHasUpperCaseChar(password) ? (
                          <FcOk />
                        ) : (
                          <FcCancel />
                        )}
                      </span>
                      <span
                        className={
                          checkIfHasUpperCaseChar(password)
                            ? styles.success
                            : styles.error
                        }
                      >
                        Mật khẩu phải có chữ IN HOA
                      </span>
                    </div>
                    <div className={styles.passwordValidation}>
                      <span style={{ marginBottom: "0px" }}>
                        {checkIfHasLowerCaseChar(password) ? (
                          <FcOk />
                        ) : (
                          <FcCancel />
                        )}
                      </span>
                      <span
                        className={
                          checkIfHasLowerCaseChar(password)
                            ? styles.success
                            : styles.error
                        }
                      >
                        Mật khẩu phải có chữ thường
                      </span>
                    </div>
                    <div className={styles.passwordValidation}>
                      <span style={{ marginBottom: "0px" }}>
                        {checkIfHasNumber(password) ? <FcOk /> : <FcCancel />}
                      </span>
                      <span
                        className={
                          checkIfHasNumber(password)
                            ? styles.success
                            : styles.error
                        }
                      >
                        Mật khẩu phải có số (0~ 9)
                      </span>
                    </div>
                    <div className={styles.passwordValidation}>
                      <span style={{ marginBottom: "0px" }}>
                        {checkifCorrectLength(password) ? (
                          <FcOk />
                        ) : (
                          <FcCancel />
                        )}
                      </span>
                      <span
                        className={
                          checkifCorrectLength(password)
                            ? styles.success
                            : styles.error
                        }
                      >
                        Mật khẩu cần dài hơn 8 ký tự và ngắn hơn 12 ký tự.
                      </span>
                    </div>
                    <div className={styles.passwordValidation}>
                      <span style={{ marginBottom: "0px" }}>
                        {!checkIfHasSpecialChar(password) ? (
                          <FcOk />
                        ) : (
                          <FcCancel />
                        )}
                      </span>
                      <span
                        className={
                          !checkIfHasSpecialChar(password)
                            ? styles.success
                            : styles.error
                        }
                      >
                        Không chứa ký tự đặc biệt, dấu cách
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <CaptchaInput
                captcha={randomCaptcha}
                setCaptcha={setRandomCaptcha}
                setUserCaptchaInput={setCaptcha}
                userCaptchaInput={captcha}
              />

              {loading && <MyLoader size={30} />}

              <button
                className={`${styles.registerButton} ${
                  loading ? styles.loading : ""
                }`}
                type="submit"
              >
                {loading ? "Đang tải" : "Đăng ký"}
              </button>

              <div className={styles.loginSection}>
                Bạn đã có tài khoản?
                <span
                  onClick={() => navigate("/login")}
                  className={styles.loginLink}
                >
                  Đăng Nhập
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      {registerModal && (
        <RegisterPopupModal
          message={registerModal}
          show={registerModal ? true : false}
          hideModal={() => setRegisterModal("")}
          // x={registerResponse}
        />
      )}
    </div>
  );
};

export default Register;
