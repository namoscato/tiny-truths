import type { ReactNode } from "react";
import { Link } from "react-router";
import styles from "./buttonLink.module.css";

interface Props {
  /** disabled when `undefined` */
  to: string | undefined;
  children: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const ButtonLink = ({ to, children, startIcon, endIcon }: Props) => {
  return to ? (
    <Link to={to} className={styles.link} prefetch="viewport">
      {startIcon}
      {children}
      {endIcon}
    </Link>
  ) : (
    <button className={styles.disabled} disabled>
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};
