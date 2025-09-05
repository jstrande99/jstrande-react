import React from "react";
import styled from "styled-components";
import TiltedCard from "../reactbits/TiltedCard";
import { Typewriter } from "react-simple-typewriter";

const ProjectsSection = styled.section`
  position: relative;
  padding: 0 0 5rem;
  background-color: transparent;
  color: white;
  overflow: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
`;

// background is provided globally in App.js

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  perspective: 1000px;
  background-color: transparent !important;
  border: none !important;
  border-radius: 10px;
  contain: paint;
`;

const ProjectsHero = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  color: white;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin: 0 auto 2.5rem;
  max-width: 800px;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
`;
// eslint-disable-next-line
const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lightText};
  opacity: 0.9;
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem;
  color: white;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.colors.lightText};

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const StyledTypewriter = styled.span`
  color: #ffffff;
`;

const SectionUnderline = styled.div`
  width: 120px;
  height: 3px;
  margin: 1.25rem auto 0;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(255, 215, 145, 0.9),
    rgba(105, 73, 1, 0.9)
  );
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
`;

// removed ProjectTitleBack; using ProjectTitle in overlay instead

// cleaned up: removed description/tags/CTA styles to simplify UI

const projects = [
  {
    id: 0,
    title: "Nural Labs AI",
    description: "AI powered phone agent.",
    link: "https://www.nurallabs.com",
    image: "/projects/NuralLabs.png",
    tags: [
      "React",
      "Firebase",
      "Python",
      "Node.js",
      "Render Severs",
      "Firebase Cloud Functions",
      "REST-API",
      "Built Solo",
    ],
  },
  {
    id: 0,
    title: "SpinFlow AI",
    description: "AI powered assistant for small and large companies.",
    link: "https://app.spinflow.ai",
    image: "/projects/SpinFlow.png",
    tags: [
      "React",
      "Firebase",
      "Python",
      "Node.js",
      "Render Severs",
      "Firebase Cloud Functions",
      "REST-API",
      "Built Solo",
    ],
  },
  {
    id: 1,
    title: "TJ's Sportsbar & Grill",
    description:
      "A full-stack restaurant website for hosting social events and services.",
    link: "https://tjssportsbarlakewood.com/",
    image: "/projects/TJsportsBarAndGrill.png",
    tags: ["React", "Node.js", "Firebase"],
  },
  {
    id: 2,
    title: "3D E-commerce Platform",
    description:
      "Strande Designs. A showcase of 3D elements, in both a website and E-commerce site.",
    link: "https://strandedesigns.netlify.app",
    image: "/projects/StrandeDesigns2.png",
    tags: ["React", "THREE.js", "CSS", "Blender", "Firebase"],
  },

  {
    id: 4,
    title: "Tail Trails App",
    description: "Pet health and location tracking system via QR codes.",
    link: "https://tailtrails.netlify.app/",
    image: "/projects/TailTrails.png",
    tags: ["React", "Firebase", "Firebase Cloud Functions"],
  },

  {
    id: 6,
    title: "Sibling Kinect",
    description:
      "Site to assist children in need find help for them and their family.",
    link: "https://sibling-kinect.netlify.app",
    image: "/projects/siblingkinnect.png",
    tags: ["React", "Firebase"],
  },
];

function Projects() {
  return (
    <ProjectsSection id="projects">
      <ProjectsHero>
        <Container>
          <SectionHeader>
            <SectionTitle>Projects</SectionTitle>
            <SectionSubtitle>
              Built with
              <StyledTypewriter>
                <Typewriter
                  words={[
                    " React JS",
                    " Python",
                    " Node JS",
                    " Firebase",
                    " Rest API",
                    " Docker",
                    " Typescript",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1200}
                />
              </StyledTypewriter>
            </SectionSubtitle>
            <SectionUnderline />
          </SectionHeader>
        </Container>
      </ProjectsHero>
      <Container>
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <TiltedCard
                  imageSrc={project.image || "/logos/logo512.png"}
                  altText={project.title}
                  captionText={project.title}
                  containerHeight="300px"
                  containerWidth="100%"
                  imageHeight="300px"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.08}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <ProjectTitle style={{ margin: 0 }}>
                        {project.title}
                      </ProjectTitle>
                    </div>
                  }
                />
              </a>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  );
}

export default Projects;
