import styles from "./ShowGames.module.css";
import PlayGameModal from "../../../../HomeComponents/PlayerGameModal/PlayerGameModal";
import { useState } from "react";
import MyLoader from "../../../../MyLoader";
import useOpenPlayGameModal from "../../../../../helpers/useOpenPlayGameModal";
import { useEffect } from "react";

const ShowGames = ({
  showGames,
  setShowGames,
  games,
  errorMsg,
  setSelected,
  selected,
  setGames,
}) => {
  const [playGameState, setPlayGameState] = useState(false);
  const [singleGameModal, setSingleGameModal] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [daga, setDaga] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpened(true);
    }, 5);

    return () => clearTimeout(timer);
  }, []);
  // play game modal hook
  const openPlayGameModal = useOpenPlayGameModal({
    setPlayGameState,
    setSingleGameModal,
  });

  // no games message
  const noGamesMessage = () => {
    return (
      games?.length == 0 && (
        <span className={styles.noGamesMessage}>{errorMsg}</span>
      )
    );
  };

  // game ratio function
  const gameRatio = () => {
    return (
      <>
        {showGames == "daga" ? (
          <div className={styles.dagaRatio}>
            <span>30:1</span>
          </div>
        ) : (
          <div className={styles.otherGamesRatio}>
            <span>1:1</span>
          </div>
        )}
      </>
    );
  };

  // on mouse Leave Function
  const onMouseLeaveFunc = () => {
    // if (!playGameState) {
    // setSelected(false);
    setShowGames(false);
    // }
  };
  useEffect(() => {
    return () => {
      setGames([]);
      setSelected(false);
    };
  }, []);

  // ...
  return (
    <div
      className={`${styles.headerGameList} ${isOpened ? styles.open : ""}`}
      onMouseEnter={() => {
        setShowGames(showGames === "daga" ? "daga" : true);
      }}
      onMouseLeave={() => onMouseLeaveFunc()}
    >
      <>
        {gameRatio()}
        {noGamesMessage()}
        {games ? (
          games?.map((item, index) => (
            <div className={styles.gameImgWrapper} key={index}>
              <img
                src={item?.icon}
                alt="game"
                onClick={() => {
                  setDaga(showGames === "daga" ? true : false);
                  openPlayGameModal(showGames === "daga" ? "" : item);
                }}
              />
            </div>
          ))
        ) : (
          <MyLoader size={20} margin="13px" />
        )}
      </>
      {playGameState && (
        <PlayGameModal
          setShowGames={setShowGames}
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

export default ShowGames;
