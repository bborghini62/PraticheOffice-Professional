// Shared application typing definitions for the core shell.

export interface RouteDefinition {
  path: string;
  title: string;
}

export interface AppRouteConfig {
  dashboard: RouteDefinition;
  settings: RouteDefinition;
}
