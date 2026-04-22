import type { Metadata, Viewport } from "next";
import "./globals.css";
import Chrome from "@/components/chrome/Chrome";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jordanstrande.com"
  ),
  title: {
    default: "Jordan Strande — Full-Stack & AI Engineer",
    template: "%s | Jordan Strande",
  },
  description:
    "Full-stack & AI engineer. Co-founder of Lange Logic — shipping LLM-powered SaaS, edge SEO infrastructure, automated pentesting, and mobile CI/CD.",
  applicationName: "Jordan Strande",
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
    "TypeScript",
    "Python",
    "LLM",
    "RAG",
    "Agentic Workflows",
    "Cloudflare Workers",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jordan Strande — Full-Stack & AI Engineer",
    description:
      "Full-stack & AI engineer. Co-founder of Lange Logic — shipping LLM-powered SaaS, edge SEO infrastructure, automated pentesting, and mobile CI/CD.",
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
    title: "Jordan Strande — Full-Stack & AI Engineer",
    description:
      "Full-stack & AI engineer. Co-founder of Lange Logic.",
    images: ["/logos/logo512.png"],
  },
  icons: {
    icon: [
      { url: "/logos/favicon.ico" },
      { url: "/logos/logo192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/logos/logo192.png" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to font hosts for faster handshake */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical font CSS — three families only. */}
        <link
          rel="preload"
          as="style"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap"
        />

        {/* Load font CSS */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
