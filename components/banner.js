import styles from "./banner.module.css"

function Banner(props) {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}><span className={styles.title1}>Coffee</span> <span className={styles.title2}>Connoiseur</span> </h1>
        <p className={styles.subtitle}>Discover your local coffee shops!</p>
        <button className={styles.button}>New stores nearby</button>
    </div>
  )
}

export default Banner;