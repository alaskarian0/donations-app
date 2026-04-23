# How to Test the QiCard Integration

## Prerequisites

- Node.js installed
- Project dependencies installed (`npm install`)
- ngrok installed (for exposing local server to QiCard)

---

## Step 1 — Create `.env.local`

In the project root, copy the example file:

```
copy .env.example .env.local
```

The `.env.local` file already has sandbox credentials filled in:

```env
QICARD_BASE_URL=https://uat-sandbox-3ds-api.qi.iq/api/v1
QICARD_USERNAME=paymentgatewaytest
QICARD_PASSWORD=WHaNFE5C3qlChqNbAzH4
QICARD_TERMINAL_ID=237984
```

---

## Step 2 — Expose Your Local Server with ngrok

QiCard's servers need a **public URL** to:
- Redirect the user back to your site after payment
- Send webhook notifications

ngrok creates a secure tunnel from a public URL to your local machine.

```bash
npx ngrok http 3000
```

You will see output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:3000
```

Copy the `https://...ngrok-free.app` URL.

---

## Step 3 — Update `.env.local` with your ngrok URL

```env
QICARD_FINISH_URL=https://abc123.ngrok-free.app/ar/payment/superqi/return
QICARD_NOTIFICATION_URL=https://abc123.ngrok-free.app/api/payment/qi/webhook
```

> Note: ngrok URL changes every time you restart it (on free plan).
> Update `.env.local` each time.

---

## Step 4 — Start the Development Server

```bash
npm run dev
```

Expected output:
```
▲ Next.js 16.2.1 (Turbopack)
- Local:    http://localhost:3000
✓ Ready in 558ms
```

No warnings about middleware or proxy if set up correctly.

---

## Step 5 — Walk Through the Donation Flow

1. Open **http://localhost:3000** in browser
2. Click "تبرع الآن" (Donate Now)
3. **Step 1**: Select a donation type (e.g. صدقة)
4. **Step 2**: Select an amount (e.g. 10,000 IQD)
5. **Step 3**: Select "ماستركارد - كي كارد" (QiCard)
6. Click "متابعة" (Continue)
7. On the payment page, optionally enter name and phone
8. Click "الانتقال إلى صفحة الدفع الآمنة" (Proceed to Secure Payment)

---

## Step 6 — What Happens at Each Step

### When you click "Proceed":
The browser makes this request:
```
POST /api/payment/qi/initiate
Body: { amount: 10000, donationType: "sadaqah", locale: "ar" }
```

Your server calls QiCard:
```
POST https://uat-sandbox-3ds-api.qi.iq/api/v1/payment
Headers: Authorization: Basic ..., X-Terminal-Id: 237984
Body: { requestId: "uuid", amount: 10000000, currency: "IQD", ... }
```

QiCard responds with:
```json
{ "paymentId": "pi_xxx", "formUrl": "https://uat-sandbox.../form/..." }
```

Browser is redirected to `formUrl`.

### On QiCard's hosted page:
- User sees QiCard's card entry form
- Enters test card details (provided by QiCard sandbox)
- 3D Secure verification happens

### After payment:
QiCard redirects user to:
```
https://abc123.ngrok-free.app/ar/payment/superqi/return?paymentId=pi_xxx
```

Your return page calls:
```
GET /api/payment/qi/status/pi_xxx
```

Your server calls QiCard:
```
GET https://uat-sandbox.../payment/pi_xxx/status
```

If status is `SUCCESS` → user is sent to `/ar/success`
If status is `FAILED` → error page with retry button

---

## Checking for Errors

### Server logs (terminal running `npm run dev`):
```
[QiCard] webhook verified payment: { paymentId: 'pi_xxx', status: 'SUCCESS', amount: 10000000 }
```

### If credentials are missing:
The payment page shows a red error box:
```
Payment gateway is not configured. Please contact support.
```

### If QiCard API is unreachable:
```
Unable to reach payment gateway. Please try again.
```

---

## Test Card Numbers (Sandbox)

QiCard provides test cards in their developer portal. Common test scenarios:

| Card | Expected Result |
|---|---|
| Successful payment card | `SUCCESS` status |
| Declined card | `FAILED` status |
| 3DS failure card | `AUTHENTICATION_FAILED` status |

Get the actual test card numbers from: https://developers-gate.qi.iq/docs/intro

---

## What to Verify

- [ ] Clicking "Proceed" makes a network request to `/api/payment/qi/initiate`
- [ ] Browser redirects to QiCard's hosted page (different domain)
- [ ] Card entry happens on QiCard's page — not your site
- [ ] After payment, user lands on `/ar/payment/superqi/return?paymentId=...`
- [ ] Return page shows loading spinner then redirects to `/ar/success`
- [ ] Server logs show webhook verification
- [ ] Success page shows correct donation type and amount
