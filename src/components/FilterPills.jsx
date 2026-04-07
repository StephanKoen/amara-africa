import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import styles from './FilterPills.module.css'

const pills = ['All time', 'Department', 'Region', 'Cost centre', 'Traveler', 'More']

export default function FilterPills() {
  const [active, setActive] = useState('All time')

  return (
    <div className={styles.row}>
      {pills.map(p => (
        <button
          key={p}
          className={`${styles.pill} ${active === p ? styles.active : ''}`}
          onClick={() => setActive(p)}
        >
          {p} <ChevronDown size={12} />
        </button>
      ))}
    </div>
  )
}
