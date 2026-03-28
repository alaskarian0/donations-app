"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency, generateReferenceId } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function SuccessPage() {
  const router = useRouter();
  const { state, dispatch } = useDonation();
  const [refId] = useState(generateReferenceId);
  const [timestamp] = useState(() =>
    new Date().toLocaleDateString("ar-IQ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const donationType = DONATION_TYPES.find((t) => t.id === state.donationType);
  const paymentMethod = PAYMENT_METHODS.find((m) => m.id === state.paymentMethod);

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
            شكراً لتبرعك الكريم
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500"
          >
            جزاك الله خير الجزاء
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
              تفاصيل التبرع
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">رقم المرجع</span>
                <span className="font-mono text-sm font-bold text-shrine-blue-dark" dir="ltr">
                  {refId}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">نوع التبرع</span>
                <span className="font-medium text-shrine-blue-dark">
                  {donationType?.icon} {donationType?.nameAr}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">المبلغ</span>
                <span className="font-bold text-gold text-lg">
                  {formatCurrency(state.amount)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">طريقة الدفع</span>
                <span className="font-medium text-shrine-blue-dark">
                  {paymentMethod?.nameAr}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500 text-sm">التاريخ</span>
                <span className="text-sm text-shrine-blue-dark">{timestamp}</span>
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
            تبرع مرة أخرى
          </Button>
          <Button fullWidth variant="outline" onClick={handleGoHome}>
            الرئيسية
          </Button>
        </motion.div>

        {/* Dua */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-gray-400 text-sm mt-8 leading-7"
        >
          &quot;مَنْ تَصَدَّقَ بِصَدَقَةٍ فَلَهُ مِثْلُ أَجْرِ مَنْ عَمِلَ بِهَا&quot;
        </motion.p>
      </div>
    </div>
  );
}
