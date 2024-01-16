import React from "react";
import styles from "./MobileSection.module.css";
import mobileLeft from "../../../assets/HomeImages/Mobile - Left.webp";
import mobileRight from "../../../assets/HomeImages/Mobile - Right.webp";
import casinoGirl from "../../../assets/HomeImages/Casino Girl.webp";
import { AttentionSeeker } from "react-awesome-reveal";
import { motion } from "framer-motion";

const MobileSection = () => {
  const imageVariants = {
    initial: {
      scale: 0.3, // Starts scaled down
    },
    animate: {
      scale: 1, // Scales up to the original size
      transition: {
        duration: 0.7, // Duration of the scale-up animation
        ease: "easeOut", // Type of easing (can be adjusted)
      },
    },
  };
  return (
    <div className={styles.sectionOverlay}>
      <div className={styles.sectionWraper}>
        <motion.div
          className={styles.smallImageWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -300 },
          }}
        >
          <AttentionSeeker effect="tada" duration="3000">
            <img src={mobileLeft} alt="mobileleft" />
            {/* x555454 */}
          </AttentionSeeker>
        </motion.div>

        <div className={styles.imageCenter}>
          <AttentionSeeker effect="pulse" duration="3000">
            <motion.div
              variants={imageVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
            >
              <img src={casinoGirl} alt="casinogirl" />
            </motion.div>
          </AttentionSeeker>
          <div className={styles.textWraper}>
            <h3>TRỚ CHƠI XÈNG PHỔ BIẾN</h3>
            <p>
              VN138 Cung cấp các trò chơi xèng phổ biến nhất ở Thái Lan như AE
              GAMING, CQ9, JOKER, v.v. Nó cung cấp hơn một nghìn máy xèng trực
              tuyến và bạn có thể chơi thử miễn phí.
            </p>
          </div>
        </div>

        <motion.div
          className={styles.smallImageWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 300 },
          }}
        >
          <AttentionSeeker effect="tada" duration="3000">
            <img src={mobileRight} alt="mobileright" />
          </AttentionSeeker>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileSection;
