import { Link } from "react-router";
import styles from "./episodeList.module.css";
import logoImg from "./images/logo.png";
import { RecordedDate } from "./RecordedDate";
import type { EpisodeConfig } from "./utils/getEpisodeConfigs";

export type EpisodeListConfig = Pick<
  EpisodeConfig,
  "number" | "title" | "summary" | "date"
>;

interface Props {
  episodes: EpisodeListConfig[];
}

export const EpisodeList = ({ episodes }: Props) => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          {/* TODO: consolidate with EpisodeContent */}
          <Link to="/" className={styles.logoLink}>
            <img src={logoImg} alt="Tiny Truths logo" width={469} />
          </Link>
        </div>
      </header>
      <ol className={styles.list}>
        {episodes.map((episode) => (
          <li key={episode.number}>
            <Link className={styles.episode} to={`/episodes/${episode.number}`}>
              <h2>{episode.title}</h2>
              <p>{episode.summary}</p>
              <RecordedDate date={episode.date} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
