# Learn — Project Documentation

This folder contains documentation and reports for this donation platform project.

## Files

| File | Contents |
|---|---|
| [01-qicard-api-reference.md](01-qicard-api-reference.md) | Complete QiCard REST API reference — all endpoints, request/response formats, status codes, error codes, sandbox credentials |
| [02-integration-architecture.md](02-integration-architecture.md) | How the payment integration is structured — why the old approach was wrong, the correct hosted-page model, file structure, env vars |
| [03-how-to-test.md](03-how-to-test.md) | Step-by-step guide to testing the integration locally with sandbox credentials and ngrok |
| [04-code-walkthrough.md](04-code-walkthrough.md) | Line-by-line explanation of every file added/changed during the integration |
| [05-nextjs16-changes.md](05-nextjs16-changes.md) | Next.js 16 breaking changes that affected this project: proxy rename, async params, Suspense requirement |

## Quick Reference

### Sandbox API
```
Base URL:    https://uat-sandbox-3ds-api.qi.iq/api/v1
Username:    paymentgatewaytest
Password:    WHaNFE5C3qlChqNbAzH4
Terminal ID: 237984
```

### Payment Flow (short version)
```
1. POST /api/payment/qi/initiate  → get formUrl
2. Redirect user to formUrl       → QiCard handles card entry
3. QiCard redirects to /payment/superqi/return?paymentId=xxx
4. GET /api/payment/qi/status/xxx → verify SUCCESS
5. Redirect to /success
```

### Key rule
Credentials live only in `.env.local` — never in browser code.
