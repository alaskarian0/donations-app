import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DonationProvider } from "@/context/DonationContext";

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "العتبة العسكرية المقدسة - التبرعات",
  description:
    "منصة التبرعات الرسمية للعتبة العسكرية المقدسة في سامراء - ساهم في خدمة المرقد الطاهر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoKufi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-arabic bg-background text-foreground">
        <DonationProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </DonationProvider>
      </body>
    </html>
  );
}
