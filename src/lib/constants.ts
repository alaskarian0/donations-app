import { DonationTypeInfo, PaymentMethodInfo } from "./types";

export const SITE_NAME = "العتبة العسكرية المقدسة";
export const SITE_SUBTITLE = "مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام";
export const SITE_LOCATION = "سامراء، العراق";

export const DONATION_TYPES: DonationTypeInfo[] = [
  {
    id: "sadaqah",
    nameAr: "صدقة",
    descriptionAr: "تبرع طوعي لوجه الله تعالى في سبيل الخير والبركة",
    icon: "💝",
  },
  {
    id: "waqf",
    nameAr: "وقف",
    descriptionAr: "وقف خيري دائم لدعم خدمات المرقد الشريف",
    icon: "🕌",
  },
  {
    id: "orphan",
    nameAr: "كفالة يتيم",
    descriptionAr: "كفالة ورعاية الأيتام وتوفير احتياجاتهم الأساسية",
    icon: "🤲",
  },
  {
    id: "feeding",
    nameAr: "إطعام الزوار",
    descriptionAr: "المساهمة في تقديم الطعام لزوار المرقد الطاهر",
    icon: "🍽️",
  },
  {
    id: "reconstruction",
    nameAr: "إعمار المرقد",
    descriptionAr: "المساهمة في إعمار وصيانة وترميم المرقد الشريف",
    icon: "🏗️",
  },
  {
    id: "general",
    nameAr: "خدمات عامة",
    descriptionAr: "دعم الخدمات العامة والبرامج التعليمية والثقافية",
    icon: "⭐",
  },
];

export const PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    id: "zaincash",
    nameAr: "زين كاش",
    nameEn: "ZainCash",
    brandColor: "#E4002B",
  },
  {
    id: "superqi",
    nameAr: "ماستركارد - كي كارد",
    nameEn: "Mastercard - Qi Card",
    brandColor: "#1A1F71",
  },
];

export const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

export const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/donate", label: "التبرعات" },
  { href: "/about", label: "عن المرقد" },
];

export const STATS = [
  { label: "متبرع", value: 12500, icon: "👥" },
  { label: "وجبة مقدمة", value: 45000, icon: "🍽️" },
  { label: "يتيم مكفول", value: 850, icon: "🤲" },
  { label: "مشروع إعمار", value: 23, icon: "🏗️" },
];
