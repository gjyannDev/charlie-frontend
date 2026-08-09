import type { Metadata } from "next";
import "./globals.css";
import { inter, poppins } from "@/lib/font";
import { Providers } from "@/lib/api/provider";

export const metadata: Metadata = {
  title: "Charlie",
  description: "AI Powered Social Medial Management System",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
