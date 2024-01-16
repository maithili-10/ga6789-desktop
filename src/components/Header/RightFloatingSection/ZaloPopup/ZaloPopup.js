import styles from './ZaloPopup.module.css';
import { Modal } from '@mui/material';
import ZaloQR from '../../../../assets/ZaloQR.webp';

const ZaloPopup = ({zaloModal, close}) => {
  return (
    <Modal className={styles.zaloModalOverlay} open={zaloModal} onClose={close}>
      <div className={styles.zaloModalContent} onClick={(e) => e.stopPropagation()}>
        <div>Liên hệ zalo</div>
        <div>0588495596 <span>(Thảo Xinh)</span></div>
        <img src={ZaloQR} alt='zaloImg'/>
      </div>
    </Modal>
  )
}

export default ZaloPopup