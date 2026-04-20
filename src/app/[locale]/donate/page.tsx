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

import Image from "next/image";

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

  const isComplete = state.donationType && (state.amount || state.customAmount) && state.paymentMethod;

  const handleContinue = () => {
    if (!isComplete) return;
    router.push(`/payment/${state.paymentMethod}`);
  };

  const getIconPath = (id: string) => {
    const validIcons = ['sadaqah', 'waqf', 'reconstruction', 'feeding', 'orphan', 'general'];
    return validIcons.includes(id) ? `/icons/${id}.png` : '/icons/general.png';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Obsidian Theme */}
      <section className="bg-ambient py-24 sm:py-32 px-4 relative overflow-hidden theme-shrine-dark">
        <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.05] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[2.5rem] sm:text-[4rem] font-bold gold-shimmer mb-6 tracking-tight"
          >
            {t("donate")}
          </motion.h1>
          <p className="text-gold-light/60 text-lg sm:text-xl font-light italic tracking-wide">
            {locale === "ar" 
              ? "اختر نوع التبرع والمبلغ وطريقة الدفع لخدمة المرقد الشريف" 
              : "Choose donation type, amount, and payment method to serve the Holy Shrine"}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-20 pb-40">
        {/* Step 1: Donation Type */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold gold-shimmer flex items-center gap-8">
              <span className="w-14 h-14 rounded-full bg-gold/5 border border-gold/10 text-gold flex items-center justify-center text-xl font-black shadow-gold-glow/10">
                ١
              </span>
              {locale === "ar" ? "أبواب التبرع" : "Choose Donation Type"}
            </h2>
            <div className="h-px flex-1 bg-gold/10 hidden sm:block mx-8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      "group h-full p-10 transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center rounded-[3rem] border shadow-xl",
                      isSelected 
                        ? "bg-gold/5 border-gold/40 shadow-gold-glow/10" 
                        : "bg-white border-gold/10 hover:border-gold/30 hover:shadow-2xl"
                    )}
                    onClick={() =>
                      dispatch({ type: "SET_DONATION_TYPE", payload: type.id })
                    }
                  >
                    <div className="absolute inset-0 geometry-heartbeat pointer-events-none opacity-[0.02]" />
                    <div className={cn(
                      "w-20 h-20 mb-8 flex items-center justify-center p-2 rounded-3xl transition-all duration-700 relative",
                    )}>
                      <div className={cn(
                        "absolute inset-0 bg-gold/5 rounded-full blur-xl transition-opacity duration-700",
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )} />
                      <Image
                        src={getIconPath(type.id)}
                        alt={type.id}
                        width={80}
                        height={80}
                        className={cn("relative z-10 transition-all duration-1000", isSelected ? "scale-110 drop-shadow-lg" : "group-hover:scale-105")}
                      />
                    </div>
                    <h3 className={cn(
                      "text-xl font-bold mb-4 tracking-tight transition-colors duration-700",
                      isSelected ? "text-gold" : "text-gray-900 group-hover:text-gold"
                    )}>
                      {dt(`${type.id}`)}
                    </h3>
                    <p className="text-gray-500 text-sm leading-[1.7] font-light tracking-wide italic">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold gold-shimmer flex items-center gap-8">
              <span className="w-14 h-14 rounded-full bg-gold/5 border border-gold/10 text-gold flex items-center justify-center text-xl font-black shadow-gold-glow/10">
                ٢
              </span>
              {locale === "ar" ? "حدد المبلغ" : "Set Amount"}
            </h2>
            <div className="h-px flex-1 bg-gold/10 hidden sm:block mx-8" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() =>
                  dispatch({ type: "SET_AMOUNT", payload: amount })
                }
                className={cn(
                  "py-5 px-2 rounded-[1.5rem] border transition-all duration-700 cursor-pointer font-bold",
                  state.amount === amount && !state.customAmount
                    ? "border-gold bg-gold text-shrine-blue-dark shadow-gold-glow scale-105"
                    : "border-gold/10 bg-white text-gray-500 hover:border-gold/30 hover:text-gold shadow-md hover:shadow-xl"
                )}
              >
                <span className="text-lg font-inter">
                  {amount.toLocaleString(locale === "ar" ? "ar-IQ" : "en-US")}
                </span>
                <span className="block text-[0.65rem] opacity-60 mt-1 uppercase tracking-widest">
                  {locale === "ar" ? "د.ع" : "IQD"}
                </span>
              </button>
            ))}
          </div>

          <div className="relative group/input max-w-2xl mx-auto">
            <input
              type="text"
              inputMode="numeric"
              placeholder={locale === "ar" ? "ساهم بأي مبلغ آخر..." : "Contribute any other amount..."}
              value={state.customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d]/g, "");
                dispatch({ type: "SET_CUSTOM_AMOUNT", payload: val });
              }}
              className="w-full rounded-[2rem] border border-gold/10 bg-gray-50 px-10 py-6 text-2xl text-gray-900 focus:border-gold focus:outline-none focus:ring-8 focus:ring-gold/5 transition-all font-inter placeholder:text-gray-400 shadow-inner"
              dir="ltr"
            />
            <span className={cn(
              "absolute top-1/2 -translate-y-1/2 text-gold font-bold tracking-widest text-lg",
              locale === "ar" ? "left-10" : "right-10"
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold gold-shimmer flex items-center gap-8">
              <span className="w-14 h-14 rounded-full bg-gold/5 border border-gold/10 text-gold flex items-center justify-center text-xl font-black shadow-gold-glow/10">
                ٣
              </span>
              {locale === "ar" ? "اختر طريقة الدفع" : "Choose Payment Method"}
            </h2>
            <div className="h-px flex-1 bg-gold/10 hidden sm:block mx-8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PAYMENT_METHODS.map((method) => (
              <Card
                key={method.id}
                selected={state.paymentMethod === method.id}
                hoverable
                className={cn(
                  "p-10 transition-all duration-700 rounded-[3rem] border",
                  state.paymentMethod === method.id 
                    ? "bg-gold/5 border-gold/40 shadow-gold-glow/10" 
                    : "bg-white border-gold/10 hover:shadow-2xl"
                )}
                onClick={() =>
                  dispatch({
                    type: "SET_PAYMENT_METHOD",
                    payload: method.id as PaymentMethod,
                  })
                }
              >
                <div className="flex items-center gap-10">
                  <div
                    className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-2xl transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundColor: method.brandColor }}
                  >
                    <span className="uppercase">{method.id.charAt(0)}</span>
                  </div>
                  <div className={locale === 'en' ? 'text-left' : 'text-right'}>
                    <h3 className={cn(
                      "font-bold text-2xl mb-2 transition-colors",
                      state.paymentMethod === method.id ? "text-gold" : "text-gray-900"
                    )}>
                      {locale === 'ar' ? method.nameAr: method.nameEn}
                    </h3>
                    <p className="text-gray-500 text-[0.7rem] tracking-[0.2em] uppercase font-black">
                      {method.id === "zaincash" ? "Electronic Wallet" : "Bank Card"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Sticky Bottom Bar - Obsidian Theme */}
      <div className="fixed bottom-0 left-0 right-0 bg-shrine-blue-dark/98 backdrop-blur-3xl border-t border-gold/20 z-40 theme-shrine-dark">
        <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between gap-12">
          <div className="flex-1 min-w-0">
            {state.donationType && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-1"
              >
                <span className="text-gold font-bold text-lg tracking-tight truncate">{dt(`${state.donationType}`)}</span>
                <span className="text-gold-light/60 text-sm font-light tracking-widest uppercase italic">
                  {state.amount ? formatCurrency(state.amount) : (state.customAmount ? formatCurrency(Number(state.customAmount)) : "---")}
                </span>
              </motion.div>
            )}
          </div>
          <Button
            size="lg"
            disabled={!isComplete}
            onClick={handleContinue}
            className={cn(
              "shrink-0 px-16 h-16 rounded-full font-black uppercase tracking-[0.25em] transition-all duration-700 hover:scale-105",
              isComplete ? "shadow-gold-glow bg-gold text-shrine-blue-dark" : "opacity-20 cursor-not-allowed"
            )}
          >
            {locale === 'ar' ? 'إتمام المساهمة' : 'Finalize Contribution'}
            <span className={cn("ml-3", locale === 'ar' ? 'rotate-180 -mr-3 ml-6' : '')}>→</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DonateContent />
    </Suspense>
  );
}
