# OfficeStore.am redesign audit — September 2026

## Current public information reviewed

The redesign was based on the public OfficeStore site structure and representative pages available in September 2026: Home, Shop, category pages (including Water, Dispenser, Dispenser maintenance and subcategories), product pages, About, Contact, Delivery, Blog, Cart, Account, Privacy Policy, Terms of Service and Data Deletion.

## Key UX opportunities addressed

1. **Navigation overload** → simplified sticky header, searchable catalog, clear category hierarchy and mobile navigation.
2. **Very dense product listings** → consistent cards, visual hierarchy, filters, sort controls, stock/sale/new states.
3. **Product buying clarity** → quantity, inventory, delivery promise and pricing grouped into a predictable purchase panel.
4. **Delivery information scattered across pages** → reusable delivery promise, checkout summary and structured FAQ.
5. **Service products mixed with goods** → dedicated service-booking experience for dispenser wash/repair.
6. **Cart/checkout confidence** → step indicator, order summary, delivery cost logic, payment-method cards and form validation structure.
7. **Account page language/UI inconsistency** → unified Armenian-first sign-in/register design and dashboard preview.
8. **Empty blog / empty categories** → intentional empty states with useful next actions instead of dead ends.
9. **Long legal pages** → readable content width, sticky table of contents pattern and section cards.
10. **Accessibility and mobile** → WCAG-oriented contrast, keyboard focus, 44px+ targets, semantic controls, reduced motion and responsive layout.

## Design system direction

- **Tone:** clean B2B/B2C commerce, trustworthy, fast, modern.
- **Primary:** deep ink/navy for trust and legibility.
- **Accent:** bright blue for actions and brand energy.
- **Success:** green for delivery/stock confirmations.
- **Surfaces:** warm white + soft gray-blue.
- **Radius:** 18–28px for contemporary, approachable UI.
- **Type:** system font stack with Armenian support; no font dependency required.

## 2026–2027 implementation recommendations

- Headless or REST/GraphQL WooCommerce integration.
- Server-rendered/SSR storefront for SEO and Core Web Vitals if moving beyond the prototype.
- Image CDN with AVIF/WebP, responsive `srcset`, lazy loading and intrinsic dimensions.
- Product search with typo tolerance and Armenian/Russian/English normalization.
- Server-side cart synchronization for signed-in users.
- Checkout address autocomplete, fraud-safe payments and idempotent order submission.
- Structured data (`Product`, `BreadcrumbList`, `Organization`, `FAQPage`).
- WCAG 2.2 AA testing with keyboard and screen-reader regression checks.
- Analytics events built around consent and privacy requirements.
