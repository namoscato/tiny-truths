import { useEffect } from "react";
import { useLocation } from "react-router";

export const GoatCounter = () => {
  const location = useLocation();

  useEffect(() => {
    window.goatcounter?.count({ path: location.pathname });
  }, [location]);

  return (
    <script
      data-goatcounter="https://amoscato-podcast.goatcounter.com/count"
      data-goatcounter-settings='{"no_onload": true, "no_events": true}'
      async
      src="//gc.zgo.at/count.js"
    />
  );
};
