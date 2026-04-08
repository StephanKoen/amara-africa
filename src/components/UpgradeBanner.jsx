import styles from './UpgradeBanner.module.css'

export default function UpgradeBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.heading}>Impressed? This is just the demo.</div>
        <div className={styles.sub}>
          Sign up for Traivio to save your data, run scheduled reports,
          monitor your travel program in real time, and get AI alerts.
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.primary}>Start free trial</button>
        <button className={styles.outline}>Talk to sales</button>
      </div>
    </div>
  )
}
