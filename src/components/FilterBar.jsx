import { PROJECTS } from '../data/projects'
import styles from './FilterBar.module.css'

const CATEGORY_ORDER = ['fullstack', 'backend', 'frontend', 'creative']
const cats = CATEGORY_ORDER.filter(cat => PROJECTS.some(project => project.cat === cat))

export default function FilterBar({ active, onChange }) {
  const options = [{ key: 'all', label: 'All' }, ...cats.map(c => ({
    key: c,
    label: PROJECTS.find(p => p.cat === c)?.catLabel || c,
  }))]

  return (
    <div className={styles.bar}>
      <div className={styles.filters}>
        {options.map(o => (
          <button
            key={o.key}
            className={`${styles.btn} ${active === o.key ? styles.on : ''}`}
            onClick={() => onChange(o.key)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <span className={styles.hint}>Click any card to explore →</span>
    </div>
  )
}
