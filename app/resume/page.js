import React from "react";
import Resume from "../../src/components/Resume";

export const metadata = {
  title: "Resume",
  description: "Professional resume for Jordan Strande",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return <Resume />;
}
