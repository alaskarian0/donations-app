"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES, PRESET_AMOUNTS, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { DonationType, PaymentMethod } from "@/lib/types";
import { useLocale } from "next-intl";
import { Star, Building2, Maximize2, Wrench, Trees, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Star, Building2, Maximize2, Wrench, Trees,
};

function DonateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, dispatch } = useDonation();

  useEffect(() => {
    const typeParam = searchParams.get("type") as DonationType | null;
    if (typeParam && DONATION_TYPES.find((t) => t.id === typeParam)) {
      dispatch({ type: "SET_DONATION_TYPE", payload: typeParam });
      setTimeout(() => {
        document.getElementById("step-amount")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [searchParams, dispatch]);

  const isComplete =
    state.donationType &&
    (state.amount || state.customAmount) &&
    state.paymentMethod;

  const handleContinue = () => {
    if (!isComplete) return;
    router.push(`/payment/${state.paymentMethod}`);
  };

  const getDonationLabel = (id: string) => {
    const found = DONATION_TYPES.find((t) => t.id === id);
    return isAr ? found?.nameAr ?? id : id;
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header ── */}
      <section
        className="py-16 sm:py-20 px-4 text-center"
        style={{ backgroundColor: "#e8f5ee" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-bold mb-3"
          style={{ color: "#1a5c38", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1.3 }}
        >
          {isAr ? "أبواب التبرع" : "Donation Gates"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-gray-500 max-w-xl mx-auto"
          style={{ fontSize: "0.9rem", lineHeight: 1.7 }}
        >
          {isAr
            ? "اختر نوع التبرع والمبلغ وطريقة الدفع لخدمة المرقد الشريف"
            : "Choose donation type, amount, and payment method to serve the Holy Shrine"}
        </motion.p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20 space-y-16 pb-36">

        {/* ── Step 1: Donation Type ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
              style={{ backgroundColor: "#1a5c38" }}
            >
              {isAr ? "١" : "1"}
            </span>
            <h2 className="font-bold text-xl sm:text-2xl" style={{ color: "#1a5c38" }}>
              {isAr ? "أبواب التبرع" : "Choose Donation Type"}
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {DONATION_TYPES.map((type, index) => {
              const Icon = ICON_MAP[type.icon] ?? Star;
              const isSelected = state.donationType === type.id;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  onClick={() => dispatch({ type: "SET_DONATION_TYPE", payload: type.id })}
                  className={cn(
                    "group flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
                    isSelected
                      ? "border-[#1a5c38] shadow-md"
                      : "border-gray-100 bg-white hover:border-[#1a5c38]/30 hover:shadow-md"
                  )}
                  style={isSelected ? { backgroundColor: "#e8f5ee" } : {}}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300"
                    style={{
                      backgroundColor: isSelected ? "#1a5c38" : "#e8f5ee",
                    }}
                  >
                    <Icon
                      className="w-7 h-7 transition-colors duration-300"
                      style={{ color: isSelected ? "#ffffff" : "#1a5c38" }}
                    />
                  </div>
                  <div
                    className="w-8 h-0.5 rounded-full mb-2 transition-opacity duration-300"
                    style={{
                      backgroundColor: "#1a5c38",
                      opacity: isSelected ? 1 : 0.3,
                    }}
                  />
                  <h3
                    className="font-bold mb-1 text-sm"
                    style={{ color: isSelected ? "#1a5c38" : "#222222", lineHeight: 1.4 }}
                  >
                    {isAr ? type.nameAr : type.id}
                  </h3>
                  <p className="text-xs" style={{ color: "#9ca3af", lineHeight: 1.5 }}>
                    {isAr ? type.descriptionAr : type.descriptionAr}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* ── Step 2: Amount ── */}
        <motion.section
          id="step-amount"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
              style={{ backgroundColor: "#1a5c38" }}
            >
              {isAr ? "٢" : "2"}
            </span>
            <h2 className="font-bold text-xl sm:text-2xl" style={{ color: "#1a5c38" }}>
              {isAr ? "حدد المبلغ" : "Set Amount"}
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {PRESET_AMOUNTS.map((amount) => {
              const isSelected = state.amount === amount && !state.customAmount;
              return (
                <button
                  key={amount}
                  onClick={() => dispatch({ type: "SET_AMOUNT", payload: amount })}
                  className={cn(
                    "py-4 px-2 rounded-xl border font-bold transition-all duration-300 cursor-pointer",
                    isSelected
                      ? "text-white border-transparent shadow-md scale-105"
                      : "border-gray-100 bg-white text-gray-600 hover:border-[#1a5c38]/30 hover:text-[#1a5c38]"
                  )}
                  style={isSelected ? { backgroundColor: "#1a5c38" } : {}}
                >
                  <span className="text-base font-bold block">
                    {amount.toLocaleString(isAr ? "ar-IQ" : "en-US")}
                  </span>
                  <span className="text-xs opacity-70 mt-0.5 block">
                    {isAr ? "د.ع" : "IQD"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              inputMode="numeric"
              placeholder={isAr ? "أو أدخل مبلغاً آخر..." : "Or enter a custom amount..."}
              value={state.customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d]/g, "");
                dispatch({ type: "SET_CUSTOM_AMOUNT", payload: val });
              }}
              className={cn(
                "w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-800 focus:outline-none transition-all placeholder:text-gray-400",
                isAr ? "text-right pr-5 pl-16" : "text-left pl-5 pr-16"
              )}
              style={{
                fontFamily: "var(--font-arabic), sans-serif",
                fontSize: "1rem",
                lineHeight: 1.5,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1a5c38")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 font-bold text-sm",
                isAr ? "left-5" : "right-5"
              )}
              style={{ color: "#1a5c38" }}
            >
              {isAr ? "د.ع" : "IQD"}
            </span>
          </div>
        </motion.section>

        {/* ── Step 3: Payment Method ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
              style={{ backgroundColor: "#1a5c38" }}
            >
              {isAr ? "٣" : "3"}
            </span>
            <h2 className="font-bold text-xl sm:text-2xl" style={{ color: "#1a5c38" }}>
              {isAr ? "اختر طريقة الدفع" : "Choose Payment Method"}
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = state.paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() =>
                    dispatch({ type: "SET_PAYMENT_METHOD", payload: method.id as PaymentMethod })
                  }
                  className={cn(
                    "flex items-center gap-5 p-6 rounded-2xl border text-start transition-all duration-300 cursor-pointer",
                    isSelected
                      ? "border-[#1a5c38] shadow-md"
                      : "border-gray-100 bg-white hover:border-[#1a5c38]/30 hover:shadow-sm"
                  )}
                  style={isSelected ? { backgroundColor: "#e8f5ee" } : {}}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ backgroundColor: method.brandColor }}
                  >
                    {method.id === "zaincash" ? "Z" : "M"}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: isSelected ? "#1a5c38" : "#222222", lineHeight: 1.4 }}>
                      {isAr ? method.nameAr : method.nameEn}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#9ca3af", lineHeight: 1.4 }}>
                      {method.id === "zaincash"
                        ? isAr ? "محفظة إلكترونية" : "Electronic Wallet"
                        : isAr ? "بطاقة مصرفية" : "Bank Card"}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="ms-auto w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1a5c38" }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="white" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.section>
      </div>

      {/* ── Sticky bottom bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 border-t border-gray-100 z-40 bg-white/95 backdrop-blur-md"
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            {state.donationType && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-0.5"
              >
                <span className="font-bold" style={{ color: "#1a5c38", fontSize: "0.85rem" }}>
                  {getDonationLabel(state.donationType)}
                </span>
                <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                  {state.amount
                    ? formatCurrency(state.amount, locale)
                    : state.customAmount
                    ? formatCurrency(Number(state.customAmount), locale)
                    : isAr ? "لم يُحدد المبلغ بعد" : "Amount not set"}
                </span>
              </motion.div>
            )}
          </div>
          <button
            disabled={!isComplete}
            onClick={handleContinue}
            className={cn(
              "flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300",
              isComplete
                ? "text-white hover:opacity-90 cursor-pointer"
                : "opacity-30 cursor-not-allowed text-white"
            )}
            style={{ backgroundColor: "#1a5c38" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
              <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
            </svg>
            {isAr ? "إتمام المساهمة" : "Finalize Contribution"}
          </button>
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
