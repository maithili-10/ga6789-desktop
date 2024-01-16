import styles from "./DagaSection.module.css";
import DagaIcon from "../../../../assets/HeaderIcons/Daga Icon.webp";
import DagaImage from "../../../../assets/HeaderIcons/HeaderDaga.webp";
import { APIDagaPoints } from "../../../../helpers/APIs/DagaAPI";
import { useQuery } from "react-query";
// import HotTag from "../../../../assets/HeaderIcons/hot.webp";

const DagaSection = ({ setSelected, setShowGames, setGames }) => {
  const dagaObject = { icon: DagaImage };
  // use Query to get DAGA data from DB
  const { data } = useQuery("dagaData", APIDagaPoints);
  // Set Daga games in the hover section
  const handleHover = () => {
    // setGames([data?.daga_game]);
    setGames([dagaObject]);
  };

  return (
    <div
      className={styles.dagaWrapper}
      onMouseEnter={() => {
        setShowGames("daga");
        handleHover();
      }}
      onMouseLeave={() => {
        setShowGames(false);
      }}
    >
      <img src={DagaIcon} alt="download" />
      <span>ĐÁ GÀ</span>
      {/* <img className={styles.hotImg} src={HotTag} alt="hot"/> */}
    </div>
  );
};

export default DagaSection;
