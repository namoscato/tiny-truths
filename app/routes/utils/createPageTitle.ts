export const DEFAULT_TITLE = "Tiny Truths";

export function createPageTitle(title: string): string {
  return `${title} - ${DEFAULT_TITLE}`;
}
