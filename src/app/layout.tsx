import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://ladelgorila.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LADELGORILA — Streetwear | Gym | Disciplina",
    template: "%s | LADELGORILA",
  },
  description:
    "LADELGORILA. Streetwear y esenciales de gym. Disciplina. Lealtad. Desde Córdoba, Colombia al mundo.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: "LADELGORILA — Streetwear | Gym | Disciplina",
    description:
      "LADELGORILA. Streetwear y esenciales de gym. Disciplina. Lealtad. Desde Córdoba, Colombia al mundo.",
    siteName: "LADELGORILA",
  },
  twitter: {
    card: "summary_large_image",
    title: "LADELGORILA — Streetwear | Gym | Disciplina",
    description:
      "LADELGORILA. Streetwear y esenciales de gym. Disciplina. Lealtad. Desde Córdoba, Colombia al mundo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
