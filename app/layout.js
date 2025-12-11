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
    "AI & Full-Stack Developer specializing in React, Node.js, Python and cloud-native systems.",
  applicationName: "Jordan Strande Portfolio",
  authors: [{ name: "Jordan Strande" }],
  creator: "Jordan Strande",
  keywords: [
    "Jordan Strande",
    "AI Developer",
    "Full-Stack Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jordan Strande",
    description:
      "AI & Full-Stack Developer specializing in React, Node.js, Python and cloud-native systems.",
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
      "AI & Full-Stack Developer specializing in React, Node.js, Python and cloud-native systems.",
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
    <html lang="en">
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
        {/* Spinflow SEO Pixel - Universal Edition */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  const siteId = "f9a10685-7b76-45b7-b5a6-8f6955a77299";
  const cdnUrl = "https://seo-config-cdn.strandejord.workers.dev";
  const trackingUrl = "https://cczuwhztqhbqydqslwiz.supabase.co/functions/v1/seo-track-click";
  const path = window.location.pathname;

  // Generate or retrieve session ID for A/B test consistency
  let sessionId = localStorage.getItem('seo_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('seo_session_id', sessionId);
  }

  // Detect traffic source for analytics
  function getTrafficSource() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('gclid')) return 'google-ads';
    if (params.has('fbclid')) return 'facebook';
    if (params.has('utm_source')) return params.get('utm_source');

    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('google.')) return 'google-organic';
    if (referrer.includes('bing.')) return 'bing';
    if (referrer.includes('facebook.')) return 'facebook';

    return referrer ? 'referral' : 'direct';
  }

  const trafficSource = getTrafficSource();
  const isFromSearch = trafficSource.includes('google') || trafficSource.includes('bing');

  // Fetch from Edge CDN (Cloudflare KV - FREE & FAST)
  fetch(cdnUrl + '/' + siteId + path + '?session_id=' + sessionId)
    .then(res => res.json())
    .then(data => {
      if (!data.optimized_title) return;

      // Apply title
      document.title = data.optimized_title;

      // Apply meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = data.optimized_meta_desc;

      // Apply Open Graph tags
      if (data.og_tags) {
        Object.keys(data.og_tags).forEach(property => {
          let ogTag = document.querySelector('meta[property="' + property + '"]');
          if (!ogTag) {
            ogTag = document.createElement('meta');
            ogTag.setAttribute('property', property);
            document.head.appendChild(ogTag);
          }
          ogTag.content = data.og_tags[property];
        });
      }

      // Apply Twitter Card tags
      if (data.twitter_card) {
        Object.keys(data.twitter_card).forEach(name => {
          let twitterTag = document.querySelector('meta[name="' + name + '"]');
          if (!twitterTag) {
            twitterTag = document.createElement('meta');
            twitterTag.setAttribute('name', name);
            document.head.appendChild(twitterTag);
          }
          twitterTag.content = data.twitter_card[name];
        });
      }

      // Inject Schema.org JSON-LD
      if (data.schema_markup) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data.schema_markup);
        document.head.appendChild(script);
      }

      // Track click if from search engine (only tracking call hits Supabase)
      if (isFromSearch && data.page_id) {
        setTimeout(() => {
          fetch(trackingUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              page_id: data.page_id,
              variant: data.variant,
              source: trafficSource
            })
          }).catch(() => {});
        }, 1000);
      }
    })
    .catch(() => {}); // Silent fail - site still works
})();
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
