import styles from './ImageSection.module.css'

const ImageSection = ({image, caption}) => {
  return (
    <div className={styles.imageContentOverlay}>
      <div className={styles.imageWrapper}>
        <img src={image} alt="img" />
      </div>
      <p>
        <i>{caption}</i>
      </p>
    </div>
  )
}

export default ImageSection