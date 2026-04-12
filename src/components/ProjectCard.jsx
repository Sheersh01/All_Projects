import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { tagCls, CAT_CLASSES } from "../data/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index, onClick, isFeatured }) {
  const ref = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.07,
        ease: "power3.out",
      },
    );
  }, [index]);

  const { emoji, img, title, cat, catLabel, desc, tags, stack, links } =
    project;
  const catCls = CAT_CLASSES[cat] || "cat-fs";
  const visibleStack = stack.slice(0, 5);
  const extraStack = stack.length > 5 ? stack.length - 5 : 0;
  const hasLiveLink = !!links.live;
  const hasImage = !!img && !imgError;

  useEffect(() => {
    setImgError(false);
  }, [img]);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isFeatured ? styles.featured : ""}`}
      onClick={onClick}
      style={{ opacity: 0 }}
    >
      <div className={styles.meta}>
        <span className={styles.index}>0{index + 1}</span>
        <span className={`${styles.catBadge} ${styles[catCls]}`}>
          {catLabel}
        </span>
      </div>

      <div className={styles.emojiWrap}>
        {hasImage ? (
          <img
            src={img}
            alt={`${title} preview`}
            className={styles.mediaImage}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.emoji}>{emoji}</span>
        )}
      </div>

      <div className={styles.tags}>
        {tags.map((t) => (
          <span key={t} className={`${styles.tag} ${styles[tagCls(t)]}`}>
            {t}
          </span>
        ))}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>

      <div className={styles.stack}>
        {visibleStack.map((s) => (
          <span key={s} className={styles.pill}>
            {s}
          </span>
        ))}
        {extraStack > 0 && <span className={styles.pill}>+{extraStack}</span>}
      </div>

      <div className={styles.foot}>
        <div className={styles.links}>
          <a
            href={links.github}
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            github ↗
          </a>
          {hasLiveLink ? (
            <a
              href={links.live}
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              live ↗
            </a>
          ) : (
            <span className={`${styles.link} ${styles.notLive}`}>not live</span>
          )}
        </div>
        <div className={styles.arrow}>→</div>
      </div>
    </div>
  );
}
