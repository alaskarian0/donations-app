import { NextRequest, NextResponse } from "next/server";

// QiCard Payment Gateway — Async Webhook Receiver
//
// QiCard POSTs to this URL when a payment status changes (notificationUrl).
// IMPORTANT: Never trust the webhook payload alone.
// Always re-verify by calling GET /payment/{paymentId}/status independently.

function buildBasicAuth(username: string, password: string) {
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}

export async function POST(req: NextRequest) {
  const { QICARD_BASE_URL, QICARD_USERNAME, QICARD_PASSWORD, QICARD_TERMINAL_ID } =
    process.env;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const paymentId =
    typeof body.paymentId === "string" ? body.paymentId : null;

  if (!paymentId) {
    console.warn("[QiCard] webhook received with no paymentId:", body);
    return NextResponse.json({ received: true });
  }

  // Independently verify the payment status — do not trust webhook body alone
  if (QICARD_BASE_URL && QICARD_USERNAME && QICARD_PASSWORD && QICARD_TERMINAL_ID) {
    try {
      const res = await fetch(
        `${QICARD_BASE_URL}/payment/${encodeURIComponent(paymentId)}/status`,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": buildBasicAuth(QICARD_USERNAME, QICARD_PASSWORD),
            "X-Terminal-Id": QICARD_TERMINAL_ID,
          },
        }
      );
      const verified = await res.json();
      console.info("[QiCard] webhook verified payment:", {
        paymentId,
        status: verified.status,
        amount: verified.confirmedAmount ?? verified.amount,
      });
      // TODO: persist verified payment result to your database here
    } catch (err) {
      console.error("[QiCard] webhook verification failed:", err);
    }
  }

  // Always return 200 to acknowledge receipt to QiCard
  return NextResponse.json({ received: true });
}
