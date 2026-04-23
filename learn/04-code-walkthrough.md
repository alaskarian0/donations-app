# Code Walkthrough — QiCard Integration Files

---

## 1. `src/app/api/payment/qi/initiate/route.ts`

**Purpose**: Server-side endpoint that creates a payment order with QiCard.

```
Browser calls: POST /api/payment/qi/initiate
This file calls: POST https://uat-sandbox-3ds-api.qi.iq/api/v1/payment
```

### Key logic explained:

```typescript
// Build the Authorization header
function buildBasicAuth(username: string, password: string) {
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}
```
Combines username and password, base64-encodes them, prepends "Basic ".

```typescript
// Guard: if env vars are missing, return 503 immediately
if (!QICARD_BASE_URL || !QICARD_USERNAME || ...) {
  return NextResponse.json({ error: "not configured" }, { status: 503 });
}
```
Prevents a crash and shows a friendly error if `.env.local` is incomplete.

```typescript
// Convert IQD to fils
const amountInFils = Math.round(amount * 1000);
```
QiCard requires smallest currency unit. 10,000 IQD × 1000 = 10,000,000 fils.

```typescript
// Phone formatting: convert local Iraqi format to international
phone: `00964${donorPhone.replace(/\D/g, "").replace(/^0/, "")}`
// "07701234567" → removes leading 0 → "7701234567" → prepends "00964" → "009647701234567"
```

```typescript
// The actual QiCard API call
const response = await fetch(`${QICARD_BASE_URL}/payment`, {
  method: "POST",
  headers: {
    "Authorization": buildBasicAuth(QICARD_USERNAME, QICARD_PASSWORD),
    "X-Terminal-Id": QICARD_TERMINAL_ID,
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify(payload),
});
```

```typescript
// Return only what the browser needs — never expose raw QiCard response
return NextResponse.json({
  formUrl: data.formUrl,   // browser redirects here
  paymentId: data.paymentId,  // browser stores this to check status later
});
```

---

## 2. `src/app/api/payment/qi/status/[paymentId]/route.ts`

**Purpose**: Checks whether a specific payment succeeded or failed.

```
Browser calls: GET /api/payment/qi/status/pi_abc123
This file calls: GET https://uat-sandbox.../payment/pi_abc123/status
```

### Key logic:

```typescript
// [paymentId] is a dynamic route segment — Next.js passes it in params
const { paymentId } = await params;

const response = await fetch(
  `${QICARD_BASE_URL}/payment/${encodeURIComponent(paymentId)}/status`,
  { headers: { Authorization: ..., "X-Terminal-Id": ... } }
);
```

`encodeURIComponent` protects against any special characters in the payment ID being interpreted as URL structure.

---

## 3. `src/app/api/payment/qi/webhook/route.ts`

**Purpose**: Receives async notifications from QiCard when a payment completes.

```
QiCard calls: POST /api/payment/qi/webhook
(You don't call this — QiCard does, automatically)
```

### Key logic:

```typescript
// NEVER trust what QiCard sends in the webhook body
// Always re-verify by calling the status API independently
const res = await fetch(`${QICARD_BASE_URL}/payment/${paymentId}/status`, ...);
const verified = await res.json();
console.info("[QiCard] webhook verified:", { paymentId, status: verified.status });

// TODO: Save to database here
```

### Why not trust the webhook?
The webhook is sent over the internet. Someone could fake a webhook with `{ status: "SUCCESS" }` for a payment that actually failed. By re-calling the status API with your own credentials, you get the real answer directly from QiCard.

```typescript
// Always return 200 — if you return an error, QiCard may retry repeatedly
return NextResponse.json({ received: true });
```

---

## 4. `src/app/[locale]/payment/superqi/page.tsx`

**Purpose**: The UI page where the user confirms their donation and proceeds to QiCard.

### What changed from the old version:

| Old | New |
|---|---|
| Card number input | Donor name input (optional) |
| Expiry input | Donor phone input (optional) |
| CVV input | *(removed)* |
| `setTimeout(redirect, 2500)` | Real `fetch` to `/api/payment/qi/initiate` |
| `router.push('/success')` | `window.location.href = formUrl` |

### The submit handler:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setProcessing(true);

  // Call our server-side API
  const res = await fetch("/api/payment/qi/initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: state.amount,
      donationType: state.donationType,
      locale,
      donorName: donorName || undefined,
      donorPhone: donorPhone || undefined,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.formUrl) {
    setApiError(data.error);  // show red error box
    setProcessing(false);
    return;
  }

  // Store the payment ID so the return page can verify it
  dispatch({ type: "SET_PAYMENT_ID", payload: data.paymentId });

  // Leave our site — go to QiCard's hosted payment page
  window.location.href = data.formUrl;
};
```

---

## 5. `src/app/[locale]/payment/superqi/return/page.tsx`

**Purpose**: The page QiCard redirects the user back to after payment.

### States the page goes through:

```
loading → (API call) → success → redirect to /success
                    → failed  → show error + retry/back buttons
                    → error   → show error + contact support
```

### Reading the payment ID from URL:

```typescript
// QiCard puts the payment ID in the URL query string:
// /ar/payment/superqi/return?paymentId=pi_abc123

const paymentId =
  searchParams.get("paymentId") ??   // most common
  searchParams.get("orderId") ??     // alternative field name
  searchParams.get("order_id");      // another alternative
```

Multiple field names are checked because the exact query param name 
can vary depending on QiCard's version.

### Status mapping:

```typescript
if (s === "SUCCESS" || s === "2") {
  setStatus("success");
  setTimeout(() => router.push(`/${locale}/success`), 1500);
} else {
  // FAILED, AUTHENTICATION_FAILED, CREATED, FORM_SHOWED, UNKNOWN
  setStatus("failed");
}
```

`s === "2"` handles older QiCard API versions that used numeric status codes.

### Why Suspense wrapper?

```typescript
// useSearchParams() requires a Suspense boundary in Next.js App Router
export default function SuperQiReturnPage() {
  return (
    <Suspense>
      <ReturnContent />
    </Suspense>
  );
}
```

Without Suspense, Next.js will throw an error during server rendering because `useSearchParams` can't be resolved until the browser loads.

---

## 6. `src/proxy.ts` (renamed from `middleware.ts`)

**Purpose**: Handles locale routing for all pages.

### What changed:

```typescript
// OLD — src/middleware.ts (deprecated in Next.js 16)
export default createMiddleware(routing);

// NEW — src/proxy.ts (correct for Next.js 16)
export const proxy = createMiddleware(routing);
```

The function is the same — only the file name and export name changed.
Next.js 16 renamed "Middleware" to "Proxy" to better describe its purpose.

---

## 7. `src/lib/types.ts` — State Changes

```typescript
// REMOVED (card data we should never collect)
cardNumber: string
cardExpiry: string  
cardCVV: string

// ADDED (payment reference from QiCard)
paymentId: string | null
```

```typescript
// REMOVED actions
SET_CARD_NUMBER
SET_CARD_EXPIRY
SET_CARD_CVV

// ADDED action
SET_PAYMENT_ID
```
