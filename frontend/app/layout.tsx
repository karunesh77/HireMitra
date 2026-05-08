import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | HireMitra',
    default: 'HireMitra - Blue Collar Jobs Platform',
  },
  description: 'Connect skilled workers with employers. Find blue-collar jobs, post opportunities, and build your career with HireMitra.',
  keywords: ['blue collar jobs', 'hire workers', 'plumber', 'electrician', 'carpenter', 'jobs in India', 'HireMitra'],
  openGraph: {
    title: 'HireMitra - Blue Collar Jobs Platform',
    description: 'Connect skilled workers with employers. Find blue-collar jobs and hire talented workers.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'HireMitra',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireMitra - Blue Collar Jobs Platform',
    description: 'Connect skilled workers with employers.',
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
