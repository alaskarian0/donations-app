"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { DonationState, DonationAction } from "@/lib/types";

const initialState: DonationState = {
  donationType: null,
  amount: null,
  customAmount: "",
  paymentMethod: null,
  donorName: "",
  donorPhone: "",
  status: "idle",
};

function donationReducer(state: DonationState, action: DonationAction): DonationState {
  switch (action.type) {
    case "SET_DONATION_TYPE":
      return { ...state, donationType: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload, customAmount: "" };
    case "SET_CUSTOM_AMOUNT":
      return {
        ...state,
        customAmount: action.payload,
        amount: action.payload ? parseInt(action.payload) || null : null,
      };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "SET_DONOR_NAME":
      return { ...state, donorName: action.payload };
    case "SET_DONOR_PHONE":
      return { ...state, donorPhone: action.payload };
    case "SET_PAYMENT_INFO":
      return { 
        ...state, 
        paymentId: action.payload.paymentId, 
        status: action.payload.status 
      };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const DonationContext = createContext<{
  state: DonationState;
  dispatch: React.Dispatch<DonationAction>;
} | null>(null);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(donationReducer, initialState);

  return (
    <DonationContext.Provider value={{ state, dispatch }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
}
