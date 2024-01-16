import styles from "./Chess.module.css";
import ChessBanner from "../../assets/ChessPage/ChessImage.png";
import ChessIcon from "../../assets/ChessPage/ChessIcon.png";
import Game1 from "../../assets/ChessPage/All.png";
import Game2 from "../../assets/ChessPage/Evoplay.png";
import Game3 from "../../assets/ChessPage/LC.png";
import Game4 from "../../assets/ChessPage/Rich88.png";
import Game5 from "../../assets/ChessPage/KingMaker.png";
import Game6 from "../../assets/ChessPage/Card365.png";
import Game7 from "../../assets/ChessPage/Cq9.png";
import Game8 from "../../assets/ChessPage/JDB.png";
import Game9 from "../../assets/ChessPage/Jili.png";
import Game10 from "../../assets/ChessPage/MG.png";
import Game11 from "../../assets/ChessPage/PS.png";
import Game12 from "../../assets/ChessPage/PT.png";
import image1 from "../../assets/ChessPage/Baccarat 777.png";
import image2 from "../../assets/ChessPage/BlackJack Lucky.png";
import image3 from "../../assets/ChessPage/Patrick's Magic Field.png";
import image4 from "../../assets/ChessPage/WP CaiShen Fruit Mario.png";
import image5 from "../../assets/ChessPage/Tai Xiu.png";
import image6 from "../../assets/ChessPage/Scratch Match.png";
import image7 from "../../assets/ChessPage/Penalty Shoot Out.png";
import image8 from "../../assets/ChessPage/Four Cards Bull.png";
import image9 from "../../assets/ChessPage/BlackJack.png";
import image10 from "../../assets/ChessPage/Three Cards.png";
import image11 from "../../assets/ChessPage/Three Cards.png";
import image12 from "../../assets/ChessPage/Three Cards.png";
import image13 from "../../assets/ChessPage/Three Cards.png";
import image14 from "../../assets/ChessPage/Three Cards.png";

import searchIcon from "../../assets/ChessPage/SearchIcon.png";
import PageBanner from "../../components/PageBanner/PageBanner";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
const gamesList = [
  { img: Game1, link: "link", text: "ALL GAMES" },
  { img: Game2, link: "link", text: "EVOPLAY" },
  { img: Game3, link: "link", text: "LC" },
  { img: Game4, link: "link", text: "RICH88" },
  { img: Game5, link: "link", text: "KINGMAKER" },
  { img: Game6, link: "link", text: "CARD365" },
  { img: Game7, link: "link", text: "CQ9" },
  { img: Game8, link: "link", text: "JDB" },
  { img: Game9, link: "link", text: "JILI" },
  { img: Game10, link: "link", text: "MG" },
  { img: Game11, link: "link", text: "PS" },
  { img: Game12, link: "link", text: "PT" },
];

const gamesList1 = [
  { img: image1, link: "link", text: "BlackJack Lucky Sevens" },
  { img: image2, link: "link", text: "Baccarat 777" },
  { img: image3, link: "link", text: "Penalty Shoot Out" },
  { img: image4, link: "link", text: "Scratch Match" },
  { img: image5, link: "link", text: "Patrick's Magic Field" },
  { img: image6, link: "link", text: "Tai Xiu" },
  {
    img: image7,
    link: "link",
    text: "WP CaiShen Fruit Mario (Arcade Edition)",
  },
];

const gamesList2 = [
  { img: image8, link: "link", text: "JDB" },
  { img: image9, link: "link", text: "JILI" },
  { img: image10, link: "link", text: "MG" },
  { img: image11, link: "link", text: "PS" },
  { img: image12, link: "link", text: "PT" },
  { img: image13, link: "link", text: "PT" },
  { img: image14, link: "link", text: "PT" },
];

const gamesList3 = [
  { img: image1, link: "link", text: "BlackJack Lucky Sevens" },
  { img: image2, link: "link", text: "Baccarat 777" },
  { img: image3, link: "link", text: "Penalty Shoot Out" },
  { img: image4, link: "link", text: "Scratch Match" },
  { img: image5, link: "link", text: "Patrick's Magic Field" },
  { img: image6, link: "link", text: "Tai Xiu" },
  {
    img: image7,
    link: "link",
    text: "WP CaiShen Fruit Mario (Arcade Edition)",
  },
];

const gamesList4 = [
  { img: image8, link: "link", text: "JDB" },
  { img: image9, link: "link", text: "JILI" },
  { img: image10, link: "link", text: "MG" },
  { img: image11, link: "link", text: "PS" },
  { img: image12, link: "link", text: "PT" },
  { img: image13, link: "link", text: "PT" },
  { img: image14, link: "link", text: "PT" },
];

const gamesList5 = [
  { img: image1, link: "link", text: "BlackJack Lucky Sevens" },
  { img: image2, link: "link", text: "Baccarat 777" },
  { img: image3, link: "link", text: "Penalty Shoot Out" },
  { img: image4, link: "link", text: "Scratch Match" },
  { img: image5, link: "link", text: "Patrick's Magic Field" },
  { img: image6, link: "link", text: "Tai Xiu" },
  {
    img: image7,
    link: "link",
    text: "WP CaiShen Fruit Mario (Arcade Edition)",
  },
];

const gamesList6 = [
  { img: image8, link: "link", text: "JDB" },
  { img: image9, link: "link", text: "JILI" },
  { img: image10, link: "link", text: "MG" },
  { img: image11, link: "link", text: "PS" },
  { img: image12, link: "link", text: "PT" },
  { img: image13, link: "link", text: "PT" },
  { img: image14, link: "link", text: "PT" },
];
const Chess = () => {
  const [searchTerm, setSearchTerm] = useState("");
 const[selected,setSelected]=useState(null)
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // console.log(selected)
  return (
    <div className={styles.chessOverlay}>
        <PageBanner
          BannerIcon={ChessIcon}
          title="CHESS"
          description="LET'S PLAY NOW AND GET A CHANCE TO GRAB YOUR BIG MONEY!"
          BannerImg={ChessBanner}
        />
        <div className={styles.gamesOverlay}>
          <div className={styles.gamesWrapper}>
            {gamesList.map((item) => (
              <div
                key={item.img}
                className={`${styles.games} ${
                  selected? styles.active
                    : ""
                }`}
              >
                <img src={item.img} alt="game" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.gamesListWrapper}>
            <div className={styles.searchInputWrapper}>
              <div className={styles.formInput}>
                <input
                  type="text"
                  placeholder="Search game ..."
                  name="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.currentTarget.value);
                  }}
                />
                <img src={searchIcon} alt="search" />
              </div>
            </div>

            <div className={styles.allGamesWraper}>
              <div className={styles.allGames}>
                {gamesList1.map((item) => (
                  <div
                    key={item.img}
                    className={styles.gameContentWrapper}
                    onClick={() => alert("chess Game")}
                  >
                    <div className={styles.gameImgOverlay}>
                      <img src={item.img} alt="game" />
                      <div className={styles.gameButtonWrapper}>
                        <button>Đặt Cược</button>
                      </div>
                    </div>
                    <div>{item.text}</div>
                  </div>
                ))}
              </div>           
            </div>
            <div className={styles.pagination}>
              <Pagination />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Chess;