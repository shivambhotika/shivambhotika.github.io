import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://gabtin.github.io"),
  title: {
    default: "Gabriele Tinelli",
    template: "%s | Gabriele Tinelli",
  },
  description: "Personal website of Gabriele Tinelli - builder, investor, and technologist.",
  icons: {
    icon: "/images/habboicon.png",
    apple: "/images/habboicon.png",
  },
  openGraph: {
    title: "Gabriele Tinelli",
    description: "Personal website of Gabriele Tinelli - builder, investor, and technologist.",
    url: "https://gabtin.github.io",
    siteName: "Gabriele Tinelli",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/habboicon.png",
        width: 1200,
        height: 630,
        alt: "Gabriele Tinelli",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Gabriele Tinelli",
    description: "Personal website of Gabriele Tinelli - builder, investor, and technologist.",
    images: ["/images/habboicon.png"],
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
