import { useContext, useEffect, useState } from "react";
import UserContext from "../../../helpers/Context/user-context";
import styles from "./UserSection.module.css";
import CopyItem from "../../CopyItem/CopyItem";
import { Link, useNavigate } from "react-router-dom";
import MyLoader from "../../MyLoader";
import { APIUser } from "../../../helpers/APIs/UserAPIs";
import useLogout from "../../../helpers/useLogout";
import { APILatestTransaction } from "../../../helpers/APIs/TransactionAPI";
import PlayGameModal from "../PlayerGameModal/PlayerGameModal";

let interval = null;

const UserSection = ({ gameLink }) => {
  const navigate = useNavigate();
  const [playGameState, setPlayGameState] = useState(false);
  const [singleGameModal, setSingleGameModal] = useState();
  const ctx = useContext(UserContext);
  const user = ctx.user;
  const userInfo = ctx.userInfo;
  const logout = useLogout();

  const [rejectRequest, setRejectRequest] = useState("");

  // call api to check deposit request status
  useEffect(() => {
    // getBannerImage();
    if (!gameLink) {
      if (localStorage.getItem("initialDeposit")) {
        interval = setInterval(() => {
          userTransaction();
        }, 20000);
        return () => clearInterval(interval);
      }
    }
    userData();
  }, []);

  // user Data
  const userData = async () => {
    const userApiData = await APIUser();
    if (
      userApiData?.response &&
      (userApiData?.response?.data?.message === "Unauthenticated." ||
        userApiData?.response?.data?.message === "timeout exceeded")
    ) {
      logout();
    } else {
      ctx.setUserInfo(userApiData);
    }
  };

  // again call for transaction status
  const userTransaction = async () => {
    const res = await APILatestTransaction(localStorage.getItem("auth_token"));
    if (res) {
      if (res.is_approved === 2 && interval) {
        setRejectRequest(
          "Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!"
        );
        clearInterval(interval);
        localStorage.removeItem("initialDeposit");
      } else if (res.is_approved === 1 && interval) {
        userData();
        clearInterval(interval);
        localStorage.removeItem("initialDeposit");
      }
    }
  };

  const ShowLoader = () => {
    return ctx?.user && !ctx?.userInfo && <MyLoader />;
  };

  // get deposit time from localStorage
  const getDepositTime = localStorage.getItem("initialDeposit");
  const depositTime = new Date() - new Date(getDepositTime);
  // open game Modal, if no yser => login; if no u.u_id && u.u_name => depo else open modal
  const openGameModal = async () => {
    if (!ctx?.user) {
      navigate("/login");
    } else if (
      ctx?.user &&
      ctx?.userInfo &&
      ctx?.userInfo?.user_id &&
      ctx?.userInfo?.user_name
    ) {
      setPlayGameState(true);
      setSingleGameModal();
    } else if (
      ctx?.user &&
      ctx?.userInfo &&
      !ctx?.userInfo?.user_id &&
      !ctx?.userInfo?.user_name
    ) {
      navigate("/deposit");
    }
  };

  return (
    <div className={styles.homeMsgWrapper}>
      {ShowLoader()}

      <div className={styles.homeMsg}>
        {/* <div className={styles.userInfoContent}> */}

        <CopyItem
          home={true}
          item={{
            label: "Số điện thoại đăng nhập",
            value: userInfo?.name,
          }}
        />
        {userInfo?.user_name && userInfo?.user_id && (
          <CopyItem
            home={true}
            item={{
              label: "Tài khoản SV388",
              value: userInfo?.user_name,
              copy: true,
            }}
          />
        )}
        {userInfo?.user_name && userInfo?.user_id && (
          <CopyItem
            home={true}
            item={{
              label: "Mật khẩu",
              value: userInfo?.raw_string,
              copy: true,
            }}
          />
        )}
        {/* </div> */}

        {/* {userInfo.user_name && userInfo.user_id && (
          <img src={DagaImg} alt="daga" onClick={() => openGameModal()} />
          )} */}
        {(!userInfo?.user_name || !userInfo?.user_id) &&
          !gameLink &&
          !getDepositTime &&
          !rejectRequest && (
            <div className={styles.depositActivationmsg}>
              Để lấy tài khoản đá gà Thomo, Thái, Việt, Phi tại SV388, vui lòng
              nạp tiền để kích hoạt tài khoản.{" "}
            </div>
          )}

        {(!userInfo?.user_name || !userInfo?.user_id) &&
          !gameLink &&
          !getDepositTime &&
          !rejectRequest && (
            <Link
              to="/profile/deposit"
              className={styles.depositButton}
              onClick={""}
            >
              Nạp Tiền
            </Link>
          )}

        {(!userInfo?.user_name || !userInfo?.user_id) &&
          !gameLink &&
          getDepositTime &&
          depositTime > 600000 && (
            <div className={styles.rejectrequestmsg}>
              Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!
            </div>
          )}

        {(!userInfo?.user_name || !userInfo?.user_id) &&
          !gameLink &&
          getDepositTime &&
          depositTime < 600000 && (
            <div className={styles.depositpendingmsg}>
              <div>
                <MyLoader />
              </div>
              <div>Vui lòng chờ cấp tài khoản trong giây lát…</div>
            </div>
          )}

        {/*Rejected Message*/}
        {rejectRequest && !gameLink && (
          <div className={styles.rejectrequestmsg}>{rejectRequest}</div>
        )}
      </div>

      {playGameState && (
        <PlayGameModal
          playGameState={playGameState}
          setPlayGameState={setPlayGameState}
          singleGameModal={singleGameModal}
          setSingleGameModal={setSingleGameModal}
          daga={true}
        />
      )}
    </div>
  );
};

export default UserSection;
