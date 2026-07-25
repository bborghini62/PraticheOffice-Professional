// Shared application typing definitions for the core shell.

export interface RouteDefinition {
  path: string;
  title: string;
}

export interface AppRouteConfig {
  dashboard: RouteDefinition;
  practices: RouteDefinition;
  newPractice: RouteDefinition;
  practiceDetail: RouteDefinition;
  clients: RouteDefinition;
  newClient: RouteDefinition;
  clientDetail: RouteDefinition;
  activities: RouteDefinition;
  newActivity: RouteDefinition;
  practiceActivitiesNew: RouteDefinition;
  documents: RouteDefinition;
  newDocument: RouteDefinition;
  documentDetail: RouteDefinition;
  practiceDocumentsNew: RouteDefinition;
  settings: RouteDefinition;
}
