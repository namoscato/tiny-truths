declare var goatcounter: GoatCounter | undefined;

interface GoatCounter {
  /**
   * Send a pageview or event to GoatCounter.
   *
   * @see https://www.goatcounter.com/help/js#count-vars-1285
   */
  count(vars?: {
    path?: string;
    title?: string;
    referrer?: string;
    event?: boolean;
  }): void;
}
