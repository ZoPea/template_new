import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import ClientWrapper from "./components/ClientWrapper";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import { themeScript } from "@/lib/utils/theme-script";
import { languageScript } from "@/lib/utils/language-script";
import { i18nConfig } from "@/lib/config/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Template App",
  description: "Single Page Application with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={i18nConfig.defaultLocale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `${themeScript}\n${languageScript}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <ClientWrapper>
              <Navigation />
              <main className="min-h-screen pt-16">
                {children}
              </main>
            </ClientWrapper>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
