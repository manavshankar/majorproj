import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | GameHub",
    default: "GameHub",
  },
  description: "Twitch Clone with Next.js, React.js, TailWindCSS & TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
          >
            <Toaster theme="light"/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}