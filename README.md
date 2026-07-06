# Teen's Cafe — Billing & Stock Management

A cute, pastel Point-of-Sale and inventory app built with **React 19**, **Vite**, and **Tailwind CSS v4**. Fully responsive: sidebar nav + right-hand cart on desktop, bottom tab bar + slide-up cart sheet on mobile.

## Project structure

```
src/
  data/
    menuData.js        # placeholder menu items + inventory
  components/
    Sidebar.jsx         # desktop left nav
    BottomNav.jsx        # mobile bottom tab bar
    MobileHeader.jsx     # mobile top brand bar
    Footer.jsx           # "from j&co. software solutions" strip
    POS.jsx               # menu grid + category filter (Billing screen)
    MenuItemCard.jsx      # single menu tile
    Cart.jsx              # shared cart UI (desktop sidebar + mobile sheet)
    CartSheet.jsx         # mobile bottom-sheet wrapper around Cart
    MobileCartBar.jsx     # floating "View order" pill on mobile
    Inventory.jsx         # stock screen
    InventoryItem.jsx     # single stock row with +/- and low-stock highlight
    Toast.jsx             # checkout confirmation toast
  App.jsx                 # top-level state (cart, inventory, active tab) + layout
  main.jsx
  index.css               # Tailwind import + pastel theme tokens (@theme)
```

## How to run it

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually **http://localhost:5173**).

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## Notes

- All menu items and inventory quantities in `src/data/menuData.js` are placeholder data — replace with real products/stock whenever you're ready.
- The cart is in-memory only (resets on refresh) and checkout just shows a confirmation toast — there's no backend/payment integration yet.
- Adjusting inventory with +/- is instant and local to the browser session.
