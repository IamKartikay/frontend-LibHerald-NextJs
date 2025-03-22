"use client"
import styles from "../home/home.module.css"

const Button = ({ buttonText, onClick, bgcolor, textColor }) => {
  return (
    <button
      className={styles.customButton}
      style={{ backgroundColor: bgcolor }}
      onClick={onClick ? () => onClick() : undefined}
    >
      <p style={{ color: textColor }}>{buttonText}</p>
    </button>
  )
}

export default Button

