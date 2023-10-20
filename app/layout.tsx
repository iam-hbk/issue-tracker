import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Navbar from "./Navbar";
import { Theme, ThemePanel } from "@radix-ui/themes";

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
        <Theme appearance="light" accentColor="crimson" radius="large">
          <Navbar />
          <main className="p-4">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
