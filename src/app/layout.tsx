import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parfume Nadia - عطور فاخرة للرجال والنساء",
  description:
    "اكتشف مجموعتنا الرائعة من العطور الفاخرة. عطور راقية للرجال والنساء. تسوق الآن واعثر على عطرك المميز.",
  keywords: "عطور، عطور فاخرة، عطور رجالية، عطور نسائية، عطر، او دو بارفان",
  authors: [{ name: "Parfume Nadia" }],
  openGraph: {
    title: "Parfume Nadia - عطور فاخرة",
    description: "اكتشف مجموعتنا الرائعة من العطور الفاخرة",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="antialiased">
        <Providers>
          <LoadingScreen />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
