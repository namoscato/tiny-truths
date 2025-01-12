export function formatTime(seconds: number | undefined): string {
  if (!seconds) {
    return "00:00";
  }

  return new Date(seconds * 1000).toISOString().slice(14, 19);
}
