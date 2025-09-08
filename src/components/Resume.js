"use client";
import React from "react";
import styled from "styled-components";
import GlassSurface from "../reactbits/GlassSurface";
import { Typewriter } from "react-simple-typewriter";

const ResumeSection = styled.section`
  position: relative;
  padding: 0 0 5rem;
  background-color: transparent;
  color: white;
  overflow: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
  min-height: 100vh;
`;

const ResumeHero = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const HeroSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0.35rem 0 0.5rem;
  color: ${({ theme }) => theme.colors.lightText};
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ActionButton = styled.a`
  display: inline-block;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 992px) {
    grid-template-columns: 0.85fr 1.15fr;
  }
`;

const Card = styled.section`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.25rem;
  backdrop-filter: blur(6px) saturate(1.1);
`;

const SectionHeader = styled.div`
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.35rem;
`;

const SectionUnderline = styled.div`
  width: 100px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(255, 215, 145, 0.9),
    rgba(105, 73, 1, 0.9)
  );
`;

const SectionHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Item = styled.div`
  + div {
    margin-top: 1rem;
  }
`;

const ItemTitle = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #f7bf22;
`;

const Muted = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.lightText};
`;

const Body = styled.p`
  margin: 0;
`;

const List = styled.ul`
  margin: 0.25rem 0 0;
  padding-left: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;

  li {
    position: relative;
    padding-left: 1.25rem;
    line-height: 1.6;
  }

  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(255, 215, 145, 0.9),
      rgba(105, 73, 1, 0.9)
    );
    box-shadow: 0 0 8px rgba(255, 215, 145, 0.4);
  }
`;

const PillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Pill = styled.span`
  font-size: 0.875rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
`;

