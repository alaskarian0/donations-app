"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useDonation } from "@/context/DonationContext";
import { DONATION_TYPES } from "@/lib/constants";
import { formatCurrency, formatPhoneNumber } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PaymentStepper from "@/components/payment/PaymentStepper";
import ProcessingOverlay from "@/components/payment/ProcessingOverlay";
import { useTranslations } from "next-intl";
import { createDonation } from "@/lib/api";
import Image from "next/image";

export default function ZainCashPage() {
  const router = useRouter();
  const { state, dispatch } = useDonation();
  const t = useTranslations("DonationTypes");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const donationType = DONATION_TYPES.find((t) => t.id === state.donationType);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) {
      setError("يرجى إدخال رقم هاتف صحيح");
      return;
    }
    setError("");
    dispatch({ type: "SET_DONOR_PHONE", payload: phone });
    setProcessing(true);

    try {
      const data = await createDonation({
        type: state.donationType?.toUpperCase() || '',
        amount: state.amount || 0,
        donorName: state.donorName || "Guest",
        donorPhone: phone,
        paymentMethod: "zaincash",
      });

      dispatch({ type: "SET_DONATION_ID", payload: data.id });
      dispatch({
        type: "SET_PAYMENT_INFO",
        payload: { paymentId: data.paymentId || '', status: "pending" },
      });

      setTimeout(() => {
        router.push("/success");
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً.");
      setProcessing(false);
    }
  };

  if (!state.donationType || !state.amount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-gray-500 mb-4">لم يتم اختيار تبرع بعد</p>
          <Link href="/donate">
            <Button>العودة للتبرع</Button>
          </Link>
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
            <Card className="p-8 mb-10 overflow-hidden relative theme-shrine-dark bg-shrine-blue-dark">
              <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={donationType ? getIconPath(donationType.id) : '/icons/general.png'}
                      alt={donationType?.nameAr || "Donation"}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gold/60 uppercase tracking-widest mb-1 italic">نوع التبرع</p>
                    <p className="font-bold text-xl text-white">
                      {t(`${state.donationType}`)}
                    </p>
                  </div>
                </div>
                <div className="text-left border-l border-gold/10 pl-8">
                  <p className="text-sm text-gold/60 uppercase tracking-widest mb-1 italic">المبلغ</p>
                  <p className="font-bold text-gold text-2xl">
                    {formatCurrency(state.amount)}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ZainCash Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 sm:p-8">
              {/* ZainCash Branding */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#E4002B] flex items-center justify-center text-white font-bold text-xl">
                  Z
                </div>
                <div>
                  <h2 className="font-bold text-lg text-shrine-blue-dark">
                    الدفع عبر زين كاش
                  </h2>
                  <p className="text-gray-400 text-sm">ZainCash</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center bg-gray-100 rounded-xl px-4 text-gray-600 font-medium text-sm shrink-0" dir="ltr">
                      +964
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="07XX XXX XXXX"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatPhoneNumber(e.target.value));
                        setError("");
                      }}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-xl focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all font-bold"
                      dir="ltr"
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>

                <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-700 leading-6">
                  <p className="font-medium mb-1">ملاحظة:</p>
                  <p>سيتم إرسال رسالة تأكيد إلى رقم هاتفك لإتمام عملية الدفع.</p>
                </div>

                <Button type="submit" fullWidth size="lg" disabled={processing}>
                  تأكيد الدفع
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
