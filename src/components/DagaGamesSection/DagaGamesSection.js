import React, { useEffect, useState } from "react";
import styles from "./DagaGamesSection.module.css";
import Grid from "@mui/material/Grid";
import dagaImg from "../../assets/dagaSection/Main DAGA Img.webp";
import thumb from "../../assets/dagaSection/Popular Icon.webp";
import { motion } from "framer-motion";
import useOpenPlayGameModal from "../../helpers/useOpenPlayGameModal";
import PlayGameModal from "../HomeComponents/PlayerGameModal/PlayerGameModal";
import { useInView } from "react-intersection-observer";
import JsonFormate from "../JsonFormate";
import { APIAllTrendingGames } from "../../helpers/APIs/GameAPIs";
import MyLoader from "../MyLoader";

const DagaGamesSection = ({
  gamesListBkg,
  setPlayGameState,
  setSingleGameModal,
  playGameState,
  singleGameModal,
  gameItems,
  setDaga,
  daga,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [spclGames, setSpclGames] = useState([]);
  const [spclGamesLoading, setSpclGamesLoading] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    // Set the initial state to 'visible' if the component is in view
    setAnimationState(inView ? "visible" : "hidden");
  }, [inView]);

  const [animationState, setAnimationState] = useState("hidden");

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3, // Adjust duration as needed
      },
    },
  };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const getSpecialGames = async () => {
    try {
      setSpclGamesLoading(true);
      const res = await APIAllTrendingGames();
      if (res.games.length > 0) {
        setSpclGames(res.games);
        setSpclGamesLoading(false);
      }
    } catch (e) {
      setSpclGamesLoading(false);
    }
  };
  useEffect(() => {
    getSpecialGames();
  }, []);

  const openPlayGameModal = useOpenPlayGameModal({
    setPlayGameState,
    setSingleGameModal,
  });

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.flexColumn} ${styles.GamesSection}`}>
        <div className={`${styles.flex} ${styles.gamesNameSection}`}>
          <img src={thumb} alt="thumbsup" />
          <span>
            {spclGames?.slice(0, 1)[0] &&
              JsonFormate(spclGames?.slice(0, 1)[0]?.name)}
          </span>
          {/* JsonFormate(games[1].name) */}
        </div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animationState}
        >
          {!spclGamesLoading ? (
            spclGames
              ?.slice(0, 1)[0]
              ?.game_items?.slice(0, 2)
              ?.map((item, index) => {
                return (
                  <div
                    // xs={6}
                    key={item?.id}
                    // component={motion.div}
                  >
                    <motion.div
                      className={styles.gameImgWrapper}
                      variants={itemVariants}
                    >
                      <img
                        src={item?.icon}
                        alt={`game${item?.id}`}
                        onClick={() => {
                          openPlayGameModal(item);
                        }}
                      />
                    </motion.div>
                  </div>
                );
              })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MyLoader />
            </div>
          )}
        </motion.div>
      </div>

      <div className={`${styles.flexColumn} ${styles.dagaWrapperStyle}`}>
        {/* <div className={`${styles.flex} ${styles.gamesNameSection}`}>
          <img src={thumb} alt="thumbsup" />
          <span>PHỔ BIẾN</span>
        </div> */}
        <motion.div
          className={styles.dagaImgWrapper}
          variants={imageVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            src={dagaImg}
            alt="daga"
            onClick={() => {
              setDaga(true);
              openPlayGameModal();
            }}
          />
        </motion.div>
        {/* <div className={styles.dagaLogoWrapper}>
          <img src={logo} alt="belowLogo" />
        </div> */}
      </div>

      <div className={`${styles.flexColumn} ${styles.GamesSection}`}>
        <div className={`${styles.flex} ${styles.gamesNameSection}`}>
          <img src={thumb} alt="thumbsup" />

          <span>
            {spclGames?.slice(1, 2)[0] &&
              JsonFormate(spclGames?.slice(1, 2)[0]?.name)}
          </span>
        </div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={animationState}
        >
          {!spclGamesLoading ? (
            spclGames
              ?.slice(1, 2)[0]
              ?.game_items?.slice(0, 2)
              ?.map((item, index) => {
                return (
                  <Grid xs={6} key={item?.id}>
                    <motion.div
                      className={styles.gameImgWrapper}
                      variants={itemVariants}
                    >
                      <img
                        src={item?.icon
                        }
                        alt={`game${item?.id}`}
                        onClick={() => {
                          openPlayGameModal(item);
                        }}
                      />
                    </motion.div>
                  </Grid>
                );
              })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MyLoader />
            </div>
          )}
        </motion.div>
      </div>
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

export default DagaGamesSection;
