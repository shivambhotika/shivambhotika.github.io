import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Gabriele Tinelli",
  description: "Personal website of Gabriele Tinelli - thoughts on technology, investing, and more.",
  openGraph: {
    title: "Gabriele Tinelli",
    description: "Personal website of Gabriele Tinelli",
    url: "https://gabtin.github.io",
    siteName: "Gabriele Tinelli",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gabriele Tinelli",
    description: "Personal website of Gabriele Tinelli",
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
    <html lang="en">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
