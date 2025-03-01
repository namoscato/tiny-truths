import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  ...prefix("episodes", [
    index("./routes/episodes.tsx"),
    route(":number", "./routes/episode.tsx"),
  ]),
] satisfies RouteConfig;
