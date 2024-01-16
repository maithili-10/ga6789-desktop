import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styles from "./SecondaryHeader.module.css";
import Agency from "../../../../assets/HeaderIcons/Agency.webp";
import HotTag from "../../../../assets/HeaderIcons/hot.webp";
import UserContext from "../../../../helpers/Context/user-context";
import { getGameCategories } from "../../../../helpers/APIs/GameAPIs";
import MyLoader from "../../../MyLoader";
import DagaSection from "../DagaSection/DagaSection";
import ShowGames from "./ShowGames/ShowGames";
// import DownloadIcon from "../../../../assets/HeaderIcons/DownloadIcon.webp";
// import { AttentionSeeker } from "react-awesome-reveal";

const SecondaryHeader = () => {
  const [gameCategories, setGameCategories] = useState();
  const [showGames, setShowGames] = useState(false);
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
  const activePage = window.location.pathname;
  const ctx = useContext(UserContext);

  // use Query to get data from DB
  const { data, isLoading, error } = useQuery("categories", getGameCategories, {
    refetchOnWindowFocus: false,
  });
  // set category games data in context, manage loader
  useEffect(() => {
    // Once the data is loaded, update the state
    if (data) {
      setGameCategories(data?.games);
      ctx.setCategoryGamesContext(data);
      setLoading(isLoading);
    }

    if (isLoading) {
      setLoading(isLoading);
    }

    // Handle errors if any
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, isLoading, error]);

  // Games length checks, set error message
  useEffect(() => {
    if (gameCategories?.games?.length == 0) {
      setErrorMsg("Không tìm thấy trò chơi nào");
    } else if (gameCategories == "NETWORK_ERROR") {
      setErrorMsg("Lỗi mạng");
    }
  }, [gameCategories]);

  // Category hover function
  const handleHover = (id) => {
    setSelected(id);
    setGames(
      gameCategories?.filter((category) => {
        return Number(category.id) === Number(id);
      })[0].game_items
    );
  };

  return (
    <>
      <div className={styles.secondaryHeaderOverlay}>
        <DagaSection
          setSelected={setSelected}
          setShowGames={setShowGames}
          setGames={setGames}
          showGames={showGames}
        />

        <div className={styles.headerLinksWrapper}>
          <>
            {loading && <MyLoader size={20} margin="13px" />}
            {gameCategories?.map((item) => (
              <div
                key={item.id}
                className={` ${styles.headerLinks} 
                ${selected == item.id ? styles.activePageStyling : ""}
                 `}
                onMouseEnter={() => {
                  setShowGames(true);
                  handleHover(item.id);
                }}
                onMouseLeave={() => {
                  // setSelected(null);
                  setShowGames(false);
                }}
              >
                {JSON.parse(item?.name).vn}
                {item.id == 4 ? <img src={HotTag} alt="hot" /> : ""}
              </div>
            ))}
          </>
        </div>

        <div
          className={styles.imgOptionWrapper}
          onClick={() => navigate("/agency-register")}
        >
          <img src={Agency} alt="Agency" />
          <span
            className={`${
              activePage == "/agency-register"
                ? styles.activePageStyling
                : styles.inactivePage
            }`}
          >
            ĐẠI LÝ
          </span>
        </div>

        {/* <div
          className={styles.imgOptionWrapper}
          onClick={() => navigate("/downloads")}
        >
          <img src={DownloadIcon} alt="download" />
          <span
            className={`${
              activePage == "/downloads"
                ? styles.activePageStyling
                : styles.inactivePage
            }`}
          >
            TÂI APP
          </span>
        </div> */}
        {/*
          <div className={styles.liveWrapper}>
            <img src={DownloadIcon} alt='download'/>
            <span>LIVE</span>
          </div>
        */}
      </div>
      {(showGames || showGames === "daga") && (
        <ShowGames
          showGames={showGames}
          setShowGames={setShowGames}
          games={games}
          errorMsg={errorMsg}
          setSelected={setSelected}
          selected={selected}
          setGames={setGames}
        />
      )}
    </>
  );
};

export default SecondaryHeader;

// active Category page
// const [activeCatId, setActiveCatId] = useState();
// ${activeCatId == item.id ? styles.activePageStyling : ''}
