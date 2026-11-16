# avexyk.github.io (v3.0)

Personal website and custom hub built with modern Angular and strict Clean Architecture principles.

## Tech Stack

* **Framework:** Angular v22 (Zoneless, Standalone Components, Reactive Signals)
* **Styling:** Tailwind CSS v4 (CSS-first configuration with custom variants)
* **Architecture:** Uncle Bob's Clean Architecture (4 Rings + Transversal Libraries) + MVVM Pattern
* **Testing:** Vitest (fast unit testing suite)
* **Build & Deployment:** Angular Application Builder (`@angular/build:application`) with Static Site Generation (SSG Prerender) and GitHub Actions CI/CD.

---

## Architectural Layers

The source code in `src/app/` is strictly organized into decoupled layers following the dependency rule:

1. **`@libraries/`** — Pure functional building blocks (e.g., discriminated `Result<S, E>` pattern).
2. **`@entities/`** — Immutable domain models and value objects.
3. **`@business-objects/`** — Abstract ports (interfaces), options configuration, and application business rules.
4. **`@gateways/`** — Interface adapters for static JSON content fetching, SSR-safe color mode management, and test fakes.
5. **`@view-models/`** — Reactive presentation state powered by Angular `signal()` and `computed()`.
6. **`@views/`** — Dumb UI components utilizing `ChangeDetectionStrategy.OnPush` and native control flow (`@if`, `@for`).
7. **`@ioc/`** — Composition root wiring all dependency injection providers.

---

## Development Server

Run `npm start` for a local development server. Navigate to `http://localhost:4200/`. The application will automatically reload when source files change.

## Running Unit Tests

Run `npm test` (or `npm test -- --watch=false`) to execute unit test suites via **Vitest**.

## Production Build & SSG

Run `npm run build` to generate the static prerendered production bundle in the `dist/avexyk/browser` directory.