import React, { useContext, useEffect, useState } from "react";
import styles from "./DagaSection.module.css";
import HomeDaga from "../../../assets/HomeImages/HomeDaga.webp";
import TinyDaga from "../../../assets/HomeImages/TinyDaga.webp";
import useOpenPlayGameModal from "../../../helpers/useOpenPlayGameModal";
import UserContext from "../../../helpers/Context/user-context";
import MyLoader from "../../MyLoader";
import PlayGameModal from "../PlayerGameModal/PlayerGameModal";
import JsonFormate from "../../JsonFormate";
import { motion } from "framer-motion";
// import { AttentionSeeker } from "react-awesome-reveal";
// import UserSection from "../UserSection/UserSection";

const DagaSection = () => {
  const [playGameState, setPlayGameState] = useState(false);
  const [singleGameModal, setSingleGameModal] = useState();
  const [daga, setDaga] = useState(false);
  const [gameItems, setGameItems] = useState();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ctx = useContext(UserContext);
  const openPlayGameModal = useOpenPlayGameModal({
    setPlayGameState,
    setSingleGameModal,
  });
  const user = ctx.user;
  const userInfo = ctx.userInfo;
  useEffect(() => {
    setGameItems(ctx.categoryGamesContext?.games);
  });
  const games = gameItems && Object.entries(gameItems)[2];
  const gameName = games && JsonFormate(games[1].name);
  const gamItems = games && games[1]?.game_items;
  return (
    <div className={styles.dagaSectionOverlay}>
      <motion.div
        className={styles.dagaSectionWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: -300 },
        }}
      >
        <div className={styles.tinyDagaSection}>
          <img src={TinyDaga} alt="tinydaga" /> <h4>DÀ GÀ</h4>
        </div>
        <div className={styles.dagaSection}>
          <img src={HomeDaga} alt="Home daga" />
          <div className={styles.dagaContent}>
            <h3>DÀ GÀ</h3>
            <p>Chơi Với Các Thành Viên Khác Trong Biển Xanh Thẳm </p>
            <button
              onClick={() => {
                setDaga(true);
                openPlayGameModal();
              }}
            >
              Chơi Ngay
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={styles.gamesSectionWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 300 },
        }}
      >
        {/* <h4>{gameName && gameName}</h4> */}
        <div className={styles.tinyDagaSection}>
          <h4>{gameName && gameName}</h4>
        </div>
        <div className={styles.gamesSection}>
          {!ctx.categoryGamesContext?.games && (
            <MyLoader size={25} margin="13px" />
          )}
          {gamItems?.map((item, index) => (
            <img
              key={index}
              src={item?.icon_rectangle}
              alt="game"
              onClick={() => {
                openPlayGameModal(item);
              }}
            />
          ))}
        </div>
      </motion.div>
      {playGameState && (
        <PlayGameModal
          playGameState={playGameState}
          setPlayGameState={setPlayGameState}
          singleGameModal={singleGameModal}
          setSingleGameModal={setSingleGameModal}
          daga={daga ? true : false}
          setDaga={setDaga}
        />
      )}
    </div>
  );
};

export default DagaSection;
