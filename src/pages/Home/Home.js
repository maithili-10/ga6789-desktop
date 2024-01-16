import React from "react";
import styles from "./Home.module.css";
import TopBanner from "../../components/HomeComponents/TopBannerSlider/TopBanner";
import announcement from "../../assets/HomeImages/Announcement.webp";
import GameSection from "../../components/HomeComponents/GameSection/GameSection";
import CameraSection from "../../components/HomeComponents/CameraSection/CameraSection";
import AnnouncementPopup from "../../components/HomeComponents/AnnouncementPopup/AnnouncementPopup";
import { useState } from "react";
import { useEffect } from "react";
import { APICheckAnnouncement } from "../../helpers/APIs/AnnouncementAPI";
import { useContext } from "react";
import UserContext from "../../helpers/Context/user-context";
import useOpenPlayGameModal from "../../helpers/useOpenPlayGameModal";
import DagaGamesSection from "../../components/DagaGamesSection/DagaGamesSection";
import ArticleSection from "../../components/ArticleSection/ArticleSection";
// import MobileSection from "../../components/HomeComponents/MobileSection/MobileSection";
// import GameItemSlider from "../../components/HomeComponents/GameItemSlider/GameItemSlider";
// import movingBanner from "../../assets/HomeImages/Moving Banner.webp";
// import Layout from "../../layout/Layout/Layout";
// import UserSection from "../../components/HomeComponents/UserSection/UserSection";
// import { AttentionSeeker } from "react-awesome-reveal";
// import DagaSection from "../../components/HomeComponents/DagaSection/DagaSection";

const Home = () => {
  const [announcementState, setAnnouncementState] = useState();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [gameItems, setGameItems] = useState();
  const [playGameState, setPlayGameState] = useState(false);
  const [gamesListBkg, setGamesListBkg] = useState([]);
  const [singleGameModal, setSingleGameModal] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [daga, setDaga] = useState(false);

  const ctx = useContext(UserContext);
  const user = ctx.user;
  const userInfo = ctx.userInfo;

  const openPlayGameModal = useOpenPlayGameModal({
    setPlayGameState,
    setSingleGameModal,
  });

  useEffect(() => {
    setGameItems(ctx.categoryGamesContext?.games);
  });
  useEffect(() => {
    if (gameItems?.length > 0) {
      const flattenedArray = gameItems?.reduce((acc, item) => {
        const items = item?.game_items?.map((image) => ({
          common: item?.common,
          image,
          backgroundColor: bgColor[image.id], // Assuming bgColor is defined elsewhere
        }));
        return acc.concat(items);
      }, []);

      setGamesListBkg(flattenedArray);
      setIsDataLoaded(true);
    }
  }, [gameItems]);
  // console.log("navigator", navigator);
  // console.log("device memory", navigator.deviceMemory);
  // console.log("device", navigator.userAgentData?.mobile ? "Mobile" : "Desktop");
  // console.log("platform", navigator.userAgentData?.platform);
  // console.log("vender", navigator?.vendor);
  // console.log("brand", navigator.userAgentData?.brands[0]?.brand);
  // console.log("window", window);
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const screenResolution = `${screenWidth}x${screenHeight}`;
  // console.log("Screen Size:", screenResolution);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  // console.log("Viewport Size:", viewportWidth, "x", viewportHeight);
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (gl) {
    const renderer = gl.getParameter(gl.RENDERER);
    const vendor = gl.getParameter(gl.VENDOR);
    const version = gl.getParameter(gl.VERSION);
    // console.log("Graphics Card Renderer:", renderer);
    // console.log("Graphics Card Vendor:", vendor);
    // console.log("Graphics Card Version:", version);
  } else {
    // console.log("WebGL is not supported in this browser.");
  }

  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    // User is on an Android device
    // console.log("User is using Android.");
  } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
    // User is on an iOS device (iPad, iPhone, iPod)
    // console.log("User is using iOS.");
  } else {
    // User is not on a mobile device
    // console.log("User is not using a mobile device.");
  }

  // get announcement API
  const getAnnoucementDetail = async () => {
    const res = await APICheckAnnouncement();
    if (Object.keys(res)?.length > 0) {
      setAnnouncementState(res);
      setShowAnnouncement(res ? true : false);
    }
  };

  // get announcement
  useEffect(() => {
    getAnnoucementDetail();
  }, []);
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
  return (
    <>
      <div>
        <TopBanner />
        <div className={styles.marqueeWrapper}>
          <img src={announcement} alt="announcement" />
          <marquee>
            Ngân hàng TP NGUYEN TUNG LAM STK 00003009649 và Ngân hàng VCB NGUYEN
            TUNG LAM STK 1038786902 chính thức ngưng sử dụng nhận chuyển khoản
            từ 16:00:00VCB NGUYEN TUNG LAM STK 1038786
          </marquee>
        </div>

        <div className={styles.backgroundSetter}>
          <div className={styles.gameCategorySectionWrapper}>
            {/*
            <div className={styles.categorySlider}>
              <AttentionSeeker effect="bounce" duration="2000">
                <GameItemSlider />
              </AttentionSeeker> 
            </div>
          */}

            <DagaGamesSection
              gamesListBkg={gamesListBkg}
              setPlayGameState={setPlayGameState}
              setSingleGameModal={setSingleGameModal}
              playGameState={playGameState}
              singleGameModal={singleGameModal}
              gameItems={gameItems}
              daga={daga}
              setDaga={setDaga}
            />
            {/* <div
            //  style={{ padding: "0 15%" }}
            >
              {user && userInfo && <UserSection />}
            </div> */}

            <ArticleSection />
            <GameSection daga={daga} setDaga={setDaga} />

            {/* <DagaSection />
          

          <MobileSection /> */}

            {/*
            <div className={styles.movingBanner}>
              <img src={movingBanner} alt="movingbanner" />
            </div>
          */}
          </div>
          {/*<CameraSection />*/}
        </div>
      </div>

      {showAnnouncement && (
        <AnnouncementPopup
          show={showAnnouncement}
          hideModal={() => setShowAnnouncement(false)}
          announcement={announcementState}
        />
      )}
    </>
  );
};

export default Home;
