"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { getDonationByPaymentId } from "@/lib/api";
import type { DonationState } from "@/lib/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function SuccessPage() {
  const router = useRouter();
  const locale = useLocale();
  const tc = useTranslations("Common");
  const { state, dispatch } = useDonation();
  const t = useTranslations("DonationTypes");
  
  const [timestamp] = useState(() =>
    new Date().toLocaleDateString(locale === "ar" ? "ar-IQ" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [backendStatus, setBackendStatus] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const donationType = DONATION_TYPES.find((t) => t.id === state.donationType);
  const paymentMethod = PAYMENT_METHODS.find((m) => m.id === state.paymentMethod);

  const getIconPath = (id: string) => {
    const iconMap: Record<string, string> = {
      general: 'general.png',
      reconstruction: 'reconstruction.png',
      mudhif: 'feeding.png',
      sacrifices: 'sadaqah.png',
      servants: 'waqf.png' 
    };
    return `/icons/${iconMap[id] || 'general.png'}`;
  };

  const handleDonateAgain = () => {
    dispatch({ type: "RESET" });
    router.push("/donate");
  };

  const handleGoHome = () => {
    dispatch({ type: "RESET" });
    router.push("/");
  };

  // If no donation data, redirect
  useEffect(() => {
    if (!state.donationType || !state.amount) {
      router.push("/donate");
    }
  }, [state.donationType, state.amount, router]);

  // Verify donation with backend
  useEffect(() => {
    if (!state.paymentId) return;
    setVerifying(true);
    getDonationByPaymentId(state.paymentId)
      .then((data) => {
        setBackendStatus(data.status);
        dispatch({ type: "SET_STATUS", payload: data.status.toLowerCase() as DonationState["status"] });
      })
      .catch(() => {
        // Graceful fallback — still show success with local data
      })
      .finally(() => setVerifying(false));
  }, [state.paymentId, dispatch]);

  if (!state.donationType || !state.amount) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-shrine-green/10 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <svg
                className="w-12 h-12 text-shrine-green"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-shrine-blue-dark mb-2"
          >
            {locale === "ar" ? "شكراً لتبرعك الكريم" : "Thank you for your generous donation"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500"
          >
            {locale === "ar" ? "جزاك الله خير الجزاء" : "May Allah reward you with goodness"}
          </motion.p>
        </motion.div>

        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card goldBorder className="p-6">
            <h2 className="font-bold text-shrine-blue-dark mb-4 text-center">
              {locale === "ar" ? "تفاصيل التبرع" : "Donation Details"}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">{locale === "ar" ? "رقم المرجع (Payment ID)" : "Payment ID"}</span>
                <span className="font-mono text-sm font-bold text-shrine-blue-dark" dir="ltr">
                  {state.paymentId || "---"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">{locale === "ar" ? "حالة المعاملة" : "Transaction Status"}</span>
                <span className={`text-sm font-bold ${backendStatus === 'SUCCESS' ? 'text-shrine-green' : backendStatus === 'FAILED' ? 'text-red-500' : 'text-amber-500'}`}>
                  {verifying
                    ? (locale === "ar" ? "جاري التحقق..." : "Verifying...")
                    : backendStatus === 'SUCCESS'
                      ? (locale === "ar" ? "مؤكدة" : "Confirmed")
                      : backendStatus === 'FAILED'
                        ? (locale === "ar" ? "فشلت" : "Failed")
                        : (locale === "ar" ? "قيد المعالجة" : "Processing")}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">{locale === "ar" ? "نوع التبرع" : "Donation Type"}</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 relative">
                    <Image
                      src={donationType ? getIconPath(donationType.id) : '/icons/general.png'}
                      alt={donationType?.id || "icon"}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-shrine-blue-dark">
                    {t(`${state.donationType}`)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">{locale === "ar" ? "المبلغ" : "Amount"}</span>
                <span className="font-bold text-gold text-lg">
                  {formatCurrency(state.amount, locale)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">{locale === "ar" ? "طريقة الدفع" : "Payment Method"}</span>
                <span className="font-medium text-shrine-blue-dark">
                  {locale === "ar" ? paymentMethod?.nameAr : paymentMethod?.nameEn}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500 text-sm">{locale === "ar" ? "التاريخ" : "Date"}</span>
                <span className="text-sm text-shrine-blue-dark font-inter">{timestamp}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <Button fullWidth onClick={handleDonateAgain}>
            {locale === "ar" ? "تبرع مرة أخرى" : "Donate Again"}
          </Button>
          <Button fullWidth variant="outline" onClick={handleGoHome}>
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Button>
        </motion.div>

        {/* Dua */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-gray-400 text-sm mt-8 leading-7 italic"
        >
          {locale === "ar" 
            ? "«مَنْ تَصَدَّقَ بِصَدَقَةٍ فَلَهُ مِثْلُ أَجْرِ مَنْ عَمِلَ بِهَا»"
            : "\"Whoever gives charity, they will have a reward like the one who acted upon it.\""}
        </motion.p>
      </div>
    </div>
  );
}
