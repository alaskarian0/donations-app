# Next.js 16 Breaking Changes Relevant to This Project

Source: `node_modules/next/dist/docs/`

---

## 1. Middleware → Proxy (File Rename)

### What changed
In Next.js 16, the file named `middleware.ts` must be renamed to `proxy.ts`.
The exported function must also be named `proxy` (or remain a default export).

### Warning you will see if not fixed
```
⚠ The "middleware" file convention is deprecated. 
  Please use "proxy" instead.
  Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
```

### Error if both files exist simultaneously
```
Error: Both middleware file "./src/middleware.ts" and proxy file "./src/proxy.ts" 
are detected. Please use "./src/proxy.ts" only.
```

### Migration
```typescript
// BEFORE: src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
```

```typescript
// AFTER: src/proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);  // named "proxy" export

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
```

### What proxy.ts does in this project
- Intercepts every page request before it renders
- Reads the `NEXT_LOCALE` cookie
- Redirects to the correct `[locale]` prefix (e.g. `/ar/donate`, `/en/donate`)
- This is how the i18n (internationalization) routing works

---

## 2. API Route Params Are Now Promises

### What changed
In Next.js 15+, dynamic route params (like `[paymentId]`) are wrapped in a `Promise`.
You must `await` them.

### Old pattern (Next.js 14 and below)
```typescript
export async function GET(
  req: NextRequest,
  { params }: { params: { paymentId: string } }  // direct object
) {
  const { paymentId } = params;  // no await needed
}
```

### New pattern (Next.js 15+ / 16)
```typescript
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }  // Promise!
) {
  const { paymentId } = await params;  // must await
}
```

This is why the status route uses `await params`.

---

## 3. `useSearchParams()` Requires Suspense

### What changed
Any client component that uses `useSearchParams()` must be wrapped in a `<Suspense>` boundary.

### Why
`useSearchParams` can only read query parameters on the client side (browser).
During server-side rendering, Next.js doesn't have access to these params.
`<Suspense>` tells Next.js: "render a fallback while waiting for client-side data".

### Pattern used in `return/page.tsx`
```typescript
// Inner component uses useSearchParams
function ReturnContent() {
  const searchParams = useSearchParams();
  // ...
}

// Outer component wraps with Suspense
export default function SuperQiReturnPage() {
  return (
    <Suspense>
      <ReturnContent />
    </Suspense>
  );
}
```

---

## 4. `fetch` Is Available Server-Side Without Import

In Next.js (and modern Node.js), `fetch` is globally available in API routes.
No need to `import fetch from 'node-fetch'` or similar.

```typescript
// This works directly in API route files
const response = await fetch("https://uat-sandbox-3ds-api.qi.iq/api/v1/payment", {
  method: "POST",
  headers: { ... },
  body: JSON.stringify(payload),
});
```

---

## 5. `Buffer` Is Available in API Routes

`Buffer.from(...)` is a Node.js built-in, available in Next.js API routes (server-side only).
This is how we build the Basic Auth header without importing any library.

```typescript
// No import needed — Buffer is global in Node.js
function buildBasicAuth(username: string, password: string) {
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}
```

This does NOT work in client components (browser) — only in server-side files (`route.ts`).
