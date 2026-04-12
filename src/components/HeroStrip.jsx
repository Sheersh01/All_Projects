import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './HeroStrip.module.css'

export default function HeroStrip() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim]', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.strip} ref={ref}>
      <p className={styles.kicker} data-anim>Selected work</p>
      <h1 className={styles.heading} data-anim>
        Things I've <em>built</em>
        <br />and shipped.
      </h1>
    </div>
  )
}
