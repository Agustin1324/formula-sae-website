import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Values from "@/components/values";
import { Montserrat } from 'next/font/google'
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "FIUBA Racing",
  description: "Official website of FIUBA Racing Formula Student Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${montserrat.className} flex flex-col min-h-screen w-full overflow-x-hidden`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow transition-all duration-300 ease-in-out pt-16 w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
