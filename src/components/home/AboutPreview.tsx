"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import GoldenDivider from "@/components/ui/GoldenDivider";

export default function AboutPreview() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-shrine-blue via-shrine-blue-dark to-shrine-green overflow-hidden relative">
              {/* Dome illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-16 rounded-t-full bg-gradient-to-b from-gold to-gold-dark mx-auto" />
                  <div className="w-40 h-24 bg-gradient-to-b from-shrine-blue-light to-shrine-blue mx-auto rounded-b-lg" />
                  <div className="w-48 h-8 bg-gold/20 mx-auto mt-1" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-shrine-blue-dark/60 to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-shrine-blue-dark mb-6">
              عن المرقد الشريف
            </h2>
            <GoldenDivider />
            <p className="text-gray-600 leading-8 mb-4">
              يُعد مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام في مدينة
              سامراء من أقدس المراقد الإسلامية في العالم. يتميز المرقد بقبته
              الذهبية الشهيرة التي تعد رمزاً للمدينة المقدسة.
            </p>
            <p className="text-gray-600 leading-8 mb-8">
              تسعى العتبة العسكرية المقدسة لتقديم أفضل الخدمات للزوار الكرام من
              إطعام وإيواء وخدمات تعليمية وثقافية متنوعة.
            </p>
            <Link href="/about">
              <Button variant="secondary" size="md">
                اقرأ المزيد عن المرقد
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
