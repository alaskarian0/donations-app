"use client";

import { motion } from "framer-motion";
import GoldenDivider from "@/components/ui/GoldenDivider";
import { SITE_NAME } from "@/lib/constants";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

import Image from "next/image";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const locale = useLocale();

  return (
    <div className={locale === 'en' ? 'text-left' : ''}>
      {/* Hero Banner - Obsidian Theme */}
      <section className="relative py-32 sm:py-48 bg-ambient overflow-hidden theme-shrine-dark">
        <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.05] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[2.5rem] sm:text-[4rem] font-bold gold-shimmer mb-6 tracking-tight"
          >
            {locale === "ar" ? "عن المرقد الشريف" : "About the Holy Shrine"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-light/60 text-lg sm:text-xl font-light tracking-widest uppercase italic"
          >
            {SITE_NAME} • {locale === "ar" ? "سامراء المقدسة" : "Holy Samarra"}
          </motion.p>
        </div>
      </section>

      {/* History - Light Theme */}
      <section className="py-[var(--spacing-fib-8)] px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-[2.25rem] sm:text-[3rem] font-bold gold-shimmer mb-10 tracking-tight">
              {locale === "ar" ? "تاريخ المرقد الشريف" : "Shrine History"}
            </h2>
            <div className="mb-12 opacity-30">
              <GoldenDivider />
            </div>
            <div className="space-y-8 text-gray-600 text-lg leading-[1.8] font-light">
              <p>
                {locale === "ar" 
                  ? "يقع مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام في مدينة سامراء المقدسة، وهو من أقدس المراقد الإسلامية في العالم." 
                  : "The Shrine of Imams Ali Al-Hadi and Al-Hasan Al-Askari (pbut) is located in the holy city of Samarra, and it is one of the most sacred Islamic shrines in the world."}
              </p>
              <p>
                {locale === "ar"
                  ? "يضم المرقد رفات الإمام العاشر علي الهادي (عليه السلام) والإمام الحادي عشر الحسن العسكري (عليه السلام)."
                  : "The shrine contains the remains of the tenth Imam Ali Al-Hadi (pbuh) and the eleventh Imam Hasan Al-Askari (pbuh)."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reconstruction - Light Gray Theme */}
      <section className="py-[var(--spacing-fib-8)] px-4 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.02] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeIn}>
            <h2 className="text-[2.25rem] sm:text-[3rem] font-bold gold-shimmer mb-10 tracking-tight">
              {locale === "ar" ? "إعادة الإعمار" : "Reconstruction"}
            </h2>
            <div className="mb-12 opacity-30">
              <GoldenDivider />
            </div>
            <div className="space-y-8 text-gray-600 text-lg leading-[1.8] font-light">
              <p>
                {locale === "ar"
                  ? "بُني المرقد في عام 944 ميلادي، ويتميز بقبته الذهبية الشهيرة. تم إعادة بناء القبة الذهبية والمئذنتين بأبهى حلة بعد أحداث عام 2006."
                  : "The shrine was built in 944 AD and is famous for its golden dome. The golden dome and the two minarets were rebuilt in their finest form after the events of 2006."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services - Light Theme */}
      <section className="py-[var(--spacing-fib-8)] px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="text-center mb-20">
               <h2 className="text-[2.25rem] sm:text-[3rem] font-bold gold-shimmer mb-6 tracking-tight">
                {locale === "ar" ? "خدمات العتبة المقدسة" : "Shrine Services"}
              </h2>
              <div className="h-px w-24 bg-gold/30 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                {
                  iconId: "feeding",
                  title: locale === "ar" ? "إطعام الزوار" : "Feeding Pilgrims",
                  desc: locale === "ar" ? "تقديم آلاف الوجبات يومياً للزوار الكرام" : "Providing thousands of meals daily to honorary visitors",
                },
                {
                  iconId: "reconstruction",
                  title: locale === "ar" ? "الصيانة والإعمار" : "Maintenance & Reconstruction",
                  desc: locale === "ar" ? "صيانة مستمرة وتطوير مرافق المرقد الشريف" : "Continuous maintenance and development of the shrine's facilities",
                },
                {
                  iconId: "orphan",
                  title: locale === "ar" ? "رعاية الأيتام" : "Orphan Care",
                  desc: locale === "ar" ? "كفالة ورعاية الأيتام وتوفير احتياجاتهم" : "Sponsorship and care for orphans and providing their needs",
                },
              ].map((service) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gold/5 group hover:border-gold/30 transition-all duration-700"
                >
                  <div className="w-16 h-16 mb-8 group-hover:scale-110 transition-all duration-700">
                    <Image
                      src={`/icons/${service.iconId}.png`}
                      alt={service.title}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-7 font-light">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Donations Help - Obsidian Theme */}
      <section className="py-[var(--spacing-fib-8)] px-4 bg-shrine-blue-dark theme-shrine-dark relative overflow-hidden">
        <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <h2 className="text-[2rem] sm:text-[3rem] font-bold gold-shimmer mb-10 tracking-tight">
              {locale === "ar" ? "كيف يساهم تبرعك؟" : "How Your Donation Helps"}
            </h2>
            <p className="text-gold-light/60 text-lg sm:text-xl leading-[2] font-light max-w-2xl mx-auto mb-16 italic">
              {locale === "ar"
                ? "تبرعاتكم الكريمة تساهم في استمرار تقديم الخدمات للزوار من إطعام وإيواء ورعاية، وفي إعمار وصيانة المرقد الشريف."
                : "Your generous donations contribute to the continued provision of services to visitors, including feeding, housing, and care, as well as the reconstruction and maintenance of the holy shrine."}
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-4 rounded-full font-bold bg-gold text-shrine-blue-dark hover:bg-gold-light shadow-gold-glow px-12 py-5 text-lg transition-all duration-700 hover:scale-105"
            >
              {locale === "ar" ? "ساهم الآن" : "Contribute Now"}
              <span className={locale === 'ar' ? 'rotate-180' : ''}>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
