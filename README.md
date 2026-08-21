# Stall — Sprint 06 E-Commerce SPA

A multi-route e-commerce frontend built with React and `react-router-dom`. Users can browse a product catalog, view individual product details, manage a global shopping cart, and (optionally) pass through a mock login before checkout — all without a single browser page reload.

Built for **Prodesk IT — Sprint 06**.

---

## Live Data Source

This project has **no backend of its own**. All product data comes from the public [DummyJSON](https://dummyjson.com/) REST API:

- `GET https://dummyjson.com/products` — full product list
- `GET https://dummyjson.com/products/:id` — single product by ID

No server, database, or API keys required.

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI library | React (functional components + hooks) |
| Routing | `react-router-dom` (v6+) |
| Global state | React Context API (`CartContext`) — no Redux |
| Persistence | `localStorage` |
| Data fetching | `fetch` / `useEffect` |
| Styling | CSS |

---

## Features

### Phase 1 — Base MVP
- [x] `BrowserRouter` with routes for `/` (Home) and `/shop` (product grid)
- [x] Dynamic routing to `/product/:id` on product click
- [x] `useParams()` on the Product View to fetch and render a single product

### Phase 2 — Priority 1
- [x] Global `CartContext` wrapping the app
- [x] "Add to Cart" action from the Product View
- [x] Persistent Navbar with a live-updating cart badge

### Phase 3 — Stretch Goals
- [x] Cart state synced to `localStorage` (survives refresh)
- [x] Mock authentication via `/login` — "Login as Guest" toggles global auth state
- [x] Protected `/checkout` route — unauthenticated users are redirected to `/login`

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Persistent nav, cart icon + badge
│   ├── ProductCard.jsx     # Card used in the shop grid
│   └── ProtectedRoute.jsx  # Auth guard wrapper for /checkout
├── context/
│   ├── CartContext.jsx     # Cart state, addToCart, localStorage sync
│   └── AuthContext.jsx     # isLoggedIn state (mock auth)
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── Login.jsx
│   └── Checkout.jsx
├── App.jsx                 # Route definitions
└── main.jsx                # App entry point
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Install routing library (if not already present)
npm install react-router-dom

# Run the dev server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA), depending on your setup.

---

## Routes

| Path | Description | Access |
|---|---|---|
| `/` | Home / landing page | Public |
| `/shop` | Product grid, fetched from DummyJSON | Public |
| `/product/:id` | Single product detail view | Public |
| `/login` | Mock login — "Login as Guest" | Public |
| `/checkout` | Cart summary and order review | **Protected** — redirects to `/login` if not authenticated |

---

## Notes

- Authentication is intentionally mocked — there's no real user account system, password, or server-side session. "Login as Guest" simply flips a boolean in `AuthContext`.
- Cart data is stored client-side only (`localStorage`), so it's scoped to a single browser and will not sync across devices.
- Product data is fetched live from DummyJSON on each visit to `/shop` and `/product/:id`; no data is cached beyond the current session except what lives in the cart.

---

## Status

Submission links are not yet enabled on the sprint dashboard. Work is being saved locally until submission opens.