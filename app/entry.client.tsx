import * as Sentry from "@sentry/react-router";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

Sentry.init({
  dsn: "https://fadacc8f148ec6cceddf993a81867ac0@o4508921044205568.ingest.us.sentry.io/4508921047416832",
  environment: import.meta.env.MODE,
  enabled: import.meta.env.PROD,
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
