"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES, PRESET_AMOUNTS, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency, cn, formatPhoneNumber } from "@/lib/utils";
import { createDonation } from "@/lib/api";
import type { DonationType, PaymentMethod } from "@/lib/types";
import { useLocale } from "next-intl";
import { Star, Building2, Maximize2, Wrench, Trees, LucideIcon, CheckCircle2, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Star, Building2, Maximize2, Wrench, Trees,
};

function DonateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const isAr = locale === "ar" || locale === "fa";
  const { state, dispatch } = useDonation();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [apiError, setApiError] = useState("");

  const isZainCash = state.paymentMethod === "zaincash";

  useEffect(() => {
    const typeParam = searchParams.get("type") as DonationType | null;
    if (typeParam && DONATION_TYPES.find((t) => t.id === typeParam)) {
      dispatch({ type: "SET_DONATION_TYPE", payload: typeParam });
    }
  }, [searchParams, dispatch]);

  const finalAmount = state.customAmount ? Number(state.customAmount) : state.amount ?? 0;

  const isComplete =
    state.donationType &&
    finalAmount > 0 &&
    state.paymentMethod &&
    (!isZainCash || phone.replace(/\D/g, "").length >= 11);

  const handleContinue = async () => {
    if (!isComplete || processing) return;

    if (isZainCash) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 11) {
        setPhoneError(isAr ? "يرجى إدخال رقم هاتف صحيح" : "Enter a valid phone number");
        return;
      }
    }

    setProcessing(true);
    setApiError("");
    dispatch({ type: "SET_DONOR_PHONE", payload: phone });

    try {
      const data = await createDonation({
        type: state.donationType?.toUpperCase() || "",
        amount: finalAmount,
        donorName: "Guest",
        donorPhone: phone,
        paymentMethod: state.paymentMethod || "",
      });

      dispatch({ type: "SET_PAYMENT_ID", payload: data.paymentId || data.id || "" });
      router.push("/success");
    } catch {
      setApiError(isAr ? "حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً." : "Server error. Please try again.");
      setProcessing(false);
    }
  };

  const activeType = DONATION_TYPES.find((t) => t.id === state.donationType);
  const displayAmount = finalAmount;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-bold text-2xl sm:text-3xl" style={{ color: "#1a5c38" }}>
            {isAr ? "أبواب التبرع" : "Donation Gates"}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {isAr
              ? "اختر نوع التبرع ثم حدد المبلغ وطريقة الدفع"
              : "Choose donation type, then set amount and payment method"}
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">

          {/* ── LEFT PANEL: Donation types ── */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="px-5 pt-5 pb-3 border-b border-gray-50">
              <p className="font-bold text-sm" style={{ color: "#1a5c38" }}>
                {isAr ? "نوع التبرع" : "Donation Type"}
              </p>
            </div>
            <div className="p-3 space-y-1.5">
              {DONATION_TYPES.map((type, index) => {
                const Icon = ICON_MAP[type.icon] ?? Star;
                const isSelected = state.donationType === type.id;
                return (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, x: isAr ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.06 }}
                    onClick={() => dispatch({ type: "SET_DONATION_TYPE", payload: type.id })}
                    className={cn(
                      "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-start transition-all duration-250 cursor-pointer group",
                      isSelected
                        ? "shadow-sm"
                        : "hover:bg-gray-50"
                    )}
                    style={isSelected ? { backgroundColor: "#e8f5ee" } : {}}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-250"
                      style={{ backgroundColor: isSelected ? "#1a5c38" : "#f3f4f6" }}
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-250"
                        style={{ color: isSelected ? "#ffffff" : "#9ca3af" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm leading-snug"
                        style={{ color: isSelected ? "#1a5c38" : "#111827" }}
                      >
                        {isAr ? type.nameAr : type.id}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-4 truncate">
                        {type.descriptionAr}
                      </p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#1a5c38" }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT PANEL: Amount + Payment + Continue ── */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-5"
          >
            {/* Amount card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <p className="font-bold text-sm mb-5" style={{ color: "#1a5c38" }}>
                {isAr ? "المبلغ" : "Amount"}
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-5">
                {PRESET_AMOUNTS.map((amount) => {
                  const isSelected = state.amount === amount && !state.customAmount;
                  return (
                    <button
                      key={amount}
                      onClick={() => dispatch({ type: "SET_AMOUNT", payload: amount })}
                      className={cn(
                        "py-3 px-2 rounded-2xl border font-bold text-sm transition-all duration-250 cursor-pointer",
                        isSelected
                          ? "border-transparent text-white shadow-sm"
                          : "border-gray-100 bg-gray-50 text-gray-600 hover:border-[#1a5c38]/30 hover:text-[#1a5c38] hover:bg-white"
                      )}
                      style={isSelected ? { backgroundColor: "#1a5c38" } : {}}
                    >
                      <span className="block text-sm font-bold">
                        {amount.toLocaleString(isAr ? "ar-IQ" : "en-US")}
                      </span>
                      <span className="block text-xs opacity-70 mt-0.5">
                        {isAr ? "د.ع" : "IQD"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={isAr ? "أو أدخل مبلغاً مخصصاً..." : "Or enter a custom amount..."}
                  value={state.customAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d]/g, "");
                    dispatch({ type: "SET_CUSTOM_AMOUNT", payload: val });
                  }}
                  className={cn(
                    "w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-gray-800 focus:outline-none focus:border-[#1a5c38] transition-colors placeholder:text-gray-400 text-sm",
                    isAr ? "text-right pr-5 pl-16" : "text-left pl-5 pr-16"
                  )}
                />
                <span
                  className={cn("absolute top-1/2 -translate-y-1/2 font-bold text-xs", isAr ? "left-5" : "right-5")}
                  style={{ color: "#1a5c38" }}
                >
                  {isAr ? "د.ع" : "IQD"}
                </span>
              </div>
            </div>

            {/* Payment method card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <p className="font-bold text-sm mb-5" style={{ color: "#1a5c38" }}>
                {isAr ? "طريقة الدفع" : "Payment Method"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = state.paymentMethod === method.id;
                  const isZain = method.id === "zaincash";
                  return (
                    <button
                      key={method.id}
                      onClick={() =>
                        dispatch({ type: "SET_PAYMENT_METHOD", payload: method.id as PaymentMethod })
                      }
                      className={cn(
                        "relative flex flex-col justify-between p-5 rounded-2xl border text-start transition-all duration-250 cursor-pointer overflow-hidden",
                        isSelected
                          ? "border-[#1a5c38] shadow-md"
                          : "border-gray-100 bg-gray-50 hover:border-[#1a5c38]/30 hover:bg-white"
                      )}
                      style={{
                        minHeight: "110px",
                        background: isSelected
                          ? isZain
                            ? "linear-gradient(135deg, #e8f5ee 0%, #f0faf4 100%)"
                            : "linear-gradient(135deg, #e8f5ee 0%, #f0faf4 100%)"
                          : undefined,
                      }}
                    >
                      {/* Card chip simulation */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-8 h-6 rounded-sm opacity-60"
                          style={{
                            background: "linear-gradient(135deg, #d4af37, #f1d683)",
                          }}
                        />
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4" style={{ color: "#1a5c38" }} />
                        )}
                      </div>

                      {/* Method name */}
                      <p
                        className="font-bold text-sm leading-snug mb-3"
                        style={{ color: isSelected ? "#1a5c38" : "#111827" }}
                      >
                        {isAr ? method.nameAr : method.nameEn}
                      </p>

                      {/* Logos row */}
                      <div className="flex items-center gap-2">
                        {isZain ? (
                          <img
                            src="https://imagedelivery.net/UoIvgody5iICfZMIUiEnfQ/6eceb72f-af92-40f1-fc6b-ae122bfdec00/public"
                            alt="ZainCash"
                            className="h-5 w-auto object-contain"
                          />
                        ) : (
                          <>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png"
                              alt="Mastercard"
                              className="h-5 w-auto object-contain"
                            />
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg/120px-Visa_Inc._logo_%282021%E2%80%93present%29.svg.png"
                              alt="Visa"
                              className="h-4 w-auto object-contain"
                            />
                            <img
                              src="https://imagedelivery.net/UoIvgody5iICfZMIUiEnfQ/312d166e-63b0-420e-1e61-102d1a71d100/public"
                              alt="QiCard"
                              className="h-5 w-auto object-contain"
                            />
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ZainCash phone input */}
            <AnimatePresence>
              {isZainCash && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden"
                >
                  <p className="font-bold text-sm mb-4" style={{ color: "#1a5c38" }}>
                    {isAr ? "رقم هاتف زين كاش" : "ZainCash Phone Number"}
                  </p>
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center bg-gray-100 rounded-2xl px-4 text-gray-600 font-medium text-sm shrink-0" dir="ltr">
                      +964
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="07XX XXX XXXX"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatPhoneNumber(e.target.value));
                        setPhoneError("");
                      }}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-base focus:outline-none focus:border-[#1a5c38] transition-colors font-bold"
                      dir="ltr"
                    />
                  </div>
                  {phoneError && (
                    <p className="mt-2 text-xs text-red-500">{phoneError}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary + Continue */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <AnimatePresence mode="wait">
                {state.donationType && displayAmount > 0 && state.paymentMethod ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between mb-5"
                  >
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">
                        {isAr ? "ملخص التبرع" : "Donation Summary"}
                      </p>
                      <p className="font-bold text-sm" style={{ color: "#1a5c38" }}>
                        {isAr ? activeType?.nameAr : activeType?.id}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="text-xs text-gray-400 mb-0.5">
                        {isAr ? "المبلغ" : "Amount"}
                      </p>
                      <p className="font-bold text-base" style={{ color: "#1a5c38" }}>
                        {formatCurrency(displayAmount, locale)}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-gray-400 mb-5"
                  >
                    {isAr ? "أكمل الاختيارات أعلاه للمتابعة" : "Complete the selections above to continue"}
                  </motion.p>
                )}
              </AnimatePresence>

              {apiError && (
                <p className="text-xs text-red-500 mb-3 text-center">{apiError}</p>
              )}

              <button
                disabled={!isComplete || processing}
                onClick={handleContinue}
                className={cn(
                  "w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all duration-300",
                  isComplete && !processing
                    ? "text-white hover:opacity-90 cursor-pointer shadow-sm"
                    : "opacity-40 cursor-not-allowed text-white"
                )}
                style={{ backgroundColor: "#1a5c38" }}
              >
                {processing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                      <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                    </svg>
                    {isAr ? "إتمام المساهمة" : "Finalize Contribution"}
                    <ArrowIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </motion.div>
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
