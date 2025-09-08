export default function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://jordanstrande.com";
  const routes = ["", "/projects", "/contact", "/resume"];
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route === "" ? "/" : route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
