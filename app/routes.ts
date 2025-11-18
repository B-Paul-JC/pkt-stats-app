import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx", [route("statistic/:sid", "routes/statistic.tsx")]),
  route("/under-construction", "routes/underConstruction.tsx"),
  route("*", "analytics/pages.tsx"),
] satisfies RouteConfig;
