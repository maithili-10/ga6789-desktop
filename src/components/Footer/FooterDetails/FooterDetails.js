import styles from "./FooterDetails.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/HeaderIcons/GA6789 Logo.webp";
// import CustomerService from "../../../assets/FooterIcons/SocilaIcons/CustomerService.webp";
// import QQService from "../../../assets/FooterIcons/SocilaIcons/QQService.webp";
// import WhatsAppService from "../../../assets/FooterIcons/SocilaIcons/WhatsAppService.webp";
// import EmailService from "../../../assets/FooterIcons/SocilaIcons/EmailService.webp";
// import QAService from "../../../assets/FooterIcons/SocilaIcons/QAService.webp";
// import CallCenterService from "../../../assets/FooterIcons/SocilaIcons/CallCenterService.webp";
import { useEffect } from "react";
import { RiCustomerService2Line } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";
import { SlSocialTumblr } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import FooterVideo from '../../../assets/FooterIcons/FooterVideo.webm'

const aboutUs = [ 
  { name: "GA6789", page: '/ga6789'}, 
  { name: "Điều Khoản Và Diều Kiện", page: '/terms-and-conditions'}, 
  { name: "Chơi có trách nhiệm", page: '/play-responsibility'}, 
  { name: "Miễn trách nhiệm", page: '/disclaimer'}, 
  { name: "Quyền riêng tư", page: '/privacy'}
];

const menu = [
  { name: "Sòng bài" },
  { name: "Thể thao" },
  { name: "Đá Gà" },
  { name: "E-Sports" },
  { name: "Chess" },
  { name: "Bắn cá" },
  { name: "Xổ số" },
  { name: "Khuyến mãi" },
  { name: "TÂI App" }
];

const helpSupport = [
  { name: "Hướng dẫn nạp tiền", page: '/deposit-instructions'},
  { name: "Hướng dẫn rút tiền", page: '/withdraw-instructions'},
  { name: "Câu hỏi thường gặp", page: '/FAQs'},
  { name: "Liên hệ", page: '/contact'}
];

const socialMedia = [
  {
    icon: <RiCustomerService2Line size={20}/>,
    name: "Đường dẫn CSKH",
    link: "https://cskhga6789.com",
  },
  { icon: <BiLogoTelegram size={20}/>, name: "Telegram", link: "https://t.me/csgathomo", },
  { icon: <SlSocialTumblr size={20}/>, name: "Tiktok", link: 'https://www.tiktok.com/@Ga6789chinhthuc' },
  { icon: <SlSocialYoutube size={20}/>, name: "Youtube", link: 'https://www.youtube.com/@Ga6789official' },
  { icon: <SlSocialFacebook size={20}/>, name: "Facebook", link: "https://www.facebook.com/ga6789chinhthuc", }
];

const FooterDetails = React.forwardRef((props, ref) => {
  const { showFooterDetails } = props;
  const navigate = useNavigate();
  const activePage = window.location.pathname;

  const handleClick = (link) => {
    window.open(link);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.maxHeight = showFooterDetails
        ? `${ref.current.scrollHeight}px`
        : "0";
      ref.current.style.opacity = showFooterDetails ? "1" : "0";
    }
  }, [showFooterDetails, ref]);

  // <Details heading="MENU" details={menu} navigate={navigate} activePage={activePage}/>
  // className={styles.footerDetailsOverlay} ref={ref}
  return (
    <div className={styles.footerDetailsOverlay}>
      
      <video autoPlay muted loop>
        <source src={FooterVideo} alt='Video'/>
      </video>
      <div className={styles.footerDetailsWrapper}>
        <Details heading="VỀ CHÚNG TÔI" details={aboutUs} navigate={navigate} activePage={activePage}/>
        <Details heading="GIÚP ĐỠ VÀ HỖ TRỢ" details={helpSupport} navigate={navigate} activePage={activePage}/>
        <div className={styles.socilaContactWrapper}>
          <div className={styles.logoWrapper}>
            <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
          </div>
          {socialMedia.map((item) => (
            <div
              key={item.name}
              className={styles.socialItem}
              onClick={() => item.link && handleClick(item.link)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default FooterDetails;

const Details = ({ heading, details, navigate, activePage }) => (
  <div className={styles.footercontent}>
    <h4>{heading}</h4>
    {details.map((item) => (
      <div key={item.name}>
        <span className={`${activePage == item.page ? styles.activePageStyle : ''}`} onClick={() => { item.page && navigate(item.page)}}>{item.name}</span>
      </div>
    ))}
  </div>
);
