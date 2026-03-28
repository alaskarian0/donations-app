export type DonationType =
  | "sadaqah"
  | "waqf"
  | "orphan"
  | "feeding"
  | "reconstruction"
  | "general";

export interface DonationTypeInfo {
  id: DonationType;
  nameAr: string;
  descriptionAr: string;
  icon: string;
}

export type PaymentMethod = "zaincash" | "superqi";

export interface PaymentMethodInfo {
  id: PaymentMethod;
  nameAr: string;
  nameEn: string;
  brandColor: string;
}

export interface DonationState {
  donationType: DonationType | null;
  amount: number | null;
  customAmount: string;
  paymentMethod: PaymentMethod | null;
  donorName: string;
  donorPhone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
}

export type DonationAction =
  | { type: "SET_DONATION_TYPE"; payload: DonationType }
  | { type: "SET_AMOUNT"; payload: number | null }
  | { type: "SET_CUSTOM_AMOUNT"; payload: string }
  | { type: "SET_PAYMENT_METHOD"; payload: PaymentMethod }
  | { type: "SET_DONOR_NAME"; payload: string }
  | { type: "SET_DONOR_PHONE"; payload: string }
  | { type: "SET_CARD_NUMBER"; payload: string }
  | { type: "SET_CARD_EXPIRY"; payload: string }
  | { type: "SET_CARD_CVV"; payload: string }
  | { type: "RESET" };
