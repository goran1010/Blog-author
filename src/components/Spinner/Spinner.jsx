import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles["spinner-img"]}></div>
    </div>
  );
}
