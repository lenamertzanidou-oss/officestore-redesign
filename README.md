# OfficeStore.am — 2026–2027 Redesign Prototype

A complete front-end redesign concept for **officestore.am**, built with **React + HTML + CSS + JavaScript** and intended for editing in Visual Studio Code.

## Run in VS Code

1. Open this folder in Visual Studio Code.
2. Open Terminal → New Terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local address shown by Vite (usually `http://localhost:5173`).

For production:

```bash
npm run build
npm run preview
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
- Blog / empty-state + editorial layout
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
- Checkout payment method selection
- Delivery/pickup selection
- Account login/register UI
- Service booking form
- Newsletter form
- Mobile menu and mobile bottom navigation
- Accessible focus states and reduced-motion support

## Important

This is a **front-end prototype**. Real payments, inventory, authentication, WordPress/WooCommerce data, order submission, email/SMS, and service booking require API/backend integration.

Product photos are represented by lightweight generated visual placeholders so the project is self-contained. Replace `ProductVisual` with real WooCommerce image URLs/API data when integrating.
