"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES } from "@/lib/constants";
import { formatCurrency, formatCardNumber, formatExpiry } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PaymentStepper from "@/components/payment/PaymentStepper";
import ProcessingOverlay from "@/components/payment/ProcessingOverlay";

export default function SuperQiPage() {
  const router = useRouter();
  const { state, dispatch } = useDonation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const donationType = DONATION_TYPES.find((t) => t.id === state.donationType);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (cardNumber.replace(/\s/g, "").length < 16) errs.cardNumber = "رقم البطاقة غير صحيح";
    if (expiry.length < 5) errs.expiry = "تاريخ الانتهاء غير صحيح";
    if (cvv.length < 3) errs.cvv = "رمز CVV غير صحيح";
    if (!name.trim()) errs.name = "يرجى إدخال اسم حامل البطاقة";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Card data stays local — only dispatch donor name to global state
    dispatch({ type: "SET_DONOR_NAME", payload: name });
    setProcessing(true);
    setTimeout(() => {
      router.push("/success");
    }, 2500);
  };

  if (!state.donationType || !state.amount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-gray-500 mb-4">لم يتم اختيار تبرع بعد</p>
          <Button onClick={() => router.push("/donate")}>العودة للتبرع</Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      {processing && <ProcessingOverlay />}
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-b from-shrine-blue-dark to-shrine-blue py-10 px-4 geometric-bg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <PaymentStepper currentStep={2} />
          </div>
        </section>

        <div className="max-w-lg mx-auto px-4 py-8 sm:py-12">
          {/* Donation Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-5 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">نوع التبرع</p>
                  <p className="font-bold text-shrine-blue-dark">
                    {donationType?.icon} {donationType?.nameAr}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">المبلغ</p>
                  <p className="font-bold text-gold text-lg">
                    {formatCurrency(state.amount)}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 sm:p-8">
              {/* Branding */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#1A1F71] flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div>
                  <h2 className="font-bold text-lg text-shrine-blue-dark">
                    الدفع بالبطاقة المصرفية
                  </h2>
                  <p className="text-gray-400 text-sm">Mastercard - Qi Card</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم البطاقة
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all tracking-widest"
                    dir="ltr"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-center"
                      dir="ltr"
                    />
                    {errors.expiry && (
                      <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رمز CVV
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="XXX"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      maxLength={3}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-center"
                      dir="ltr"
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم حامل البطاقة
                  </label>
                  <input
                    type="text"
                    placeholder="الاسم كما يظهر على البطاقة"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700 leading-6">
                  <p className="font-medium mb-1">معاملة آمنة</p>
                  <p>بياناتك محمية بتشفير SSL. لن يتم حفظ بيانات بطاقتك.</p>
                </div>

                <Button type="submit" fullWidth size="lg" disabled={processing}>
                  ادفع الآن - {formatCurrency(state.amount)}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Back */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/donate")}
              className="text-gray-400 hover:text-gold text-sm transition-colors cursor-pointer"
            >
              ← العودة لاختيار التبرع
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