export default function Resume() {
  return (
    <ResumeSection>
      <Container>
        <ResumeHero>
          <div>
            <HeaderBar>
              <Title>Resume</Title>
              <HeroSubtitle>
                Focused on{" "}
                <span style={{ color: "#ffffff" }}>
                  <Typewriter
                    words={[
                      "Experience",
                      "Skills",
                      "Education",
                      "Certifications",
                      "Awards",
                      "Projects",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1200}
                  />
                </span>
              </HeroSubtitle>
              <SectionUnderline />
              <Actions>
                <ActionButton href="mailto:StrandeJordan@gmail.com">
                  <GlassSurface width={150} height={50} borderRadius={24}>
                    Contact
                  </GlassSurface>
                </ActionButton>
                <ActionButton
                  href="https://www.linkedin.com/in/jordan-strande/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlassSurface width={150} height={50} borderRadius={24}>
                    LinkedIn
                  </GlassSurface>
                </ActionButton>
                <ActionButton
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlassSurface width={170} height={50} borderRadius={24}>
                    Download PDF
                  </GlassSurface>
                </ActionButton>
              </Actions>
            </HeaderBar>
          </div>
        </ResumeHero>

        <Grid>
          <div>
            <Card>
              <SectionHeader>
                <SectionTitle>Profile</SectionTitle>
                <SectionUnderline />
              </SectionHeader>
              <Body>
                Co‑Founder & Lead Developer at Spinflow.ai and Nural Labs,
                spearheading scalable AI platforms and innovative conversational
                AI for real‑world applications. Expert in programming across
                multiple languages, AI model deployment, and cloud architecture.
                Experienced in leading agile teams and delivering projects from
                concept through release. Former U.S. Ski Team athlete, bringing
                resilience, discipline, and leadership to technology
                initiatives.
              </Body>
            </Card>

            <Card style={{ marginTop: "1.25rem" }}>
              <SectionHeader>
                <SectionTitle>Skills</SectionTitle>
                <SectionUnderline />
              </SectionHeader>
              <PillList>
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "JavaScript",
                  "TypeScript",
                  "Java",
                  "C",
                  "C++",
                  "Python",
                  "Flask/FastAPI",
                  "Firebase",
                  "Postgres/SQL",
                  "AWS/GCP",
                  "WebSockets",
                  "GSAP",
                  "Docker",
                  "REST-API",
                  "Agile/Scrum",
                  "Git",
                  "Three.js",
                ].map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </PillList>
            </Card>

            <Card style={{ marginTop: "1.25rem" }}>
              <SectionHeader>
                <SectionTitle>Education</SectionTitle>
                <SectionUnderline />
              </SectionHeader>
              <Item>
                <ItemTitle>B.S. Applied Computing Technology</ItemTitle>
                <Muted>Colorado State University</Muted>
              </Item>
            </Card>

            <Card style={{ marginTop: "1.25rem" }}>
              <SectionHeader>
                <SectionTitle>Certifications</SectionTitle>
                <SectionUnderline />
              </SectionHeader>
              <List>
                <li>Google Cybersecurity</li>
                <li>Google Generative AI Leader</li>
                <li>Certified Full Stack Developer</li>
              </List>
            </Card>

            <Card style={{ marginTop: "1.25rem" }}>
              <SectionHeader>
                <SectionTitle>Awards</SectionTitle>
                <SectionUnderline />
              </SectionHeader>
              <List>
                <li>Enterprise Innovation – Spinflow AI (2024)</li>
                <li>Technical Leadership – Nural Labs (2024)</li>
              </List>
            </Card>
          </div>

          <div>
            <Card>
              <SectionHeader>
                <SectionTitle>Experience</SectionTitle>
                <SectionUnderline />
              </SectionHeader>

              <Item>
                <ItemTitle>
                  CTO | CAIO | Co-Founder | Lead Developer • Nural Labs
                </ItemTitle>
                <Muted>2024 — Present</Muted>
                <List>
                  <li>
                    Built a high-performance Retrieval-Augmented Generation
                    (RAG) server in Python capable of millisecond-level document
                    search and retrieval.
                  </li>
                  <li>
                    Designed a real-time AI orchestration layer managing
                    calls/messages across three AI models, with support for
                    custom tool calls defined by the frontend.
                  </li>
                  <li>
                    Developed a React-based frontend for transcript review, tool
                    management, and dynamic modification of AI instructions and
                    scripts.
                  </li>
                  <li>
                    Scaled the platform to handle hundreds of concurrent
                    conversations with sub-500ms response times.
                  </li>
                  <li>
                    Ensured enterprise-grade compliance (PCI, SOC 2 Type II,
                    GDPR) while delivering reliable and secure conversational AI
                    solutions.{" "}
                  </li>
                </List>
              </Item>

              <Item>
                <ItemTitle>Co-Founder | Lead Developer • SpinFlow AI</ItemTitle>
                <Muted>2024 — Present</Muted>
                <List>
                  <li>
                    Co-founded SpinFlow.ai and built an AI SaaS that unifies
                    five top LLMs behind a single interface, putting
                    enterprise-grade AI in every user’s hands.
                  </li>
                  <li>
                    Architected a React/Next.js + Node TS/Python micro-service
                    stack on AWS/Firebase/Oracle, shipping the production MVP in
                    12 months and onboarding Fortune-500 pilots.
                  </li>
                  <li>
                    Developed a no‑code Agent Builder driving up to 800%
                    productivity gains.
                  </li>
                  <li>
                    Released real‑time Voice Capture and Chrome Extensions for
                    seamless AI knowledge ingestion.
                  </li>
                  <li>
                    Implemented AES-256/TLS 1.3 encryption, MFA/RBAC, audit
                    trails on-prem backup.
                  </li>
                  <li>
                    Directed agile pod with biweekly releases, demoing to
                    investors and clients.
                  </li>
                </List>
              </Item>

              <Item>
                <ItemTitle>Lead Developer • Lingows Automation</ItemTitle>
                <Muted>2024 — Present</Muted>
                <List>
                  <li>
                    Developed cutting-edge artificial intelligence software to
                    increase business productivity by 30%, utilizing Python,
                    TensorFlow, React, NodeJS and natural language processing.
                  </li>
                  <li>
                    Leading a team of seven developers using agile workflows and
                    scrums.
                  </li>
                  <li>
                    Developed RESTful API endpoints on severs using Flask and
                    Docker, handling over 1,000 requests per minute.
                  </li>
                  <li>
                    Facilitate sprint planning, daily stand-ups, and
                    retrospectives to ensure efficient project execution and
                    continuous improvement.
                  </li>
                  <li>
                    Integrated emerging AI technologies to maintain competitive
                    advantage.
                  </li>
                </List>
              </Item>

              <Item>
                <ItemTitle>
                  Competitive Ski Team Coach • Winter Park Resort
                </ItemTitle>
                <Muted>2019 — Present</Muted>
                <List>
                  <li>
                    Trained and mentored ski athletes, building discipline,
                    resilience, and goal-oriented performance strategies.
                  </li>
                  <li>
                    Collaborated with coaching staff to design training programs
                    and make strategic team decisions.
                  </li>
                  <li>
                    Fielded parent and athlete concerns, applying strong
                    communication and conflict resolution skills.
                  </li>
                  <li>
                    Organize travel logistics, scheduling, and team operations,
                    ensuring smooth participation in competitions.
                  </li>
                </List>
              </Item>

              <Item>
                <ItemTitle>Advanced Repair Agent • Geek Squad</ItemTitle>
                <Muted>2023 — 2024</Muted>
                <List>
                  <li>
                    Delivered expert diagnostics and repair of hardware/software
                    systems across a wide range of devices.
                  </li>
                  <li>
                    Engineered a Bash automation script for malware removal,
                    later deployed regionally across Geek Squads to streamline
                    workflows.
                  </li>
                  <li>
                    Designed and standardized troubleshooting processes that
                    reduced turnaround time and improved repair accuracy.
                  </li>
                  <li>
                    Maintained meticulous service records and documentation to
                    ensure knowledge sharing and repeatability.
                  </li>
                  <li>
                    Provided customer support with strong communication and
                    problem-solving skills, translating technical issues into
                    clear solutions.{" "}
                  </li>
                </List>
              </Item>
            </Card>
          </div>
        </Grid>
      </Container>
    </ResumeSection>
  );
}
