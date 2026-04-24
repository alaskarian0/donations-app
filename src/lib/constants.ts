import { DonationTypeInfo, PaymentMethodInfo } from "./types";

export const SITE_NAME = "العتبة العسكرية المقدسة";
export const SITE_SUBTITLE = "مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام";
export const SITE_LOCATION = "سامراء، العراق";

export const DONATION_TYPES: DonationTypeInfo[] = [
  {
    id: "general",
    nameAr: "الدعم العام",
    descriptionAr: "دعم عام لجميع مشاريع الإعمار والبناء في العتبة المقدسة",
    icon: "Star",
  },
  {
    id: "reconstruction",
    nameAr: "إعمار المرقد",
    descriptionAr: "المساهمة في مشاريع ترميم وإعادة بناء المرقد الشريف",
    icon: "Building2",
  },
  {
    id: "expansion",
    nameAr: "مشاريع التوسعة",
    descriptionAr: "توسعة المرافق والفضاءات لاستيعاب أعداد الزوار المتزايدة",
    icon: "Maximize2",
  },
  {
    id: "infrastructure",
    nameAr: "البنية التحتية",
    descriptionAr: "تطوير شبكات الكهرباء والمياه وأنظمة الصرف الصحي",
    icon: "Wrench",
  },
  {
    id: "landscaping",
    nameAr: "الساحات والحدائق",
    descriptionAr: "تطوير وتجميل الساحات الخارجية ومناطق استقبال الزوار",
    icon: "Trees",
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
  { id: "projects", label: "مشروع منجز", value: 47, icon: "Hammer" },
  { id: "sqmeters", label: "متر مربع معاد تأهيله", value: 15200, icon: "Maximize2" },
  { id: "donors", label: "داعم ومتبرع", value: 12500, icon: "Users" },
  { id: "years", label: "سنة من الخدمة", value: 25, icon: "CalendarDays" },
];
