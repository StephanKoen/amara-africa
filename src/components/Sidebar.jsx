import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, AlertTriangle, ShieldAlert, TrendingUp,
  CreditCard, FileText, BarChart2, Brain, MessageSquareText,
  Building2, Menu, X, LogOut, ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './Sidebar.module.css'

const nav = [
  {
    group: 'MAIN',
    items: [
      { to: '/overview',           icon: LayoutDashboard,   label: 'Overview' },
      { to: '/fare-discrepancies', icon: AlertTriangle,      label: 'Fare discrepancies' },
      { to: '/fraud-compliance',   icon: ShieldAlert,        label: 'Fraud & compliance', badge: '3', badgeColor: 'danger' },
      { to: '/savings',            icon: TrendingUp,         label: 'Savings' },
    ]
  },
  {
    group: 'REPORTS',
    items: [
      { to: '/reports',         icon: BarChart2,  label: 'Reports & analytics' },
      { to: '/unused-credits',  icon: CreditCard, label: 'Unused credits', badge: '$9.8K', badgeColor: 'warning' },
      { to: '/contracts',       icon: FileText,   label: 'Contracts' },
    ]
  },
  {
    group: 'INTELLIGENCE',
    items: [
      { to: '/predictive',  icon: Brain,              label: 'Predictive insights' },
      { to: '/ai-analyst',  icon: MessageSquareText,  label: 'AI analyst' },
      { to: '/tmc-portal',  icon: Building2,          label: 'TMC portal' },
    ]
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        {/* Logo */}
        <div className={styles.brand}>
          <div className={styles.logoMark}>
            <BarChart2 size={18} color="#fff" />
          </div>
          <div>
            <div className={styles.brandName}>Traivio</div>
            <div className={styles.brandTagline}>AI travel intelligence</div>
          </div>
        </div>

        {/* Nav groups */}
        <nav className={styles.nav}>
          {nav.map(({ group, items }) => (
            <div key={group} className={styles.navGroup}>
              <div className={styles.groupLabel}>{group}</div>
              {items.map(({ to, icon: Icon, label, badge, badgeColor }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={16} className={styles.navIcon} />
                  <span className={styles.navLabel}>{label}</span>
                  {badge && (
                    <span className={`${styles.navBadge} ${styles[badgeColor]}`}>{badge}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className={styles.footer}>
          <div className={styles.userAvatar}>
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.name || 'User'}</div>
            <div className={styles.userRole}>{user?.role || 'Travel Manager'}</div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Sign out">
            <LogOut size={14} />
          </button>
        </div>
      </aside>
    </>
  )
}
