import { ArrowRight } from 'lucide-react'
import styles from './AlertCard.module.css'

export default function AlertCard({ tag, tagColor, title, value, subtitle, cta, ctaAmount, gradient, onCtaClick }) {
  return (
    <div className={styles.card} style={{ background: gradient }}>
      <div className={styles.top}>
        <span className={`${styles.tag} ${styles[tagColor]}`}>{tag}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.label}>{title}</div>
        {value && <div className={styles.value}>{value}</div>}
        {subtitle && <div className={styles.sub}>{subtitle}</div>}
      </div>
      <div className={styles.footer}>
        <button className={styles.cta} onClick={onCtaClick}>
          {cta} <ArrowRight size={12} />
        </button>
        {ctaAmount && <span className={styles.amount}>{ctaAmount}</span>}
      </div>
    </div>
  )
}
