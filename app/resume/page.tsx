import type { Metadata } from "next";
import ResumeTerminal from "./ResumeTerminal";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Experience, education, and selected credentials of Jordan Strande — full-stack & AI engineer, co-founder of Lange Logic.",
};

export default function ResumePage() {
  return <ResumeTerminal />;
}
