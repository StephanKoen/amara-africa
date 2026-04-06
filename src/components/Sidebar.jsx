import { NavLink } from 'react-router-dom'
import { LayoutDashboard, AlertTriangle, ShieldAlert, TrendingUp, Brain, MessageSquareText, Menu, X } from 'lucide-react'
import { useState } from 'react'
import styles from './Sidebar.module.css'
const nav = [
  { to: '/overview', icon: LayoutDashboard, label: 'Overview' },
  { to: '/fare-discrepancies', icon: AlertTriangle, label: 'Fare Discrepancies' },
  { to: '/fraud-compliance', icon: ShieldAlert, label: 'Fraud & Compliance' },
  { to: '/savings', icon: TrendingUp, label: 'Savings Opportunities' },
  { to: '/predictive', icon: Brain, label: 'Predictive Insights' },
  { to: '/ai-analyst', icon: MessageSquareText, label: 'AI Analyst' },
]
export default function Sidebar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setOpen(o => !o)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>T</div>
          <div>
            <div className={styles.brandName}>Traivio</div>
            <div className={styles.brandTagline}>AI-powered travel intelligence</div>
          </div>
        </div>
        <nav className={styles.nav}>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} onClick={() => setOpen(false)}>
              <Icon size={18} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.footer}><div className={styles.footerBadge}>Beta</div><span>v0.1.0</span></div>
      </aside>
    </>
  )
}