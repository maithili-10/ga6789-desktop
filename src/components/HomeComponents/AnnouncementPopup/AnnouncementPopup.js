import styles from "./AnnouncementPopup.module.css";
import { Modal } from "@mui/material";
import { motion } from "framer-motion";

const AnnouncementPopup = ({ show, hideModal, announcement }) => {
  const popupVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring", // For a spring-like effect
        stiffness: 100, // Adjust stiffness for more or less "bounce"
        damping: 10, // Adjust damping for more or less resistance
        duration: 0.5, // Duration of the animation
      },
    },
  };
  return (
    <Modal className={styles.modalOverlay} open={show} onClose={hideModal}>
      <motion.div
        className={styles.modalWrapper}
        variants={popupVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
      >
        <p dangerouslySetInnerHTML={{ __html: announcement?.body }} />
      </motion.div>
    </Modal>
  );
};

export default AnnouncementPopup;
