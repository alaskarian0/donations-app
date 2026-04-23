# Payment Integration Architecture

## Why the Old Approach Was Wrong

The original `superqi/page.tsx` collected card number, expiry, and CVV directly in the browser form.

```
OLD (WRONG):
Browser → collects card data → sends to our server → ???
```

This is a **PCI DSS violation**. Any site that touches raw card numbers must pass a full security audit. QiCard's gateway is a "hosted payment page" model — meaning you must never see the card data at all.

```
CORRECT:
Browser → our server creates order → QiCard hosted page → card data stays with QiCard
```

---

## Correct Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                          │
│                                                                  │
│  /donate page → selects type + amount + QiCard method           │
│       ↓                                                          │
│  /payment/superqi → optional donor name/phone → "Proceed" btn   │
│       ↓                                                          │
│  fetch POST /api/payment/qi/initiate                            │
│       ↓ (gets formUrl back)                                      │
│  window.location.href = formUrl  ──────────────────────────────►│
│                                                                  │
│  ◄────── QiCard redirects back to /payment/superqi/return ──────│
│       ↓                                                          │
│  fetch GET /api/payment/qi/status/{paymentId}                   │
│       ↓ (SUCCESS)                                                │
│  router.push('/success')                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   NEXT.JS SERVER (API Routes)                    │
│                                                                  │
│  POST /api/payment/qi/initiate                                  │
│    → reads credentials from env vars (never exposed to browser) │
│    → calls QiCard: POST https://uat.../api/v1/payment           │
│    → returns { formUrl, paymentId } to browser                  │
│                                                                  │
│  GET /api/payment/qi/status/[paymentId]                         │
│    → calls QiCard: GET .../payment/{paymentId}/status           │
│    → returns { status, amount } to browser                       │
│                                                                  │
│  POST /api/payment/qi/webhook                                   │
│    → receives async notification from QiCard                    │
│    → re-verifies status via API (never trust webhook alone)     │
│    → returns 200 OK to QiCard                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      QICARD SERVERS                              │
│                                                                  │
│  Hosted payment page (formUrl)                                   │
│    → user enters card details HERE (we never see them)          │
│    → 3D Secure authentication                                    │
│    → processes payment                                           │
│    → sends webhook to our /api/payment/qi/webhook               │
│    → redirects user to our finishPaymentUrl                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure Created

```
src/
├── app/
│   ├── api/
│   │   └── payment/
│   │       └── qi/
│   │           ├── initiate/
│   │           │   └── route.ts        ← Creates payment order
│   │           ├── status/
│   │           │   └── [paymentId]/
│   │           │       └── route.ts    ← Checks payment status
│   │           └── webhook/
│   │               └── route.ts        ← Receives async notifications
│   └── [locale]/
│       └── payment/
│           └── superqi/
│               ├── page.tsx            ← Updated: name/phone + redirect button
│               └── return/
│                   └── page.tsx        ← NEW: verifies status after redirect
├── proxy.ts                            ← Renamed from middleware.ts (Next.js 16)
```

---

## Environment Variables

```env
# Sandbox (testing)
QICARD_BASE_URL=https://uat-sandbox-3ds-api.qi.iq/api/v1
QICARD_USERNAME=paymentgatewaytest
QICARD_PASSWORD=WHaNFE5C3qlChqNbAzH4
QICARD_TERMINAL_ID=237984

# Your callback URLs (must be publicly accessible)
QICARD_FINISH_URL=https://your-ngrok-url/ar/payment/superqi/return
QICARD_NOTIFICATION_URL=https://your-ngrok-url/api/payment/qi/webhook
```

**Rule**: Credentials only exist in `.env.local` — they are **never** sent to the browser.

---

## State Management Changes

### Before (wrong)
```typescript
// DonationState stored card data
cardNumber: string      // ← PCI violation
cardExpiry: string      // ← PCI violation
cardCVV: string         // ← PCI violation
```

### After (correct)
```typescript
// DonationState stores identity + payment reference
donorName: string       // optional, for QiCard customerInfo
donorPhone: string      // optional, for QiCard customerInfo
paymentId: string | null  // returned by QiCard after order creation
```

---

## Next.js 16 Change: middleware → proxy

Next.js 16 renamed `middleware.ts` to `proxy.ts`. The exported function must also be named `proxy`.

```typescript
// BEFORE (deprecated in Next.js 16)
// src/middleware.ts
export default createMiddleware(routing);

// AFTER (correct for Next.js 16)
// src/proxy.ts
export const proxy = createMiddleware(routing);
```
