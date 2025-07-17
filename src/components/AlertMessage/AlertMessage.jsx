import styles from "./AlertMessage.module.css";

export default function AlertMessage({ alert }) {
  return <div className={styles.alert}>{alert}</div>;
}
