import { BarChart2, Building2, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleLogin(type) {
    login({
      name: type === 'company' ? 'Alex Johnson' : 'Sarah Chen',
      role: type === 'company' ? 'Travel Manager' : 'TMC Analyst',
      type,
    })
    navigate('/overview')
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <div className={styles.logoMark}><BarChart2 size={24} color="#fff" /></div>
        <span className={styles.logoName}>Traivio</span>
      </div>

      <div className={styles.tagline}>AI-powered travel intelligence</div>

      <div className={styles.cards}>
        <button className={styles.card} onClick={() => handleLogin('company')}>
          <div className={styles.cardIcon}><Building2 size={28} /></div>
          <h2 className={styles.cardTitle}>I'm a company</h2>
          <p className={styles.cardDesc}>Manage your corporate travel spend, compliance, and savings opportunities</p>
          <span className={styles.cardCta}>Sign in →</span>
        </button>

        {/* TMC LOGIN — hidden for now, re-enable for TMC launch
        <button className={styles.card} onClick={() => handleLogin('tmc')}>
          <div className={`${styles.cardIcon} ${styles.accent}`}><Globe size={28} /></div>
          <h2 className={styles.cardTitle}>I'm a TMC</h2>
          <p className={styles.cardDesc}>Access your client portfolio dashboard, analytics, and AI audit tools</p>
          <span className={styles.cardCta}>Sign in →</span>
        </button>
        */}
      </div>

      <button className={styles.demoBtn} onClick={() => navigate('/demo')}>
        Try free demo — no login required
      </button>

      <p className={styles.footer}>AI-powered · SOC 2 compliant · GDPR ready</p>
      <p className={styles.tmcLink}>Are you a TMC? Contact us at <a href="mailto:hello@traivio.ai">hello@traivio.ai</a></p>
    </div>
  )
}
