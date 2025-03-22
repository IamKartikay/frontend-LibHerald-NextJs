import styles from "../home/home.module.css"

const HomeTabs = ({ heading, text }) => {
  return (
    <div className={styles.homeTabs}>
      <p style={{ color: "#3a54b4", fontSize: 20, fontWeight: 700 }}>{heading}</p>
      <p style={{ textAlign: "center", fontWeight: "200", lineHeight: "1.875em" }}>{text}</p>
    </div>
  )
}

export default HomeTabs

