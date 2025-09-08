export default function robots() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://jordanstrande.com";
  const isProd =
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production";
  return {
    rules: isProd
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
