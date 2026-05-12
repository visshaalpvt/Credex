import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Credex AI Spend Audit | Optimize Your Startup's AI SaaS Costs",
  description: "Discover hidden AI subscription waste in under 2 minutes. Get a personalized savings report for your startup.",
  openGraph: {
    title: "Credex AI Spend Audit",
    description: "Discover hidden AI subscription waste in under 2 minutes.",
    type: "website",
    url: "https://credex.ai/audit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Credex AI Spend Audit",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
