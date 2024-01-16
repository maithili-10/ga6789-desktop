import Modal from "@mui/material/Modal";
import styles from "./PromotionPopup.module.css";
import { AiOutlineClose } from "react-icons/ai";

const PromotionPopup = ({ show, hideModal, promo, openPromoId }) => {
  const promoItem = promo && promo?.filter((prom) => prom?.id === openPromoId);
  const rawHTML = promoItem && promoItem[0] && promoItem[0]?.body;

  return (
    <Modal open={show} onClose={hideModal}>
      <div className={styles.modalOverlay} onClick={hideModal}>
        <div
          className={styles.modalWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalContent}>
            <span className={styles.closeIcon}>
              <AiOutlineClose className={styles.icon} onClick={hideModal} />
            </span>
            {promoItem.length && (
              <div className={styles.innerContent}>
                <div className={styles.imgWrapper}>
                  <img
                    src={promoItem[0]?.image_desktop || promoItem[0]?.image}
                    alt="promotionImg"
                  />
                </div>
                <span className={styles.title}>
                  {promoItem[0] && promoItem[0].title}
                </span>
                <div className={styles.dates}>
                  <span>
                    {promoItem[0] &&
                      promoItem[0].start_date &&
                      new Date(
                        promoItem[0] && promoItem[0].start_date
                      ).toLocaleDateString("vi-VN")}
                    &nbsp;-&nbsp;
                  </span>
                  <span>
                    {promoItem[0] && promoItem[0].end_date
                      ? new Date(
                          promoItem[0] && promoItem[0].end_date
                        ).toLocaleDateString("vi-VN")
                      : " Dài hạn"}
                  </span>
                  <p dangerouslySetInnerHTML={{ __html: rawHTML }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PromotionPopup;
