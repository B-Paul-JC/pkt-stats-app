import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/statistics", "routes/statistic.tsx"),
  route("/generate-stats", "routes/generator.tsx"),
  route("/under-construction", "routes/underConstruction.tsx"),
  route("*", "analytics/pages.tsx"),
] satisfies RouteConfig;
