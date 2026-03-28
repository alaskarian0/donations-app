import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ar-IQ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + " د.ع";
}

export function generateReferenceId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ASK-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
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

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 4) {
    return digits.slice(0, 4) + " " + digits.slice(4, 7) + (digits.length > 7 ? " " + digits.slice(7) : "");
  }
  return digits;
}
