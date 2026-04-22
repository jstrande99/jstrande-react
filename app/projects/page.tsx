import type { Metadata } from "next";
import ProjectsCatalog from "./ProjectsCatalog";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Flagship products from Lange Logic plus selected client and earlier work — AI agents, edge SEO, automated pentesting, mobile CI/CD.",
};

export default function ProjectsPage() {
  return <ProjectsCatalog />;
}
