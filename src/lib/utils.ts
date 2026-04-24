import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Currency config per locale
export const CURRENCY_CONFIG: Record<string, {
  code: string;
  symbol: string;
  locale: string;
  rate: number; // rate relative to 1 IQD
}> = {
  ar: { code: "IQD", symbol: "د.ع", locale: "ar-IQ", rate: 1 },
  en: { code: "USD", symbol: "$", locale: "en-US", rate: 0.00076 }, // ~1 USD = 1,310 IQD
  fa: { code: "IRR", symbol: "تومان", locale: "fa-IR", rate: 32.06 }, // ~1 IQD = ~32 IRR (toman)
};

export function getCurrencyConfig(locale: string) {
  return CURRENCY_CONFIG[locale] || CURRENCY_CONFIG.ar;
}

export function convertAmount(amountIQD: number, locale: string): number {
  const config = getCurrencyConfig(locale);
  return Math.round(amountIQD * config.rate);
}

export function formatCurrency(amount: number, locale: string = "ar"): string {
  const config = getCurrencyConfig(locale);
  const converted = Math.round(amount * config.rate);

  const formatted = new Intl.NumberFormat(config.locale, {
    style: "decimal",
    maximumFractionDigits: locale === "en" ? 2 : 0,
  }).format(converted);

  if (locale === "en") {
    return `$${formatted}`;
  }
  return `${formatted} ${config.symbol}`;
}

export function getPresetAmounts(locale: string): { display: number; iqd: number }[] {
  const baseAmounts = [5000, 10000, 25000, 50000, 100000];
  const config = getCurrencyConfig(locale);

  if (locale === "ar" || locale === "fa") {
    return baseAmounts.map((a) => ({ display: a, iqd: a }));
  }

  // For non-IQD locales, show rounded converted amounts
  return baseAmounts.map((a) => {
    const converted = Math.round(a * config.rate);
    // Round to nice numbers
    const nice = locale === "en"
      ? Math.round(converted) // already small numbers for USD
      : Math.round(converted / 1000) * 1000; // round to nearest 1000 for IRR
    return { display: nice || converted, iqd: a };
  });
}

export function generateReferenceId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ASK-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 4) {
    return digits.slice(0, 4) + " " + digits.slice(4, 7) + (digits.length > 7 ? " " + digits.slice(7) : "");
  }
  return digits;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return digits.slice(0, 2) + "/" + digits.slice(2);
  }
  return digits;
}
