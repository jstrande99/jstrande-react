import type { Metadata } from "next";
import ContactTerminalPage from "./ContactTerminal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to ambitious work — LLM-powered products, edge infrastructure, automated security, mobile CI/CD. Response within one business day.",
};

export default function ContactPage() {
  return <ContactTerminalPage />;
}
