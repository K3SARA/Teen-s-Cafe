# Teen's Cafe — Billing & Stock Management

A cute, pastel Point-of-Sale and inventory app built with **React 19**, **Vite**, **Tailwind CSS v4**, and a small **Express** backend for persistence. Fully responsive: sidebar nav + right-hand cart on desktop, bottom tab bar + slide-up cart sheet on mobile.

## Project structure

```
server/
  index.js               # Express API + serves the built frontend in production
  store.js                # JSON-file datastore (menu, inventory, orders), seeded from src/data/menuData.js

src/
  api/
    client.js              # fetch wrappers for the backend API
  data/
    menuData.js             # seed data (menu items + inventory) for a fresh datastore
    businessInfo.js         # receipt header details (name, address, phone)
    constants.js            # TAX_RATE
  components/
    Sidebar.jsx              # desktop left nav
    BottomNav.jsx            # mobile bottom tab bar
    MobileHeader.jsx         # mobile top brand bar
    Footer.jsx               # "from j&co. software solutions" strip
    POS.jsx                   # menu grid + category filter (Billing screen)
    MenuItemCard.jsx          # single menu tile (with edit affordance)
    ProductFormModal.jsx      # add/edit/delete a menu item
    Cart.jsx                  # shared cart UI (desktop sidebar + mobile sheet)
    CartSheet.jsx             # mobile bottom-sheet wrapper around Cart
    MobileCartBar.jsx         # floating "View order" pill on mobile
    Inventory.jsx             # stock screen
    InventoryItem.jsx         # single stock row with +/- and low-stock highlight
    Receipt.jsx / ReceiptModal.jsx  # printable receipt with logo + business details
    Logo.jsx                  # scalable SVG logo mark
  App.jsx                     # top-level state + data fetching, wired to the API
  main.jsx
  index.css                   # Tailwind import + pastel theme tokens (@theme) + print styles
```

## How to run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

This runs the Vite dev server (client, port 5173) and the Express API (port 3001) together; Vite proxies `/api/*` requests to the backend. Open **http://localhost:5173**.

Other scripts:

```bash
npm run build      # production build to dist/
npm start           # run the production server (serves the API + built frontend on one port)
npm run preview     # preview the Vite build only, without the API (rarely needed)
```

To try the full production setup locally: `npm run build && npm start`, then open the port it prints (defaults to 3001, or `$PORT` if set).

## Data & persistence

All menu items, inventory levels, and orders are stored server-side in a single JSON file at `data/db.json` (created and seeded automatically on first run from `src/data/menuData.js`). This survives restarts and redeploys as long as that file isn't wiped — see the Railway note below.

The shopping cart itself stays client-side (it's transient until checkout), but checkout, inventory +/-, and menu add/edit/delete all go through the API and are persisted immediately.

## Deploying to Railway

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In Railway: **New Project → Deploy from GitHub repo** → select this repo. Railway's Nixpacks builder will run `npm install`, `npm run build`, then `npm start` automatically.
3. **Add a Volume** (Settings → Volumes) mounted at e.g. `/data`, and set the environment variable `DATA_DIR=/data`. Without this, the JSON datastore lives on the container's ephemeral disk and can be wiped on redeploy.
4. Generate a public domain under **Settings → Networking**.

No database service or extra environment variables are required beyond the optional `DATA_DIR` above.
