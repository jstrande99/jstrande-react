import styles from "./SectionLabel.module.css";

export default function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <span className={styles.label}>
      <span className={styles.index}>{index}</span>
      <span className={styles.rail} aria-hidden />
      <span>{children}</span>
    </span>
  );
}
