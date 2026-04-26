# Product Explorer — Cypress Test Suite

## Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Keep this terminal open when running E2E tests.

## Running tests

```bash
# E2E and API tests
npx cypress run

# Component tests
npx cypress run --component

# All tests
npx cypress run && npx cypress run --component

# Interactive Test Runner
npx cypress open
```

## Test structure

```
cypress/
  e2e/
    api.cy.ts                    # API tests
    product-explorer.cy.ts       # E2E tests
  component/
    search-bar.cy.tsx
    product-card.cy.tsx
    product-details-modal.cy.tsx
  fixtures/
    product.json                 # shared fixture for component tests
  support/
    component-index.html         # minimal HTML shell for component tests
    component.ts                 # cy.mount() setup
    e2e.ts
```

## What's covered

**E2E**
- Product search with UI assertions and network response validation via `cy.intercept()`
- Combined search query and category filter — this directly addresses the `TODO (candidate)` comments left in `src/api/products.ts`
- Favourite persistence in `localStorage` across page reloads

**API**
- `GET /products` — response shape validated against the `ProductsResponse` interface
- `GET /products/search` — result relevance verified per item, not just array length
- `GET /products/999999` — 404 handling with `failOnStatusCode: false`

**Component**
- `SearchBar` — renders value from props, calls onChange with current field value
- `ProductCard` — renders product data, calls onOpenDetails with correct id, favourite button label
- `ProductDetailsModal` — open/closed state, loading state, onClose callback

## Technical decisions

**TypeScript used intentionally**
Types from `src/types/product.ts` are used directly in tests — as generics (`cy.request<ProductsResponse>()`), explicit annotations (`const first: Product`), inline iterator types (`product: Product`), and type assertions in network interceptions. `Omit<Product, 'brand' | 'images'>` in fixtures and mocks explicitly excludes optional fields that the tested components don't use — this is intentional, not accidental.

**No Page Object Model**
At this scale POM would be over-engineering. Each selector appears once or twice across the suite. If the suite grew significantly — multiple specs sharing the same selectors and user flows — I'd introduce Page Objects to centralise selectors and keep test scenarios focused on business logic.

**No custom commands**
No action repeats enough across specs to justify extracting it. TASK.md mentions custom commands "where they make sense" — they don't here.

**API tests location**
API tests live in `cypress/e2e/` to match the existing `specPattern` config. In a production project I'd create a dedicated `cypress/api/` directory and extend `specPattern`, keeping HTTP-only tests separate from browser-based E2E tests makes the intent of each spec immediately clear.

**API base URL**
`API_BASE` is a local constant in `api.cy.ts`. In a multi-environment project I'd move it to `cypress.config.ts` under `env.apiBase` and read it via `Cypress.env('apiBase')`, single point of change for staging/production switching.

**Shared mock data**
`mockProduct` is defined separately in `product-card.cy.tsx` and `product-details-modal.cy.tsx`. With more component specs I'd extract it to `cypress/fixtures/product.json` and load it via `cy.fixture()`. At this scale the duplication is acceptable.

**Flakiness**
All E2E tests that trigger network requests use `cy.intercept()` + `cy.wait('@alias')` instead of `cy.wait(<ms>)`. Tests wait for the DOM to stabilise after data loads before interacting, this was necessary given React's async re-renders when filters change.