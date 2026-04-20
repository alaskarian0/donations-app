"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES, PRESET_AMOUNTS, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { DonationType, PaymentMethod } from "@/lib/types";
import { useTranslations, useLocale } from "next-intl";

function DonateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const tc = useTranslations("Categories");
  const dt = useTranslations("DonationTypes");
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
    <div className="min-h-screen bg-shrine-blue-dark">
      {/* Header */}
      <section className="bg-gradient-to-b from-shrine-blue-dark to-shrine-blue py-12 sm:py-16 px-4 geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 geometry-heartbeat opacity-[0.05]" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold gold-shimmer mb-2"
          >
            {t("donate")}
          </motion.h1>
          <p className="text-gray-400 font-light italic">
            {locale === "ar" 
              ? "اختر نوع التبرع والمبلغ وطريقة الدفع" 
              : "Choose donation type, amount, and payment method"}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10 pb-32">
        {/* Step 1: Donation Type (Sanctuary Grid) */}
        {/* ... (this section already updated in previous turn, keeping its logic) ... */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold gold-shimmer flex items-center gap-6">
              <span className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 text-gold flex items-center justify-center text-lg font-black shadow-gold-glow">
                ١
              </span>
              {locale === "ar" ? "أبواب التبرع" : "Choose Donation Type"}
            </h2>
            <div className="h-px flex-1 bg-gold/10 hidden sm:block mx-8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-fib-2)]">
            {DONATION_TYPES.map((type, index) => {
               const isSelected = state.donationType === type.id;
               return (
                <motion.div
                  key={type.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Card
                    selected={isSelected}
                    hoverable
                    className={cn(
                      "group h-full p-8 transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center",
                      isSelected 
                        ? "bg-gold/10 border-gold/40 shadow-gold-glow" 
                        : "bg-white/5 border-gold/5 hover:border-gold/20 shadow-cloud"
                    )}
                    onClick={() =>
                      dispatch({ type: "SET_DONATION_TYPE", payload: type.id })
                    }
                  >
                    <div className="absolute inset-0 geometry-heartbeat pointer-events-none opacity-[0.03]" />
                    <div className={cn(
                      "w-20 h-20 mb-8 flex items-center justify-center p-4 rounded-3xl transition-all duration-1000",
                      isSelected ? "bg-gold text-shrine-blue-dark scale-110" : "bg-gold/5 text-gold group-hover:bg-gold/10"
                    )}>
                      <span className="text-4xl">{type.icon}</span>
                    </div>
                    <h3 className={cn(
                      "text-xl font-bold mb-4 tracking-tight transition-colors duration-700",
                      isSelected ? "text-gold" : "text-white/90 group-hover:text-gold"
                    )}>
                      {dt(`${type.id}`)}
                    </h3>
                    <p className="text-gray-400 text-sm leading-[1.6] font-light tracking-wide italic">
                      {dt(`${type.id}_desc`)}
                    </p>
                  </Card>
                </motion.div>
               );
            })}
          </div>
        </motion.section>

        {/* Step 2: Amount */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold gold-shimmer flex items-center gap-6">
              <span className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 text-gold flex items-center justify-center text-lg font-black shadow-gold-glow">
                ٢
              </span>
              {locale === "ar" ? "حدد المبلغ" : "Set Amount"}
            </h2>
            <div className="h-px flex-1 bg-gold/10 hidden sm:block mx-8" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() =>
                  dispatch({ type: "SET_AMOUNT", payload: amount })
                }
                className={cn(
                  "py-4 px-2 rounded-2xl border transition-all duration-500 cursor-pointer font-bold",
                  state.amount === amount && !state.customAmount
                    ? "border-gold bg-gold text-shrine-blue-dark shadow-gold-glow scale-105"
                    : "border-gold/10 bg-white/5 text-gray-400 hover:border-gold/30 hover:text-gold"
                )}
              >
                <span className="text-sm sm:text-base font-inter">
                  {amount.toLocaleString(locale === "ar" ? "ar-IQ" : "en-US")}
                </span>
                <span className="block text-[0.65rem] opacity-60 mt-1 uppercase tracking-widest">
                  {locale === "ar" ? "د.ع" : "IQD"}
                </span>
              </button>
            ))}
          </div>

          <div className="relative group/input">
            <input
              type="text"
              inputMode="numeric"
              placeholder={locale === "ar" ? "مرحب بمساهمتكم بأي مبلغ آخر..." : "Contribute any other amount..."}
              value={state.customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d]/g, "");
                dispatch({ type: "SET_CUSTOM_AMOUNT", payload: val });
              }}
              className="w-full rounded-2xl border border-gold/10 bg-white/5 px-8 py-5 text-xl text-gold focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 transition-all font-inter placeholder:text-gray-600"
              dir="ltr"
            />
            <span className={cn(
              "absolute top-1/2 -translate-y-1/2 text-gold/40 text-sm font-bold tracking-widest",
              locale === "ar" ? "left-8" : "right-8"
            )}>
              {locale === "ar" ? "د.ع" : "IQD"}
            </span>
          </div>
        </motion.section>

        {/* Step 3: Payment Method */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold gold-shimmer flex items-center gap-6">
              <span className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 text-gold flex items-center justify-center text-lg font-black shadow-gold-glow">
                ٣
              </span>
              {locale === "ar" ? "اختر طريقة الدفع" : "Choose Payment Method"}
            </h2>
            <div className="h-px flex-1 bg-gold/10 hidden sm:block mx-8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PAYMENT_METHODS.map((method) => (
              <Card
                key={method.id}
                selected={state.paymentMethod === method.id}
                hoverable
                className={cn(
                  "p-8 transition-all duration-700",
                  state.paymentMethod === method.id 
                    ? "bg-gold/10 border-gold/40 shadow-gold-glow" 
                    : "bg-white/5 border-gold/5"
                )}
                onClick={() =>
                  dispatch({
                    type: "SET_PAYMENT_METHOD",
                    payload: method.id as PaymentMethod,
                  })
                }
              >
                <div className="flex items-center gap-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg"
                    style={{ backgroundColor: method.brandColor }}
                  >
                    {method.id === "zaincash" ? "Z" : "M"}
                  </div>
                  <div className={locale === 'en' ? 'text-left' : 'text-right'}>
                    <h3 className={cn(
                      "font-bold text-xl mb-1",
                      state.paymentMethod === method.id ? "text-gold" : "text-white/90"
                    )}>
                      {locale === 'ar' ? method.nameAr: method.nameEn}
                    </h3>
                    <p className="text-gray-500 text-sm tracking-wide uppercase font-black">
                      {method.id === "zaincash" ? "Electronic Wallet" : "Bank Card"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Sticky Bottom Bar (Sanctuary Integrated) */}
      <div className="fixed bottom-0 left-0 right-0 bg-shrine-blue-dark/95 backdrop-blur-2xl border-t border-gold/20 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between gap-8">
          <div className="flex-1 min-w-0">
            {state.donationType && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-gray-400 truncate tracking-wide italic"
              >
                <span className="text-gold font-bold not-italic">{dt(`${state.donationType}`)}</span>
                {state.amount ? ` — ${formatCurrency(state.amount)}` : ""}
              </motion.p>
            )}
          </div>
          <Button
            size="lg"
            disabled={!isComplete}
            onClick={handleContinue}
            className={cn(
              "shrink-0 px-12 h-14 rounded-full font-black uppercase tracking-[0.2em] transition-all duration-700",
              isComplete ? "shadow-gold-glow animate-pulse" : "opacity-30"
            )}
          >
            {locale === 'ar' ? 'إتمام المساهمة' : 'Finalize Contribution'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-shrine-blue-dark" />}>
      <DonateContent />
    </Suspense>
  );
}
