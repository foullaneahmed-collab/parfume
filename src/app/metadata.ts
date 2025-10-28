import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "Essence - Luxury Perfumes",
    template: "%s | Essence",
  },
  description:
    "Discover our exquisite collection of luxury perfumes. Premium fragrances for men and women. Shop now and find your signature scent.",
  keywords: [
    "perfume",
    "luxury perfume",
    "men perfume",
    "women perfume",
    "fragrance",
    "eau de parfum",
    "cologne",
    "scent",
    "essence",
  ],
  authors: [{ name: "Essence" }],
  creator: "Essence",
  publisher: "Essence",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://essence-perfumes.vercel.app"),
  openGraph: {
    title: "Essence - Luxury Perfumes",
    description: "Discover our exquisite collection of luxury perfumes",
    url: "https://essence-perfumes.vercel.app",
    siteName: "Essence",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Essence - Luxury Perfumes",
    description: "Discover our exquisite collection of luxury perfumes",
    creator: "@essence",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
