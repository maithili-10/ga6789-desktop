import styles from './GameButton.module.css'

const GameButton = ({buttonLink}) => {
  return (
    <button className={styles.gameButton} onClick={() => alert(buttonLink)}>Đặt Cược</button>
  )
}

export default GameButton