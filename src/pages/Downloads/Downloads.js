import styles from "./Downloads.module.css";
import IosImg from "../../assets/DownloadIcons/iOS.webp";
import AndroidImg from "../../assets/DownloadIcons/Android.webp";
import WebImg from "../../assets/DownloadIcons/Browser.webp";
import VPN from "../../assets/DownloadIcons/VPN.webp";
import { useNavigate } from "react-router-dom";

const downloadsArray = [
  { image: IosImg, name: "iOS", disc: "Tải xuống cho iOS", link: "/ios" },
  {
    image: AndroidImg,
    name: "Android",
    disc: "Tải xuống cho android",
    link: "/android",
  },
  {
    image: WebImg,
    name: "Mở với trình duyệt",
    disc: "Nhấp để sao chép URL",
    link: null,
  },
  { image: VPN, name: "VPN", disc: "Tải xuống VPN", link: "/vpn" },
];

const Downloads = () => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (link == null) {
      const currentURL = window.location.href;
      navigator.clipboard.writeText(currentURL);
    } else {
      navigate(link);
    }
  };

  return (
    <div className={styles.downloadsOverlay}>
      <div className={styles.downloadContentWrapper}>
        {downloadsArray.map((item, index) => (
          <div
            className={styles.linkContent}
            onClick={() => handleClick(item.link)}
            key={index}
          >
            <img src={item.image} alt="img" />
            <div className={styles.linkNameGrp}>
              <div>{item.name}</div>
              <div>{item.disc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Downloads;
