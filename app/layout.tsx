import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discussioned — Find the complete conversation",
  description:
    "Search products, movies, places, businesses, technologies, claims and ideas. Find the complete conversation in one place.",
  metadataBase: new URL("https://discussioned.com"),
  openGraph: {
    title: "Discussioned",
    description: "Find the complete conversation behind anything.",
    url: "https://discussioned.com",
    siteName: "Discussioned",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discussioned",
    description: "Find the complete conversation behind anything.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
