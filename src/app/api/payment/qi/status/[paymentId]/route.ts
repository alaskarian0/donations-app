import { NextRequest, NextResponse } from "next/server";

// QiCard Payment Gateway — Get Payment Status
// Docs: https://developers-gate.qi.iq/docs/category/api-endpoints
//
// GET /payment/{paymentId}/status
// Auth: HTTP Basic + X-Terminal-Id header

function buildBasicAuth(username: string, password: string) {
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { QICARD_BASE_URL, QICARD_USERNAME, QICARD_PASSWORD, QICARD_TERMINAL_ID } =
    process.env;

  if (!QICARD_BASE_URL || !QICARD_USERNAME || !QICARD_PASSWORD || !QICARD_TERMINAL_ID) {
    return NextResponse.json(
      { error: "Payment gateway is not configured." },
      { status: 503 }
    );
  }

  const { paymentId } = await params;

  if (!paymentId) {
    return NextResponse.json({ error: "Missing paymentId." }, { status: 400 });
  }

  try {
    const response = await fetch(
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

    const data = await response.json();

    if (!response.ok) {
      console.error("[QiCard] status check failed:", data);
      return NextResponse.json(
        { error: data.error?.message ?? "Failed to retrieve payment status." },
        { status: 502 }
      );
    }

    // Status values: CREATED | FORM_SHOWED | SUCCESS | FAILED | AUTHENTICATION_FAILED
    return NextResponse.json({
      paymentId,
      status: data.status ?? "UNKNOWN",
      amount: data.amount,
      confirmedAmount: data.confirmedAmount,
      details: data.details ?? null,
    });
  } catch (err) {
    console.error("[QiCard] network error during status check:", err);
    return NextResponse.json(
      { error: "Unable to reach payment gateway." },
      { status: 502 }
    );
  }
}
