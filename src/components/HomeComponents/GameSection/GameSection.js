import React, { useContext, useEffect, useState } from "react";
import styles from "./GameSection.module.css";
import Icon from "../../../assets/HomeImages/Trending Icon.webp";
import UserContext from "../../../helpers/Context/user-context";
import PlayGameModal from "../PlayerGameModal/PlayerGameModal";
import MyLoader from "../../MyLoader";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import useOpenPlayGameModal from "../../../helpers/useOpenPlayGameModal";
import { motion } from "framer-motion";
import JsonFormate from "../../JsonFormate";
// import Game1 from "../../../assets/HomeImages/Card 1.webp";
// import Game2 from "../../../assets/HomeImages/Card 2.webp";
// import Game3 from "../../../assets/HomeImages/Card 3.webp";
// import Game4 from "../../../assets/HomeImages/Card 4.webp";
// import Game5 from "../../../assets/HomeImages/Card 5.webp";
// import Game6 from "../../../assets/HomeImages/Card 6.webp";
// import Game7 from "../../../assets/HomeImages/Card 7.webp";
// import Game8 from "../../../assets/HomeImages/Card 8.webp";
// import Game9 from "../../../assets/HomeImages/Card 9.webp";
// import Game10 from "../../../assets/HomeImages/Card 10.webp";
// import bigGame1 from "../../../assets/HomeImages/Card 11.webp";
import DagaImage from "../../../assets/HeaderIcons/dagaImg.webp";

// import bigGame2 from "../../../assets/HomeImages/Trending 14.png";
// const gamesArray = [
//   { id: 1, image: Game1 },
//   { id: 2, image: Game2 },
//   { id: 3, image: Game3 },
//   { id: 4, image: Game4 },
//   { id: 5, image: Game5 },
//   { id: 6, image: Game6 },
//   { id: 7, image: Game7 },
//   { id: 8, image: Game8 },
//   { id: 9, image: Game9 },
//   { id: 10, image: Game10 },
// ];
const bigGameArray = [
  { id: 11, image: DagaImage },
  // { id: 2, image: bigGame2 },
];
const GameSection = ({ daga, setDaga }) => {
  const [playGameState, setPlayGameState] = useState(false);
  const [singleGameModal, setSingleGameModal] = useState();
  const [gameItems, setGameItems] = useState();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [gamesListBkg, setGamesListBkg] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const games = gameItems && Object.entries(gameItems)[2];
  const gameName = games && JsonFormate(games[1].name);
  const gamItems = games && games[1]?.game_items;
  const ctx = useContext(UserContext);
  const openPlayGameModal = useOpenPlayGameModal({
    setPlayGameState,
    setSingleGameModal,
  });

  useEffect(() => {
    setGameItems(ctx.categoryGamesContext?.games);
  });

  const bgColor = [
    "#e6194b ",
    "#F21F2B ",
    "#17D9A7 ",
    "#17D9A7 ",
    "#019DE9 ",
    "#F3A90A ",
    "#AC16F5 ",
    "#911eb4",
    "#F61B64 ",
    "#F3A90A ",
    "#F21F2B",
    "#019DE9 ",
    "#F61B64",
    "#F86801 ",
    "#F8D701",
    "#AC16F5 ",
    "#17D9A7",
    "#85E901 ",
    "#F3A90A ",
    "#F21F2B",
    "#019DE9 ",
    "#F61B64",
    "#F86801 ",
    "#F8D701",
    "#AC16F5 ",
    "#17D9A7",
    "#F86801 ",
    // "#F3A90A ",
    "#F8D701",
    "#F3A90A ",
    "#F61B64",
    "#F86801 ",
  ];
  useEffect(() => {
    if (gameItems?.length > 0) {
      const flattenedArray = gameItems?.reduce((acc, item) => {
        const items = item?.game_items?.map((image) => ({
          image,
          backgroundColor: bgColor[image.id], // Assuming bgColor is defined elsewhere
        }));
        return acc.concat(items);
      }, []);

      setGamesListBkg(flattenedArray);
      setIsDataLoaded(true);
    }
  }, [gameItems]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5, // Adjust duration as needed
      },
    },
  };

  return (
    <div className={styles.sectionOverlay}>
      <div className={styles.sectionWraper}>
        <div className={styles.logoSection}>
          <img src={Icon} alt="icon" />
          <Fade cascade>
            <h4>TRÒ CHƠI MỚI</h4>
          </Fade>
        </div>
        <div className={styles.partition}>
          <motion.div
            className={styles.gamesOverlay}
            variants={containerVariants}
            initial="hidden"
            // animate={isDataLoaded ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ amount: 0.5, once: false }}
          >
            {!ctx.categoryGamesContext?.games && (
              <MyLoader size={25} margin="13px" />
            )}
            {gamesListBkg?.slice(0, 10)?.map((item, index) => (
              <motion.div
                key={index}
                className={`${styles.imageWraper}  `}
                variants={itemVariants}
                viewport={{ amount: 0.5, once: false }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* <AttentionSeeker effect="shakeY" duration="3000"> */}
                <img
                  src={item?.image?.icon}
                  alt="game"
                  onClick={() => {
                    openPlayGameModal(item.image);
                  }}
                  style={{
                    // background: `transparent linear-gradient(180deg,transparent 50%, ${item?.backgroundColor} 70%, ${item?.backgroundColor} 70%)`,
                    width: "100%",
                    // opacity: 0.8,
                  }}
                />
                {/* </AttentionSeeker> */}
              </motion.div>
            ))}
          </motion.div>
          <div className={styles.gamesSection}>
            {!ctx.categoryGamesContext?.games && (
              <MyLoader size={25} margin="13px" />
            )}
            {bigGameArray?.slice(0, 1)?.map((item, index) => (
              <motion.div
                key={index}
                className={`${styles.bigGame} ${
                  index === hoveredIndex ? styles.hovered : ""
                } `}
                initial={{ opacity: 0 }} // initially hidden
                whileInView={{ opacity: 1 }} // fully visible when in view
                viewport={{ once: false, amount: 0.5 }} // trigger when 50% is in the viewport
                transition={{ duration: 3 }} // animation duration
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  key={index}
                  src={item?.image}
                  alt="game"
                  onClick={() => {
                    setDaga(true);
                    openPlayGameModal();
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
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

export default GameSection;
