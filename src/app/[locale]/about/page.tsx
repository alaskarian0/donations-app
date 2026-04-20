"use client";

import { motion } from "framer-motion";
import GoldenDivider from "@/components/ui/GoldenDivider";
import { SITE_NAME } from "@/lib/constants";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

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
      {/* Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-shrine-blue-dark to-shrine-blue geometric-bg">
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold mb-4"
          >
            {locale === "ar" ? "عن المرقد الشريف" : "About the Holy Shrine"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg font-inter"
          >
            {SITE_NAME} - {locale === "ar" ? "سامراء، العراق" : "Samarra, Iraq"}
          </motion.p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold text-shrine-blue-dark mb-6">
              {locale === "ar" ? "تاريخ المرقد الشريف" : "Shrine History"}
            </h2>
            <GoldenDivider />
            <div className="space-y-5 text-gray-600 leading-8">
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

      {/* Reconstruction */}
      <section className="py-16 sm:py-20 px-4 bg-gray-50 geometric-bg">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold text-shrine-blue-dark mb-6">
              {locale === "ar" ? "إعادة الإعمار" : "Reconstruction"}
            </h2>
            <GoldenDivider />
            <div className="space-y-5 text-gray-600 leading-8">
              <p>
                {locale === "ar"
                  ? "بُني المرقد في عام 944 ميلادي، ويتميز بقبته الذهبية الشهيرة. تم إعادة بناء القبة الذهبية والمئذنتين بأبهى حلة بعد أحداث عام 2006."
                  : "The shrine was built in 944 AD and is famous for its golden dome. The golden dome and the two minarets were rebuilt in their finest form after the events of 2006."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold text-shrine-blue-dark mb-6">
              {locale === "ar" ? "خدمات العتبة المقدسة" : "Shrine Services"}
            </h2>
            <GoldenDivider />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "🍽️",
                  title: locale === "ar" ? "إطعام الزوار" : "Feeding Pilgrims",
                  desc: locale === "ar" ? "تقديم آلاف الوجبات يومياً للزوار الكرام" : "Providing thousands of meals daily to honorary visitors",
                },
                {
                  icon: "🏗️",
                  title: locale === "ar" ? "الصيانة والإعمار" : "Maintenance & Reconstruction",
                  desc: locale === "ar" ? "صيانة مستمرة وتطوير مرافق المرقد الشريف" : "Continuous maintenance and development of the shrine's facilities",
                },
                {
                  icon: "🤲",
                  title: locale === "ar" ? "رعاية الأيتام" : "Orphan Care",
                  desc: locale === "ar" ? "كفالة ورعاية الأيتام وتوفير احتياجاتهم" : "Sponsorship and care for orphans and providing their needs",
                },
              ].map((service) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-gold"
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-bold text-shrine-blue-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-6">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Donations Help */}
      <section className="py-16 sm:py-20 px-4 bg-shrine-blue-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-6">
              {locale === "ar" ? "كيف يساهم تبرعك؟" : "How Your Donation Helps"}
            </h2>
            <p className="text-gray-400 leading-8 max-w-2xl mx-auto mb-8">
              {locale === "ar"
                ? "تبرعاتكم الكريمة تساهم في استمرار تقديم الخدمات للزوار من إطعام وإيواء ورعاية، وفي إعمار وصيانة المرقد الشريف."
                : "Your generous donations contribute to the continued provision of services to visitors, including feeding, housing, and care, as well as the reconstruction and maintenance of the holy shrine."}
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-medium bg-gold text-shrine-blue-dark hover:bg-gold-dark shadow-lg shadow-gold/20 hover:shadow-gold/40 px-8 py-4 text-lg transition-all duration-200"
            >
              {locale === "ar" ? "ساهم الآن" : "Contribute Now"}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
