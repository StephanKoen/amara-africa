import styles from './KPICard.module.css'
export default function KPICard({ title, value, subtitle, icon: Icon, color = 'blue', trend }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {Icon && <div className={styles.iconWrap}><Icon size={16} /></div>}
      </div>
      <div className={styles.value}>{value}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {trend !== undefined && (
        <div className={`${styles.trend} ${trend >= 0 ? styles.up : styles.down}`}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last period
        </div>
      )}
    </div>
  )
}