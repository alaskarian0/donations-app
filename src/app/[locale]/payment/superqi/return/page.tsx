"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useDonation } from "@/context/DonationContext";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type VerifyState = "loading" | "success" | "failed" | "error";

function ReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useDonation();
  const locale = useLocale();
  const t = useTranslations("paymentReturn");
  const tPayment = useTranslations("payment");

  const [status, setStatus] = useState<VerifyState>("loading");

  useEffect(() => {
    // QiCard passes the payment/order ID back as a query param
    const paymentId =
      searchParams.get("paymentId") ??
      searchParams.get("orderId") ??
      searchParams.get("order_id");

    if (!paymentId) {
      setStatus("error");
      return;
    }

    dispatch({ type: "SET_PAYMENT_ID", payload: paymentId });

    fetch(`/api/payment/qi/status/${encodeURIComponent(paymentId)}`)
      .then((res) => res.json())
      .then((data) => {
        const s: string = data.status ?? "";
        if (s === "SUCCESS" || s === "2") {
          setStatus("success");
          // Short delay so user sees success state before redirect
          setTimeout(() => router.push(`/${locale}/success`), 1500);
        } else {
          // FAILED / AUTHENTICATION_FAILED / CREATED / FORM_SHOWED / UNKNOWN
          setStatus("failed");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams, dispatch, router, locale]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full">
        {status === "loading" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-shrine-blue border-t-transparent animate-spin" />
            <h2 className="text-xl font-bold text-shrine-blue-dark mb-2">{t("loading")}</h2>
            <p className="text-gray-500 text-sm">{t("loadingText")}</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-shrine-blue-dark">{t("success")}</h2>
          </motion.div>
        )}

        {(status === "failed" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-shrine-blue-dark mb-2">
                {status === "failed" ? t("failed") : t("error")}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {status === "failed" ? t("failedText") : t("errorText")}
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => router.push(`/${locale}/payment/superqi`)}>
                  {t("retry")}
                </Button>
                <Button variant="outline" onClick={() => router.push(`/${locale}/donate`)}>
                  {tPayment("backToDonate")}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SuperQiReturnPage() {
  return (
    <Suspense>
      <ReturnContent />
    </Suspense>
  );
}
