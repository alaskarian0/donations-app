import Link from "next/link";
import { SITE_NAME, SITE_LOCATION, NAV_LINKS } from "@/lib/constants";
import GoldenDivider from "@/components/ui/GoldenDivider";

export default function Footer() {
  return (
    <footer className="bg-shrine-blue-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-shrine-blue-dark font-bold text-lg">
                ع
              </div>
              <h3 className="text-gold font-bold text-lg">{SITE_NAME}</h3>
            </div>
            <p className="text-sm leading-7 text-gray-400">
              مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام في مدينة
              سامراء المقدسة. نسعى لخدمة الزوار وإعمار المرقد الشريف.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-bold text-base mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-bold text-base mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{SITE_LOCATION}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span>
                <span>alaskarian.net</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>info@alaskarian.net</span>
              </li>
            </ul>
          </div>
        </div>

        <GoldenDivider />

        <div className="text-center text-sm text-gray-500">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} {SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
