# Architecture

PraticheOffice Professional is organized as a layered application so the foundation can scale without mixing responsibilities.

## Core
- Contains the application shell, route configuration, layout primitives, shared types, and the initial domain model layer.
- The router is centralized in [src/core/router/AppRouter.tsx](src/core/router/AppRouter.tsx) and the path constants live in [src/core/router/routes.ts](src/core/router/routes.ts).
- The Material UI theme is centralized in [src/theme/theme.ts](src/theme/theme.ts).
- The domain foundation lives under [src/core/domain](src/core/domain) and defines pure TypeScript interfaces for common entities, users, roles, groups, workspaces, documents, workflow, tasks, and practices.

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
- The runtime layer contains the application bootstrap, global error handling, logging, configuration, notification services, and the database foundation.
- AppBootstrap wires the router with error boundaries, notifications, lazy-loading fallback UI, configuration initialization, and database initialization.
- Errors are captured centrally so the application stays resilient without changing the existing visual shell.

## Configuration service
- The configuration layer lives under [src/core/config](src/core/config) and provides a centralized service with typed configuration values.
- Configuration values are resolved with the priority runtime > environment > default and stay isolated from the UI and routing layers.
- The service is initialized before the database service during app bootstrap.

## Database foundation
- The database layer lives under [src/core/database](src/core/database) and provides an abstract adapter contract and a centralized service.
- The initial implementation uses an in-memory adapter for development and testing without introducing external dependencies.
- The database service is initialized during app bootstrap and uses the existing loading and error handling flow.

## Persistence layer
- A new persistence abstraction lives under [src/core/persistence](src/core/persistence) and defines a provider-based contract for future storage backends.
- The current implementation uses an in-memory provider as the default strategy while keeping the API ready for SQLite, Google Drive, and Dropbox stubs.
- The configuration service now exposes a persistence type setting so the runtime can select the appropriate provider without changing the UI or business flows.

## Rules for future modules
- Keep modules focused on a single feature area.
- Avoid placing domain logic in shared components.
- Reuse shared services and utilities where appropriate.
- Keep routes centralized in the core router package.
- Keep domain entities in the core domain layer and avoid introducing persistence or service logic into the models.
- Keep functional product requirements documented in the blueprint set under [docs/blueprint](docs/blueprint) so implementation work stays aligned with the intended product scope.

## Project planning documentation
- The official product planning set lives under [docs/project](docs/project).
- Use [docs/project/BACKLOG.md](docs/project/BACKLOG.md) to track work items by type and priority.
- Use [docs/project/ROADMAP.md](docs/project/ROADMAP.md) for the release sequence from Alpha to 1.0.
- Use [docs/project/EPICS.md](docs/project/EPICS.md) to keep the core product scope aligned with the delivery plan.
- Use [docs/project/SPRINTS.md](docs/project/SPRINTS.md) for near-term implementation planning.
- Use [docs/project/PROJECT-STATUS.md](docs/project/PROJECT-STATUS.md) and [docs/project/PROJECT-METRICS.md](docs/project/PROJECT-METRICS.md) to monitor health and progress.
- Use [docs/project/RELEASE-PLAN.md](docs/project/RELEASE-PLAN.md) and [docs/project/CHANGE-REQUESTS.md](docs/project/CHANGE-REQUESTS.md) to coordinate releases and incoming change requests.
