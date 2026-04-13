import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import theme from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://screenshop.saschb2b.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Screenshop — App Store Screenshot Studio",
    template: "%s — Screenshop",
  },
  description:
    "Create polished, conversion-optimized App Store and Google Play screenshots. AI-assisted, developer-friendly.",
  keywords: [
    "app store screenshots",
    "google play screenshots",
    "ASO",
    "app store optimization",
    "screenshot generator",
    "app marketing",
  ],
  authors: [{ name: "Sascha", url: "https://saschb2b.com/" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Screenshop",
    title: "Screenshop — App Store Screenshot Studio",
    description:
      "Create polished, conversion-optimized App Store and Google Play screenshots.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Screenshop — App Store Screenshot Studio",
    description:
      "Create polished, conversion-optimized App Store and Google Play screenshots.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
