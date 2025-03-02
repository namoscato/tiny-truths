import styles from "./recordedDate.module.css";

interface Props {
  date: Date;
}

export const RecordedDate = ({ date }: Props) => {
  return (
    <p className={styles.root}>
      Recorded{" "}
      <time dateTime={date.toISOString().split("T")[0]}>
        {date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })}
      </time>
    </p>
  );
};
