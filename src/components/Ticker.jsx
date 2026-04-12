import { SKILLS } from '../data/projects'
import styles from './Ticker.module.css'

export default function Ticker() {
  const items = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS]

  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {items.map((s, i) => (
          <span key={i} className={styles.item}>{s}</span>
        ))}
      </div>
    </div>
  )
}
