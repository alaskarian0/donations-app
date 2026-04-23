# QiCard Payment Gateway — API Reference

**Source**: https://developers-gate.qi.iq/docs/intro  
**Swagger (sandbox)**: https://api.uat.pay.qi.iq/api/v0/explore-docs/

---

## Base URLs

| Environment | URL |
|---|---|
| Sandbox (UAT) | `https://uat-sandbox-3ds-api.qi.iq/api/v1` |
| Production | Provided by QiCard upon merchant onboarding |

---

## Authentication

Every request must include two things:

### 1. HTTP Basic Auth header
```
Authorization: Basic <base64(username:password)>
```

How to build it:
```
"paymentgatewaytest:WHaNFE5C3qlChqNbAzH4"
→ base64 encode →
"cGF5bWVudGdhdGV3YXl0ZXN0OldIYU5GRTVDM3FsQ2hxTmJBekg0"
→ final header →
Authorization: Basic cGF5bWVudGdhdGV3YXl0ZXN0OldIYU5GRTVDM3FsQ2hxTmJBekg0
```

### 2. Terminal ID header
```
X-Terminal-Id: 237984
```

### Full headers required
```
Content-Type: application/json
Accept: application/json
Authorization: Basic <base64(username:password)>
X-Terminal-Id: <terminalId>
```

### Sandbox test credentials
| Field | Value |
|---|---|
| Username | `paymentgatewaytest` |
| Password | `WHaNFE5C3qlChqNbAzH4` |
| Terminal ID | `237984` |

---

## Endpoints

All paths are relative to the base URL.

| Operation | Method | Path |
|---|---|---|
| Create Payment | POST | `/payment` |
| Get Payment Status | GET | `/payment/{paymentId}/status` |
| Cancel Payment | POST | `/payment/{paymentId}/cancel` |
| Refund Payment | POST | `/payment/{paymentId}/refund` |

---

## Create Payment

### Request — POST `/payment`

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 10000000,
  "currency": "IQD",
  "locale": "ar",
  "finishPaymentUrl": "https://your-site.com/ar/payment/superqi/return",
  "notificationUrl": "https://your-site.com/api/payment/qi/webhook",
  "customerInfo": {
    "firstName": "Ahmed",
    "lastName": null,
    "middleName": null,
    "phone": "009647701234567",
    "email": null,
    "accountId": null,
    "accountNumber": null,
    "address": null,
    "city": null,
    "provinceCode": null,
    "countryCode": null,
    "postalCode": null,
    "birthDate": null,
    "identificationType": null,
    "identificationNumber": null,
    "identificationCountryCode": null,
    "identificationExpirationDate": null,
    "nationality": null,
    "countryOfBirth": null,
    "fundSource": null,
    "participantId": null,
    "additionalMessage": null,
    "transactionReason": null,
    "claimCode": null
  },
  "additionalInfo": {
    "donationType": "sadaqah"
  }
}
```

### Field explanations

| Field | Required | Description |
|---|---|---|
| `requestId` | Yes | Unique UUID per transaction — generate fresh each time |
| `amount` | Yes | Amount in **fils** (1 IQD = 1000 fils). See amount table below |
| `currency` | Yes | Always `"IQD"` |
| `locale` | Yes | `"ar"` for Arabic, `"en_US"` for English |
| `finishPaymentUrl` | Yes | Your page that QiCard redirects the user to after payment |
| `notificationUrl` | No | Your webhook endpoint for async notifications |
| `customerInfo` | No | Donor info — null fields are accepted |
| `additionalInfo` | No | Any extra metadata you want to store |

### Amount conversion table (IQD → fils)

| IQD Amount | Fils to send |
|---|---|
| 5,000 IQD | 5,000,000 |
| 10,000 IQD | 10,000,000 |
| 25,000 IQD | 25,000,000 |
| 50,000 IQD | 50,000,000 |
| 100,000 IQD | 100,000,000 |

Formula: `fils = IQD_amount × 1000`

### Response — 200 OK

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "paymentId": "pi_abc123xyz",
  "amount": 10000000,
  "confirmedAmount": null,
  "currency": "IQD",
  "status": "CREATED",
  "paymentType": "CARD",
  "creationDate": "2026-04-09T12:00:00Z",
  "formUrl": "https://uat-sandbox-3ds-api.qi.iq/payment-form/abc123",
  "canceled": false,
  "withoutAuthenticate": false,
  "details": null,
  "errorCode": null,
  "errorMessage": null
}
```

**Action**: Redirect user to `formUrl` immediately after receiving this response.

---

## Get Payment Status

### Request — GET `/payment/{paymentId}/status`

No request body. Only headers needed.

Example: `GET /payment/pi_abc123xyz/status`

### Response — 200 OK

```json
{
  "paymentId": "pi_abc123xyz",
  "status": "SUCCESS",
  "amount": 10000000,
  "confirmedAmount": 10000000,
  "details": {
    "maskedPan": "411111****1111",
    "paymentSystem": "VISA",
    "authId": "auth-code-here",
    "rrn": "retrieval-reference-number"
  }
}
```

---

## Cancel Payment

### Request — POST `/payment/{paymentId}/cancel`

```json
{
  "requestId": "new-unique-uuid",
  "amount": 10000000
}
```

---

## Refund Payment

### Request — POST `/payment/{paymentId}/refund`

```json
{
  "requestId": "new-unique-uuid",
  "amount": 5000000
}
```

Partial refunds are supported — amount can be less than the original.

### Refund Response

```json
{
  "success": true,
  "requestId": "new-unique-uuid",
  "refundId": "ref_xyz789",
  "paymentId": "pi_abc123xyz",
  "amount": 5000000,
  "currency": "IQD",
  "status": "SUCCESS",
  "message": null,
  "details": null
}
```

---

## Payment Status Values

| Status | Arabic meaning | Final? | Action |
|---|---|---|---|
| `CREATED` | تم إنشاء الطلب | No | Redirect user to formUrl |
| `FORM_SHOWED` | تم عرض نموذج الدفع | No | Wait |
| `SUCCESS` | نجحت العملية | **Yes ✓** | Show success page |
| `FAILED` | فشلت العملية | **Yes ✗** | Show error + retry |
| `AUTHENTICATION_FAILED` | فشل التحقق 3DS | **Yes ✗** | Show error + retry |

---

## Error Response Format

```json
{
  "error": {
    "code": 18,
    "message": "INCORRECT_TRANSFER_STATE"
  }
}
```

| Error Code | Message | Meaning |
|---|---|---|
| `18` | `INCORRECT_TRANSFER_STATE` | Payment is not in the right state for this operation |

---

## HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request — invalid params or wrong payment state |
| 401 | Unauthorized — wrong credentials |
| 500 | QiCard server error |

---

## Webhook (notificationUrl)

QiCard sends a `POST` to your `notificationUrl` when payment status changes.

**Example payload**:
```json
{
  "paymentId": "pi_abc123xyz",
  "status": "SUCCESS",
  "amount": 10000000
}
```

**Security rule**: Never trust the webhook payload directly. Always verify by calling `GET /payment/{paymentId}/status` and comparing the result.

---

## finishPaymentUrl — Return Redirect

After the user completes (or abandons) payment on QiCard's page, they are redirected back to your `finishPaymentUrl` with the payment ID appended:

```
https://your-site.com/ar/payment/superqi/return?paymentId=pi_abc123xyz
```

Your return page should:
1. Read `paymentId` from query params
2. Call `GET /api/payment/qi/status/{paymentId}` (your server route)
3. Show success or failure based on the verified status
