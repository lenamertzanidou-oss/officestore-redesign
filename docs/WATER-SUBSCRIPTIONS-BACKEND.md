# Recurring Water Delivery — Backend Contract

This document defines the server-side requirements for the OfficeStore "Պարբերական ջրի առաքում" feature.

## MVP business rules

- Product: `aparan-water-18-9` (Ապարան Ջուր 18,9լ).
- Minimum quantity: 2 bottles.
- Delivery days: Monday–Saturday.
- Sunday is never a delivery day.
- Monthly schedules that land on Sunday move to Monday.
- Personal customers: cash only.
- Corporate/legal-entity customers: cash or bank transfer.
- 18.9L water delivery fee: 0 AMD.

## Subscription payload

Frontend stores and will POST this shape:

```json
{
  "type": "water-recurring",
  "status": "active",
  "productSlug": "aparan-water-18-9",
  "quantity": 4,
  "customerType": "personal",
  "customer": {
    "firstName": "Անուն",
    "lastName": "Ազգանուն",
    "phone": "0XX XX XX XX",
    "email": "name@example.com"
  },
  "organization": null,
  "address": "Երևան, ...",
  "schedule": {
    "type": "monthly",
    "monthDays": [5, 15, 25]
  },
  "paymentMethod": "cash"
}
```

Corporate subscriptions may use either cash or bank transfer:

```json
{
  "customerType": "corporate",
  "organization": {
    "name": "Company LLC",
    "taxId": "XXXXXXXX"
  },
  "paymentMethod": "bank_transfer"
}
```

Allowed values:
- personal customer: `cash`
- corporate customer: `cash` or `bank_transfer`

Weekly schedules use:

```json
{
  "schedule": {
    "type": "weekly",
    "weekdays": [1, 4]
  }
}
```

Weekdays follow JavaScript convention: 1=Monday ... 6=Saturday.

## Recommended API

- `POST /api/water-subscriptions` — create subscription.
- `GET /api/water-subscriptions/:id` — read subscription.
- `PATCH /api/water-subscriptions/:id` — update quantity, address, schedule or customer data.
- `POST /api/water-subscriptions/:id/pause` — pause future automatic orders.
- `POST /api/water-subscriptions/:id/resume` — resume.
- `POST /api/water-subscriptions/:id/skip-next` — skip one upcoming delivery.
- `DELETE /api/water-subscriptions/:id` — cancel subscription.
- `GET /api/admin/water-subscriptions` — admin list.
- `GET /api/admin/recurring-orders?date=YYYY-MM-DD` — admin delivery queue.

## Scheduler

A server-side scheduled job should run every day, independent of customer browsers.

Recommended behavior:

1. Run shortly after midnight and again before the OfficeStore cutoff.
2. Find active subscriptions whose next delivery date matches the target delivery date.
3. Create one normal OfficeStore order with a unique `source = recurring_water`.
4. Copy customer, address, product, quantity and payment method into the order.
5. Prevent duplicates with a unique key such as `subscription_id + delivery_date`.
6. Mark the generated order as `scheduled` or `confirmed` according to the final operations workflow.
7. Recalculate and save the subscription's next delivery date.
8. Notify OfficeStore/admin that a recurring order was generated.
9. Optionally notify the customer one day before delivery.

## Recommended database tables

### water_subscriptions
- id
- customer_id (nullable until authentication backend exists)
- customer_type
- product_id / product_slug
- quantity
- address
- schedule_type
- schedule_json
- payment_method
- status
- next_delivery_date
- created_at
- updated_at

### recurring_order_runs
- id
- subscription_id
- delivery_date
- order_id
- status
- created_at
- unique(subscription_id, delivery_date)

## Admin notification

At minimum, a generated recurring order must appear in the same admin order queue as a normal order, with a clear badge:

**Պարբերական ջուր**

Optional notifications:
- admin email
- Telegram/Slack webhook
- SMS
- internal dashboard notification

The exact notification provider should be chosen when the production backend/infrastructure is connected.

## Current frontend status

The React application already provides:
- schedule UI
- Sunday exclusion/shift behavior
- customer type rules
- cash vs bank-transfer rules
- upcoming-delivery calculation
- local persistence
- update-in-place behavior
- backend-ready payload

The actual automatic order generation and admin delivery require the API/database/scheduler described above.
