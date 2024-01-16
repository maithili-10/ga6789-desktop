import styles from "./LinksPage.module.css";
import { useContext, useEffect, useState } from "react";
import { BiRightArrowCircle } from "react-icons/bi";
import CustomerSupportAnimatedItem from "../../components/CustomerSupportAnimatedItem/CustomerSupportAnimatedItem";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context/user-context";
import Layout from "../../layout/Layout/Layout";
import { APIAllGamesLinks } from "../../helpers/APIs/PromotionsAPI";
import MyLoader from "../../components/MyLoader";
import UserSection from "../../components/HomeComponents/UserSection/UserSection";

const LinksPage = () => {
  const [links, setLinks] = useState();
  const ctx = useContext(UserContext);
  const user = ctx.user;
  const navigate = useNavigate();

  // get game links from API
  useEffect(() => {
    allGameLinks();
  }, []);

  // Game links API
  const allGameLinks = async () => {
    const linksRes = await APIAllGamesLinks();
    setLinks(linksRes);
  };

  return (
    <div className={styles.linkstOverlay}>
      <div className={styles.linksWrapper}>
        <div
        // style={{ padding: "0 3%" }}
        >
          <UserSection gameLink={true} />
        </div>

        <div className={styles.sectionContentWrapper}>
          <div className={styles.section}>
            {links ? (
              links.map((item, index) => (
                <div
                  className={styles.linkContent}
                  onClick={() => window.open(item.value)}
                  key={index}
                >
                  <div className={styles.linkNameGrp}>
                    <span>{index + 1}</span>
                    <strong>Link</strong>
                  </div>
                  <BiRightArrowCircle size={40} className={styles.linkIcon} />
                </div>
              ))
            ) : (
              <MyLoader />
            )}
            {!user && (
              <div className={styles.noAccountWrapper}>
                <div>Bạn chưa có tài khoản?</div>
                <div onClick={() => navigate("/register")}>Đăng ký</div>
              </div>
            )}
          </div>
          <div className={styles.customerMessageWrapper}>
            <p>Bấm vào đây để được</p>
            <CustomerSupportAnimatedItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
