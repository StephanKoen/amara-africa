import styles from './PageHeader.module.css'

export default function PageHeader({ title, description, children }) {
  return (
    <div className={styles.header}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  )
}
