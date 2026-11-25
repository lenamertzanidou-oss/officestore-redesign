# OfficeStore.am — 2026–2027 Redesign Prototype

A complete front-end redesign concept for **officestore.am**, built with **React + HTML + CSS + JavaScript** and intended for editing in Visual Studio Code.

## Run in VS Code

1. Open this folder in Visual Studio Code.
2. Open Terminal → New Terminal.
3. Run:

```bash
npm install
npm.cmd run dev
```

4. Open the local address shown by Vite (usually `http://127.0.0.1:5173`). Routes now use clean paths such as `/blog` and `/blog/office-supplies-checklist`.

For production:

```bash
npm.cmd run build
npm.cmd run preview
```

## Included page templates

- Home
- Shop / all products
- Dynamic category page (covers all main and sub-categories)
- Product details
- Dispenser maintenance / service booking
- About
- Contact
- Delivery + FAQ
- Recurring 18.9L water delivery scheduling
- SEO blog hub + individual article pages
- Cart
- Checkout
- Account login/register + dashboard preview
- Discounts and promotions
- Privacy policy
- Terms of service
- Data deletion instructions
- 404 page

## Functional prototype features

- Search and category browsing
- Price/category filters
- Sorting
- Product quick-add
- Quantity controls
- Wishlist
- LocalStorage cart/wishlist persistence
- Free-delivery rule for 18.9L Aparan water; otherwise 600 AMD demo delivery fee
- Delivery scheduling supports Monday–Saturday; Sunday is excluded
- Recurring water schedules use monthly calendar dates
- Recurring water payment rules: personal = cash, card, Idram or TelCell; corporate = bank transfer only
- Recurring schedule data is persisted locally and shaped for future backend scheduler integration
- Checkout payment method selection
- Address delivery flow (pickup/self-collection removed)
- Account login/register UI
- Service booking form
- Newsletter form
- Mobile menu and mobile bottom navigation
- Accessible focus states and reduced-motion support
- Clean BrowserRouter URLs (no `#/` routes)
- Dynamic SEO metadata, Open Graph and JSON-LD for blog/article pages
- Build-time blog SEO snapshots plus generated `sitemap.xml` and `robots.txt`
- SPA fallback configs for Apache, Netlify and Vercel

## Important

This is a **front-end prototype**. Real payments, inventory, authentication, WordPress/WooCommerce data, order submission, email/SMS, and service booking require API/backend integration.

Product photos are represented by lightweight generated visual placeholders so the project is self-contained. Replace `ProductVisual` with real WooCommerce image URLs/API data when integrating.
