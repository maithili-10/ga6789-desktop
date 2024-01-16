import styles from "./Promotions.module.css";
import PageBanner from "../../components/PageBanner/PageBanner";
import PromotionIcon from "../../assets/PromotionPage/PromotionIcon.webp";
import PromotionBanner from "../../assets/PromotionPage/PromotionBanner.webp";
import { promotionsAPI } from "../../helpers/APIs/PromotionsAPI";
import MyLoader from "../../components/MyLoader";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../helpers/Context/user-context";
import { useEffect } from "react";
import PromotionPopup from "./PromotionPopup/PromotionPopup";

const Promotions = () => {
  const [promotionsList, setPromotionsList] = useState();
  const [promoCardModal, setPromoCardModal] = useState(false);
  const [openPromoId, setOpenPromoId] = useState();
  const [error, setError] = useState("");
  const ctx = useContext(UserContext);

  useEffect(() => {
    promotionsListApi();
  }, []);

  // get all promotiosn API
  const promotionsListApi = async () => {
    const res = await promotionsAPI();
    // console.log(res)
    if (res.data?.status === true && res.data?.response?.length > 0) {
      setPromotionsList(res.data?.response);
    } else {
      setError("Không tìm thấy khuyến mãi nào");
    }
  };
  return (
    <div className={styles.promotionsWrapper}>
      <PageBanner
        BannerIcon={PromotionIcon}
        title="KHUYẾN MÃI"
        description="GET YOUR DAILY GIFT"
        BannerImg={PromotionBanner}
      />
      <div className={styles.promotionListOverlay}>
        <div className={styles.promotionListWrapper}>
          {error ? (
            <div className={styles.error}>{error}</div>
          ) : promotionsList ? (
            promotionsList.map((promo) => (
              <div key={promo.id} className={styles.imgWrapper}>
                <img
                  src={promo?.image_desktop || promo?.image}
                  alt={promo.title}
                  onClick={() => {
                    setPromoCardModal(true);
                    setOpenPromoId(promo.id);
                  }}
                />
              </div>
            ))
          ) : (
            <div>
              <MyLoader size={25} />
            </div>
          )}
        </div>
      </div>
      {promoCardModal && (
        <PromotionPopup
          show={promoCardModal}
          hideModal={() => setPromoCardModal(false)}
          promo={promotionsList}
          openPromoId={openPromoId}
        />
      )}
    </div>
  );
};

export default Promotions;
