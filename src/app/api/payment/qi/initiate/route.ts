import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

// QiCard Payment Gateway — Create Payment Order
// Docs: https://developers-gate.qi.iq/docs/category/api-endpoints
//
// Auth: HTTP Basic (base64(username:password)) + X-Terminal-Id header
// Amount: IQD in fils — 1 IQD = 1000 fils (e.g. 150 IQD → 150000)

function buildBasicAuth(username: string, password: string) {
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}

export async function POST(req: NextRequest) {
  const {
    QICARD_BASE_URL,
    QICARD_USERNAME,
    QICARD_PASSWORD,
    QICARD_TERMINAL_ID,
    QICARD_FINISH_URL,
    QICARD_NOTIFICATION_URL,
  } = process.env;

  if (
    !QICARD_BASE_URL ||
    !QICARD_USERNAME ||
    !QICARD_PASSWORD ||
    !QICARD_TERMINAL_ID ||
    !QICARD_FINISH_URL
  ) {
    return NextResponse.json(
      { error: "Payment gateway is not configured. Please contact support." },
      { status: 503 }
    );
  }

  let body: {
    amount?: number;
    donationType?: string;
    locale?: string;
    donorName?: string;
    donorPhone?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { amount, donationType, locale = "ar", donorName, donorPhone } = body;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }

  // QiCard uses smallest currency unit (fils): 1 IQD = 1000 fils
  const amountInFils = Math.round(amount * 1000);
  const requestId = randomUUID();
  const qiLocale = locale === "en" ? "en_US" : locale === "fa" ? "ar" : "ar";

  const customerInfo = (donorName || donorPhone)
    ? {
        firstName: donorName ?? null,
        lastName: null,
        middleName: null,
        phone: donorPhone ? `00964${donorPhone.replace(/\D/g, "").replace(/^0/, "")}` : null,
        email: null,
        accountId: null,
        accountNumber: null,
        address: null,
        city: null,
        provinceCode: null,
        countryCode: null,
        postalCode: null,
        birthDate: null,
        identificationType: null,
        identificationNumber: null,
        identificationCountryCode: null,
        identificationExpirationDate: null,
        nationality: null,
        countryOfBirth: null,
        fundSource: null,
        participantId: null,
        additionalMessage: null,
        transactionReason: null,
        claimCode: null,
      }
    : undefined;

  const payload: Record<string, unknown> = {
    requestId,
    amount: amountInFils,
    currency: "IQD",
    locale: qiLocale,
    finishPaymentUrl: QICARD_FINISH_URL,
    ...(QICARD_NOTIFICATION_URL ? { notificationUrl: QICARD_NOTIFICATION_URL } : {}),
    ...(customerInfo ? { customerInfo } : {}),
    additionalInfo: donationType ? { donationType } : undefined,
  };

  try {
    const response = await fetch(`${QICARD_BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": buildBasicAuth(QICARD_USERNAME, QICARD_PASSWORD),
        "X-Terminal-Id": QICARD_TERMINAL_ID,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.formUrl) {
      console.error("[QiCard] initiate payment failed:", data);
      return NextResponse.json(
        { error: data.error?.message ?? "Payment initiation failed. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      formUrl: data.formUrl,
      paymentId: data.paymentId,
    });
  } catch (err) {
    console.error("[QiCard] network error during initiate:", err);
    return NextResponse.json(
      { error: "Unable to reach payment gateway. Please try again." },
      { status: 502 }
    );
  }
}
