import { X, AlertTriangle, TrendingUp, CreditCard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './WelcomePopup.module.css'

const chips = [
  { label: 'Show fraud flags',  to: '/fraud-compliance', icon: AlertTriangle },
  { label: 'View savings',      to: '/savings',           icon: TrendingUp },
  { label: 'Expiring credits',  to: '/unused-credits',    icon: CreditCard },
]

export default function WelcomePopup({ onClose }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  function go(to) {
    navigate(to)
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.close} onClick={onClose}><X size={16} /></button>
        <div className={styles.avatar}>
          {user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() || 'U'}
        </div>
        <h2 className={styles.greeting}>Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋</h2>
        <p className={styles.summary}>
          Since your last login: <strong>3 new fraud flags</strong>, <strong>$9,800 in credits expiring in 8 days</strong>, and <strong>$41K in savings opportunities</strong> identified.
        </p>
        <div className={styles.chips}>
          {chips.map(({ label, to, icon: Icon }) => (
            <button key={to} className={styles.chip} onClick={() => go(to)}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
