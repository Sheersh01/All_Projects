import { useEffect, useState } from "react";
import { tagCls } from "../data/projects";
import styles from "./ProjectDrawer.module.css";

export default function ProjectDrawer({ project, onClose }) {
  const isOpen = !!project;
  const [imgError, setImgError] = useState(false);
  const img = project?.img;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setImgError(false);
  }, [img]);

  if (!project) return null;

  const { emoji, title, cat, catLabel, full, tags, stack, links } = project;
  const hasLiveLink = !!links.live;
  const hasImage = !!img && !imgError;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      <div className={styles.bg} onClick={onClose} />
      <div className={styles.drawer}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <div className={styles.top}>
          <div className={styles.img}>
            {hasImage ? (
              <img
                src={img}
                alt={`${title} preview`}
                className={styles.mediaImage}
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              emoji
            )}
          </div>
          <div className={styles.header}>
            <p className={styles.kicker}>
              {catLabel} · {cat}
            </p>
            <h2 className={styles.title}>{title}</h2>
          </div>
        </div>

        <p className={styles.desc}>{full}</p>

        <p className={styles.label}>Keywords</p>
        <div className={styles.tags}>
          {tags.map((t) => (
            <span key={t} className={`${styles.tag} ${styles[tagCls(t)]}`}>
              {t}
            </span>
          ))}
        </div>

        <p className={styles.label}>Tech stack</p>
        <div className={styles.stack}>
          {stack.map((s) => (
            <span key={s} className={styles.pill}>
              {s}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          {hasLiveLink ? (
            <a
              href={links.live}
              className={`${styles.btn} ${styles.primary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              view live ↗
            </a>
          ) : (
            <span
              className={`${styles.btn} ${styles.primary} ${styles.btnDisabled}`}
            >
              not live
            </span>
          )}
          <a
            href={links.github}
            className={`${styles.btn} ${styles.secondary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            github →
          </a>
        </div>
      </div>
    </div>
  );
}
