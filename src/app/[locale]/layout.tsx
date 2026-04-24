import type { Metadata, Viewport } from "next";
import { Tajawal, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DonationProvider } from "@/context/DonationContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const arabicFont = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050B14",
};

export const metadata: Metadata = {
  title: "العتبة العسكرية المقدسة - التبرعات",
  description:
    "منصة التبرعات الرسمية للعتبة العسكرية المقدسة في سامراء - ساهم في خدمة المرقد الطاهر",
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    siteName: "العتبة العسكرية المقدسة",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr'} className={`${arabicFont.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://alaskarian.net" crossOrigin="anonymous" />
      </head>
      <body className={`min-h-full flex flex-col font-arabic bg-background text-foreground`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DonationProvider>
            <Navbar />
            <main className="flex-1 pt-[72px] sm:pt-[80px]">{children}</main>
            <Footer />
          </DonationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
