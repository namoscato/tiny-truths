import type { ReactNode } from "react";
import styles from "./footer.module.css";

interface Props {
  children: ReactNode;
}

export const Footer = ({ children }: Props) => {
  return (
    <footer className={styles.root}>
      <div className={styles.content}>{children}</div>
    </footer>
  );
};
