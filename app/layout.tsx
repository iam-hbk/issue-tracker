import React from "react";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Navbar from "./Navbar";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Toaster } from "sonner";
const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Issues Tracker",
  description: "An app to track issues - by @Hbk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={urbanist.variable}>
        <Theme appearance="light" accentColor="indigo" radius="large">
          <Navbar />
          <main className="p-4">{children}</main>
          <Toaster richColors position="top-right" />
        </Theme>
      </body>
    </html>
  );
}
