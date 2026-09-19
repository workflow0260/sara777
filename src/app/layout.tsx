import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Outfit } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const outfit = Outfit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fbf7ef",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sara777.in"),
  title: "SARA 777 | Premium Gaming Experience",
  description: "Experience a next-generation gaming interface designed for speed, excitement and a premium experience. Official SARA 777 platform with real-time game rates.",
  keywords: ["SARA 777", "SARA777", "Premium Gaming Experience", "Game Rates", "Single Pana", "Half Sangam", "Full Sangam"],
  openGraph: {
    title: "SARA 777 - Premium Gaming Experience",
    description: "Experience a next-generation gaming interface designed for speed, excitement and a premium experience.",
    images: ["/logo.webp"],
    type: "website",
  },
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${outfit.variable} scroll-smooth`}>
      <body>
        {children}
      </body>
    </html>
  );
}
