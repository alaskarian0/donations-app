"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES, PRESET_AMOUNTS, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { DonationType, PaymentMethod } from "@/lib/types";

function DonateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useDonation();

  // Pre-select donation type from URL
  useEffect(() => {
    const typeParam = searchParams.get("type") as DonationType | null;
    if (typeParam && DONATION_TYPES.find((t) => t.id === typeParam)) {
      dispatch({ type: "SET_DONATION_TYPE", payload: typeParam });
    }
  }, [searchParams, dispatch]);

  const isComplete = state.donationType && state.amount && state.paymentMethod;

  const handleContinue = () => {
    if (!isComplete) return;
    router.push(`/payment/${state.paymentMethod}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-shrine-blue-dark to-shrine-blue py-12 sm:py-16 px-4 geometric-bg">
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-gold mb-2"
          >
            التبرع
          </motion.h1>
          <p className="text-gray-400">اختر نوع التبرع والمبلغ وطريقة الدفع</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10 pb-32">
        {/* Step 1: Donation Type */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-shrine-blue-dark mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gold text-shrine-blue-dark flex items-center justify-center text-sm font-bold">
              ١
            </span>
            اختر نوع التبرع
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {DONATION_TYPES.map((type) => (
              <Card
                key={type.id}
                selected={state.donationType === type.id}
                hoverable
                className={cn(
                  "p-4 sm:p-5 text-center",
                  state.donationType === type.id && "bg-gold/5"
                )}
                onClick={() =>
                  dispatch({ type: "SET_DONATION_TYPE", payload: type.id })
                }
              >
                <div className="text-2xl sm:text-3xl mb-2">{type.icon}</div>
                <h3 className="font-bold text-shrine-blue-dark text-sm sm:text-base">
                  {type.nameAr}
                </h3>
                <p className="text-gray-400 text-xs mt-1 hidden sm:block">
                  {type.descriptionAr}
                </p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Step 2: Amount */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-shrine-blue-dark mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gold text-shrine-blue-dark flex items-center justify-center text-sm font-bold">
              ٢
            </span>
            حدد المبلغ
          </h2>

          {/* Preset amounts */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() =>
                  dispatch({ type: "SET_AMOUNT", payload: amount })
                }
                className={cn(
                  "py-3 px-2 rounded-xl border-2 text-center font-bold transition-all duration-200 cursor-pointer",
                  state.amount === amount && !state.customAmount
                    ? "border-gold bg-gold text-shrine-blue-dark shadow-lg shadow-gold/20"
                    : "border-gray-200 bg-white text-shrine-blue-dark hover:border-gold/50"
                )}
              >
                <span className="text-sm sm:text-base" dir="ltr">
                  {amount.toLocaleString("ar-IQ")}
                </span>
                <span className="block text-xs text-gray-500 mt-1">د.ع</span>
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="مبلغ آخر..."
              value={state.customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d]/g, "");
                dispatch({ type: "SET_CUSTOM_AMOUNT", payload: val });
              }}
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
              dir="ltr"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              د.ع
            </span>
          </div>

          {/* Selected amount display */}
          {state.amount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-center"
            >
              <span className="text-gray-500 text-sm">المبلغ المحدد: </span>
              <span className="text-2xl font-bold text-gold">
                {formatCurrency(state.amount)}
              </span>
            </motion.div>
          )}
        </motion.section>

        {/* Step 3: Payment Method */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-shrine-blue-dark mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gold text-shrine-blue-dark flex items-center justify-center text-sm font-bold">
              ٣
            </span>
            اختر طريقة الدفع
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAYMENT_METHODS.map((method) => (
              <Card
                key={method.id}
                selected={state.paymentMethod === method.id}
                hoverable
                className={cn(
                  "p-5 sm:p-6",
                  state.paymentMethod === method.id && "bg-gold/5"
                )}
                onClick={() =>
                  dispatch({
                    type: "SET_PAYMENT_METHOD",
                    payload: method.id as PaymentMethod,
                  })
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ backgroundColor: method.brandColor }}
                  >
                    {method.id === "zaincash" ? "Z" : "M"}
                  </div>
                  <div>
                    <h3 className="font-bold text-shrine-blue-dark text-base sm:text-lg">
                      {method.nameAr}
                    </h3>
                    <p className="text-gray-400 text-sm">{method.nameEn}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {method.id === "zaincash"
                        ? "الدفع عبر المحفظة الإلكترونية"
                        : "الدفع بالبطاقة المصرفية"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gold/20 shadow-2xl shadow-black/10 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {state.donationType && (
              <p className="text-sm text-gray-500 truncate">
                {DONATION_TYPES.find((t) => t.id === state.donationType)?.nameAr}
                {state.amount ? ` - ${formatCurrency(state.amount)}` : ""}
              </p>
            )}
          </div>
          <Button
            size="lg"
            disabled={!isComplete}
            onClick={handleContinue}
            className="shrink-0"
          >
            متابعة
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <DonateContent />
    </Suspense>
  );
}
