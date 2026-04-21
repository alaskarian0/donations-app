import { DonationTypeInfo, PaymentMethodInfo } from "./types";

export const SITE_NAME = "العتبة العسكرية المقدسة";
export const SITE_SUBTITLE = "مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام";
export const SITE_LOCATION = "سامراء، العراق";

export const DONATION_TYPES: DonationTypeInfo[] = [
  {
    id: "general",
    nameAr: "مخصص صرف عام",
    descriptionAr: "تخصيص عام لكافة احتياجات ومشاريع العتبة",
    icon: "⭐",
  },
  {
    id: "reconstruction",
    nameAr: "مخصص اعمار وتوسعة",
    descriptionAr: "المساهمة في مشاريع الإعمار والتوسعة للمرقد الشريف",
    icon: "🏗️",
  },
  {
    id: "mudhif",
    nameAr: "مخصص المضيف",
    descriptionAr: "المساهمة في مضيف الزائرين وتوفير وجبات الطعام",
    icon: "🍽️",
  },
  {
    id: "sacrifices",
    nameAr: "مخصص شراء ذبائح",
    descriptionAr: "المساهمة في شراء الذبائح لوجه الله تعالى",
    icon: "💝",
  },
  {
    id: "servants",
    nameAr: "مخصص خدام العتبة العسكرية المقدسة",
    descriptionAr: "دعم وتقديم الخدمات لخدام المرقد الشريف",
    icon: "🤲",
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
  { id: "donors", label: "متبرع", value: 12500, icon: "👥" },
  { id: "meals", label: "وجبة مقدمة", value: 45000, icon: "🍽️" },
  { id: "orphans", label: "يتيم مكفول", value: 850, icon: "🤲" },
  { id: "projects", label: "مشروع إعمار", value: 23, icon: "🏗️" },
];
