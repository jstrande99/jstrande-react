import "../app/globals.css";
import React from "react";
import Providers from "./providers";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jordanstrande.com"
  ),
  title: {
    default: "Jordan Strande",
    template: "%s | Jordan Strande",
  },
  description:
    "Full-Stack & AI Engineer. Co-founder of Lange Logic LLC, building LLM-powered SaaS, edge SEO infrastructure, automated pentesting, and mobile CI/CD.",
  applicationName: "Jordan Strande Portfolio",
  authors: [{ name: "Jordan Strande" }],
  creator: "Jordan Strande",
  keywords: [
    "Jordan Strande",
    "AI Engineer",
    "Full-Stack Engineer",
    "Lange Logic",
    "SpinFlow AI",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "LLM",
    "RAG",
    "Agentic Workflows",
    "Cloudflare Workers",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jordan Strande",
    description:
      "Full-Stack & AI Engineer. Co-founder of Lange Logic LLC, building LLM-powered SaaS, edge SEO infrastructure, automated pentesting, and mobile CI/CD.",
    url: "/",
    siteName: "Jordan Strande",
    images: [
      {
        url: "/logos/logo512.png",
        width: 512,
        height: 512,
        alt: "Jordan Strande",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Strande",
    description:
      "Full-Stack & AI Engineer. Co-founder of Lange Logic LLC, building LLM-powered SaaS, edge SEO infrastructure, automated pentesting, and mobile CI/CD.",
    images: ["/logos/logo512.png"],
    creator: "@jordanstrande",
  },
  icons: {
    icon: [
      { url: "/logos/favicon.ico" },
      { url: "/favicon.ico" },
      { url: "/logos/logo192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/logos/logo192.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logos/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/logos/logo192.png"
          type="image/png"
          sizes="192x192"
        />
        <link rel="apple-touch-icon" href="/logos/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
