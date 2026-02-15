import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://shivambhotika.github.io"),
  title: {
    default: "Shivam Bhotika",
    template: "%s | Shivam Bhotika",
  },
  description: "Personal website of Shivam Bhotika - venture, startups, and writing about tech and culture.",
  icons: {
    icon: "/images/habboicon.png",
    apple: "/images/habboicon.png",
  },
  openGraph: {
    title: "Shivam Bhotika",
    description: "Personal website of Shivam Bhotika - venture, startups, and writing about tech and culture.",
    url: "https://shivambhotika.github.io",
    siteName: "Shivam Bhotika",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shivam Bhotika",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Bhotika",
    description: "Personal website of Shivam Bhotika - venture, startups, and writing about tech and culture.",
    images: ["/images/og-image.png"],
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
