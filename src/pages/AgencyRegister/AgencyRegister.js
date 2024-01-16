import React, { useEffect, useState } from "react";
import styles from "./AgencyRegister.module.css";
import {
  APICheckIfPhoneExists,
  APIRegisterAgent,
} from "../../helpers/APIs/UserAPIs";
import { useNavigate } from "react-router-dom";
import { FcOk, FcCancel } from "react-icons/fc";
import PopupErrorModal from "../../components/PopupErrorModal/PopupErrorModal";
import CaptchaInput from "../../components/CaptchaInput/CaptchaInput";
import { BsCheckLg, BsX } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import OpenEye from "../../assets/LoginIcons/OpenEye.webp";
import CloseEye from "../../assets/LoginIcons/CloseEye.webp";
import MyLoader from "../../components/MyLoader";
let timerInterval = null;

const AgencyRegister = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [randomCaptcha, setRandomCaptcha] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [timerTime, setTimerTime] = useState(60);
  const [phoneValid, setPhoneValid] = useState(0);
  const [name, setName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (timerInterval && timerTime <= 0) {
      setTimerTime(-1);
      clearInterval(timerInterval);
    }
  }, [timerTime]);

  const checkPhoneStart = (value) => {
    const x = value.charAt(0);
    if (x == 0) {
      return value;
    }
  };

  // check phone API
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

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length === 0) {
      setErrorMessage("");
      return;
    }
    if (phoneValid === 2 || phone.length < 10 || phone.length > 10) {
      setErrorMessage("Vui lòng nhập 10 chữ số cho số điện thoại");
      return;
    }
    if (password.length < 8 || password.length > 13) {
      setErrorMessage("Mật khẩu phải có từ 8 đến 13 ký tự");
      return;
    }
    if (!passwordAgain || passwordAgain !== password) {
      setErrorMessage("Mật khẩu không phù hợp");
      return;
    }
    if (
      !captcha ||
      captcha.trim().toLowerCase() !== randomCaptcha.value.trim().toLowerCase()
    ) {
      setErrorMessage("Mã xác nhận không hợp lệ");
      return;
    }

    if (phone && phone.length === 10 && name) {
      setErrorMessage("");
      setLoading(true);
      setShowRegisterModal(true);
      timerInterval = setInterval(
        () =>
          setTimerTime((pt) => {
            return pt - 1;
          }),
        1000
      );
      const x = await APIRegisterAgent(name, phone, password);
      if (!x) {
        setErrorMessage(
          "Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ."
        );
        setShowRegisterModal(false);
      } else {
        setShowSuccessModal(true);
        // navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.agencyRegisterWrapper}>
      <div className={styles.formOverlay}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={styles.agencyRegisterFormHeader}>
              <IoArrowBack
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                size={26}
              />
              Đăng ký Đại lý
            </div>
            <div className={styles.agencyRegisterFormBody}>
              {errorMessage && (
                <span className={styles.error}>{errorMessage}</span>
              )}

              <div>
                <div className={styles.requiredLabel}>
                  <span>*</span>TÊN
                </div>
                <div className={`${styles.formInput}`}>
                  <input
                    disabled={loading}
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="TÊN"
                    name="name"
                    required
                    className={`${styles.inputPhone}`}
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <div className={styles.requiredLabel}>
                  <span>*</span>Số điện thoại
                </div>
                <div
                  className={`${styles.formInput} ${
                    phoneValid === 1 && phone.length === 10
                      ? styles.successPhoneNumber
                      : phone.length === 0
                      ? ""
                      : phoneValid === 2 ||
                        phone.length < 10 ||
                        phone.length > 10
                      ? styles.errorPhoneNumber
                      : ""
                  }`}
                >
                  <input
                    onBlur={phone.length == 10 ? checkPhone : null}
                    disabled={loading}
                    type="number"
                    value={phone}
                    onChange={(e) => {
                      setErrorMessage();
                      setPhone(e.currentTarget.value);
                    }}
                    placeholder="Số điện thoại"
                    name="username"
                    required
                    className={`${styles.inputPhone}`}
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
                  <span className={styles.error}>Sai quy cách SĐT</span>
                )}

                {phone && phone.length < 10 && (
                  <div className={styles.error}>Vui lòng nhập 10 ký tự</div>
                )}
              </div>

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
                  <div>
                    {/*<div className={styles.passwordValidation}>
                          <span style={{ marginBottom: "0px" }}>
                            {checkIfHasUpperCaseChar(password) ? <FcOk /> : <FcCancel />}
                          </span>
                          <span className={checkIfHasUpperCaseChar(password) ? styles.success : styles.error}
                          >
                            Mật khẩu phải có chữ IN HOA
                          </span>
                        </div>
                        <div className={styles.passwordValidation}}>
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
                              checkIfHasNumber(password) ? styles.success : styles.error
                            }
                          >
                            Mật khẩu phải có số (0~ 9)
                          </span>
                        </div>*/}
                    <div className={styles.passwordValidation}>
                      <span>
                        {password.length < 8 || password.length > 13 ? (
                          <FcCancel />
                        ) : (
                          <FcOk />
                        )}
                      </span>
                      <span
                        className={
                          password.length < 8 || password.length > 13
                            ? styles.error
                            : styles.success
                        }
                      >
                        Mật khẩu phải có từ 8 đến 13 ký tự{" "}
                      </span>
                    </div>
                    {/*<div className={styles.passwordValidation}}>
                          <span style={{ marginBottom: "0px" }}>
                            {!checkIfHasSpecialChar(password) ? <FcOk /> : <FcCancel />}
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
                        </div>*/}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div>
                <div className={styles.requiredLabel}>
                  <span>*</span>Xác nhận mật khẩu
                </div>
                <div className={styles.formInput}>
                  <input
                    disabled={loading}
                    type={passwordHidden ? "password" : "text"}
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.currentTarget.value)}
                    placeholder="Xác nhận mật khẩu"
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
                {passwordAgain && passwordAgain !== password && (
                  <span className={styles.error}>Mật khẩu không phù hợp.</span>
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
                className={`${styles.agencyRegisterSubmitButton} ${
                  loading ? styles.loading : ""
                }`}
                type="submit"
              >
                {loading ? "Đang tải" : "Đăng ký"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessModal && (
        <PopupErrorModal
          message={
            "Chúng tôi đã nhận được thông tin của bạn. Chúng tôi sẽ liên lạc với bạn trong vòng 48 giờ."
          }
          show={showSuccessModal}
          hideModal={() => {
            setShowSuccessModal(false);
            navigate("/");
          }}
          error={false}
          modalClose="true"
        />
      )}
    </div>
  );
};

export default AgencyRegister;
