import { Fragment } from "react";
import type { EpisodeConfig } from "~/episodes/utils/getEpisodeConfigs";
import styles from "./copyright.module.css";

interface Props {
  episode: Pick<EpisodeConfig, "date" | "copyright">;
}

export const Copyright = ({ episode }: Props) => {
  return (
    <p className={styles.root}>
      &copy; {episode.date.getFullYear()} Tesin & Nick Amoscato.
      {!!episode.copyright.length && (
        <>
          {" "}
          Music by{" "}
          {episode.copyright.map(({ text, url }, index) => (
            <Fragment key={text}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
              {index < episode.copyright.length - 1 && ", "}
            </Fragment>
          ))}
          .
        </>
      )}
    </p>
  );
};
