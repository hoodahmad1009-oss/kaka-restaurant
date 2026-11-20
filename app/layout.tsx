
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaka Family Restaurant | Lahore",
  description:
    "Discover Kaka Family Restaurant in Lahore. Explore traditional Pakistani karahi, desi dishes and family favourites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
