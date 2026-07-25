# Architecture

PraticheOffice Professional is organized as a layered application so the foundation can scale without mixing responsibilities.

## Core
- Contains the application shell, route configuration, layout primitives, and shared types.
- The router is centralized in [src/core/router/AppRouter.tsx](src/core/router/AppRouter.tsx) and the path constants live in [src/core/router/routes.ts](src/core/router/routes.ts).
- The Material UI theme is centralized in [src/theme/theme.ts](src/theme/theme.ts).

## Modules
- Feature-oriented modules live under [src/modules](src/modules).
- Each module should expose a page component and keep business logic minimal.
- Current modules: dashboard and settings.

## Shared
- Shared UI components, hooks, services, and helpers live under [src/shared](src/shared).
- Shared code should remain generic and reusable across modules.

## Routing
- The application uses React Router with a single layout shell.
- Main pages are loaded lazily through React.lazy and Suspense to keep the initial bundle lean.
- The sidebar uses route constants from the core router layer rather than hard-coded URLs.

## Theme
- The visual system is defined once in the MUI theme and applied through the app root.
- Components should consume the shared theme instead of redefining styling values.

## Core Runtime
- The runtime layer contains the application bootstrap, global error handling, logging, configuration, and notification services.
- AppBootstrap wires the router with error boundaries, notifications, and lazy-loading fallback UI.
- Errors are captured centrally so the application stays resilient without changing the existing visual shell.

## Rules for future modules
- Keep modules focused on a single feature area.
- Avoid placing domain logic in shared components.
- Reuse shared services and utilities where appropriate.
- Keep routes centralized in the core router package.
