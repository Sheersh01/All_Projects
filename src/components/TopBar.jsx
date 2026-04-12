import styles from './TopBar.module.css'

export default function TopBar({ count }) {
  return (
    <div className={styles.topbar}>
      <span className={styles.title}>Project Showcase</span>
      <span className={styles.count}>{count} project{count !== 1 ? 's' : ''}</span>
    </div>
  )
}
