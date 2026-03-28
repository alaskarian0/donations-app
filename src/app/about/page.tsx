"use client";

import { motion } from "framer-motion";
import GoldenDivider from "@/components/ui/GoldenDivider";
import { SITE_NAME } from "@/lib/constants";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-shrine-blue-dark to-shrine-blue geometric-bg">
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold mb-4"
          >
            عن المرقد الشريف
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            {SITE_NAME} - سامراء، العراق
          </motion.p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold text-shrine-blue-dark mb-6">
              تاريخ المرقد الشريف
            </h2>
            <GoldenDivider />
            <div className="space-y-5 text-gray-600 leading-8">
              <p>
                يقع مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام في مدينة
                سامراء المقدسة، وهو من أقدس المراقد الإسلامية في العالم. يضم المرقد
                رفات الإمام العاشر علي الهادي (عليه السلام) والإمام الحادي عشر الحسن
                العسكري (عليه السلام).
              </p>
              <p>
                بُني المرقد في عام 944 ميلادي، ويتميز بقبته الذهبية الشهيرة التي
                غُطيت بـ 72,000 قطعة ذهبية في عام 1905م، لتصبح رمزاً بارزاً لمدينة
                سامراء المقدسة ومعلماً إسلامياً عالمياً.
              </p>
              <p>
                كما يضم المرقد الشريف مرقد السيدة حكيمة خاتون (أخت الإمام علي
                الهادي عليه السلام) والسيدة نرجس خاتون (أم الإمام محمد المهدي عجل
                الله تعالى فرجه الشريف).
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
              إعادة الإعمار
            </h2>
            <GoldenDivider />
            <div className="space-y-5 text-gray-600 leading-8">
              <p>
                تعرض المرقد الشريف لتفجيرين إرهابيين في عامي 2006 و 2007، مما أدى
                إلى تدمير القبة الذهبية والمئذنتين التاريخيتين. هزّ هذا الاعتداء
                الآثم مشاعر المسلمين في جميع أنحاء العالم.
              </p>
              <p>
                بدأت أعمال إعادة الإعمار في عام 2009 بدعم من الحكومة العراقية
                ومنظمة اليونسكو وبرنامج الأمم المتحدة الإنمائي ولجنة إعمار العتبات
                المقدسة، وبتوجيهات المرجع الأعلى آية الله العظمى السيد علي
                السيستاني (دام ظله الشريف).
              </p>
              <p>
                تم إعادة بناء القبة الذهبية والمئذنتين بأبهى حلة، وتواصل العتبة
                المقدسة جهود الصيانة والتطوير المستمرة لخدمة الزوار الكرام.
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
              خدمات العتبة المقدسة
            </h2>
            <GoldenDivider />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "🍽️",
                  title: "إطعام الزوار",
                  desc: "تقديم آلاف الوجبات يومياً للزوار الكرام",
                },
                {
                  icon: "📚",
                  title: "البرامج التعليمية",
                  desc: "برامج تعليمية ودينية وثقافية متنوعة",
                },
                {
                  icon: "🏗️",
                  title: "الصيانة والإعمار",
                  desc: "صيانة مستمرة وتطوير مرافق المرقد الشريف",
                },
                {
                  icon: "🤲",
                  title: "رعاية الأيتام",
                  desc: "كفالة ورعاية الأيتام وتوفير احتياجاتهم",
                },
                {
                  icon: "📡",
                  title: "البث المباشر",
                  desc: "نقل مباشر للشعائر والمناسبات الدينية",
                },
                {
                  icon: "🏥",
                  title: "الخدمات الصحية",
                  desc: "تقديم خدمات صحية وطبية للزوار",
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
              كيف يساهم تبرعك؟
            </h2>
            <p className="text-gray-400 leading-8 max-w-2xl mx-auto mb-8">
              تبرعاتكم الكريمة تساهم في استمرار تقديم الخدمات للزوار من إطعام
              وإيواء ورعاية، وفي إعمار وصيانة المرقد الشريف، ودعم البرامج
              التعليمية والثقافية، وكفالة الأيتام والمحتاجين.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-medium bg-gold text-shrine-blue-dark hover:bg-gold-dark shadow-lg shadow-gold/20 hover:shadow-gold/40 px-8 py-4 text-lg transition-all duration-200"
            >
              ساهم الآن
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
