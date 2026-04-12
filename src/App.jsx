import { useState } from 'react'
import { PROJECTS } from './data/projects'
import TopBar from './components/TopBar'
import HeroStrip from './components/HeroStrip'
import Ticker from './components/Ticker'
import FilterBar from './components/FilterBar'
import ProjectCard from './components/ProjectCard'
import ProjectDrawer from './components/ProjectDrawer'
import styles from './App.module.css'

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered =
    activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter)

  return (
    <>
      <TopBar count={filtered.length} />
      <HeroStrip />
      <Ticker />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      <div className={styles.grid}>
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isFeatured={project.featured && activeFilter === 'all'}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />

      <footer className={styles.footer}>
        <span className={styles.footerText}>Built with React + Vite + GSAP</span>
        <span className={styles.footerText}>Update <code>src/data/projects.js</code> to add your projects</span>
      </footer>
    </>
  )
}
