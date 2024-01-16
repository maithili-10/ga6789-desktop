import styles from "./Profile.module.css";
import { useContext } from "react";
import UserContext from "../../helpers/Context/user-context";
import MyLoader from "../../components/MyLoader";
import TimeConverter from "../../helpers/TimeConverter";

const Profile = () => {
  const ctx = useContext(UserContext);

  const userDetails = [
    {
      label: "ID tài khoản",
      value: ctx?.userInfo?.id,
    },
    {
      label: "Họ Và Tên",
      value: ctx?.userInfo?.name,
    },
    {
      label: "Số điện thoại",
      value: ctx?.userInfo?.name,
    },
    {
      label: "Ngày đăng ký",
      value: ctx?.userInfo?.created_at
        ? new Date(ctx?.userInfo?.created_at).toLocaleString()
        : "",
    },
    {
      label: "Ngày đăng nhập cuối",
      value: ctx?.userInfo?.last_login
        ? TimeConverter(new Date(ctx?.userInfo?.last_login).toISOString([]))
        : "",
    },
  ];

  return (
    <div className={styles.profileWrapper}>
      {userDetails ? (
        userDetails.map((item, index) => (
          <div key={index}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))
      ) : (
        <MyLoader />
      )}
    </div>
  );
};

export default Profile;
