import React from "react";
import styles from "./ArticleSection.module.css";
import ArticleImg from "../../assets/HomeImages/Casino Girls.webp";
import { motion } from "framer-motion";

const ArticleSection = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.imgWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: -200 },
        }}
      >
        <img src={ArticleImg} alt="img" />
      </motion.div>
      <motion.div
        className={styles.textContent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 200 },
        }}
      >
        <span>LIVE CASINO CỰC HẤP DẪN CÙNG GA6789</span>
        <span>
          GA6789 cung cấp các sảnh live casino cực kỳ hấp dẫn ở thị trường Việt
          như DB, AE Sexy, VIA... Hàng nghìn cô gái nóng bỏng cùng nhiều trò
          chơi quen thuộc đang đợi bạn khám phá.
        </span>
      </motion.div>
    </div>
  );
};

export default ArticleSection;
