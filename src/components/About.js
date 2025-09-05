import React from "react";
import styled from "styled-components";

const AboutSection = styled.section`
  position: relative;
  padding: 5rem 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 2rem;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 75%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContentContainer = styled.div`
  flex: 2;
`;

const Bio = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: white;
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding: 100px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  transition: all 0.4s ease;
  position: relative;

  &:hover img {
    transform: translateX(-10px);
  }

  &:hover span {
    display: block;
    opacity: 1;
    transform: translateX(10px);
  }

  img {
    max-width: 60px;
    transition: transform 0.4s ease;
  }

  span {
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    display: none;
    color: #fff;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translateX(-40px);
  }
`;

const BadgesWrapper = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  isolation: isolate;
`;

const BadgesGlassPane = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  backdrop-filter: blur(10px) saturate(1.05);
  -webkit-backdrop-filter: blur(10px) saturate(1.05);
  z-index: 0;
`;

function About() {
  return (
    <AboutSection id="about">
      <Container>
        <ImageContainer>
          <ProfileImage src="/Images/headShot.png" alt="Your Name" />
        </ImageContainer>
        <ContentContainer>
          <Bio>
            I’m an AI & Full-Stack Developer with a passion for continuous
            learning and building impactful software. With expertise in
            JavaScript, React, Node.js, Python, and modern cloud technologies, I
            thrive at the intersection of creativity and logic, developing
            applications that are as robust on the backend as they are intuitive
            on the frontend.
          </Bio>
          <Bio>
            My experience spans designing scalable APIs, orchestrating cloud
            deployments, and building responsive interfaces — enabling me to
            deliver solutions that are both technically sound and user-friendly.
            I enjoy tackling complex challenges, whether it’s optimizing
            database performance, architecting distributed systems, or crafting
            clean, maintainable code.
          </Bio>
          <Bio>
            Beyond coding, I bring the same focus and discipline I’ve built as
            an athlete and lifelong learner. When I’m not developing software, I
            stay active and continuously explore new technologies to sharpen my
            skills.
          </Bio>
        </ContentContainer>
      </Container>
      <BadgesWrapper>
        <BadgesGlassPane />
        <BadgeGrid>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
              alt="JavaScript"
            />
            <span>JavaScript</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
              alt="React"
            />
            <span>React</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
              alt="SQL"
            />
            <span>SQL</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
              alt="CSS3"
            />
            <span>CSS3</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain-wordmark.svg"
              alt="Java"
            />
            <span>Java</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg"
              alt="NodeJS"
            />
            <span>NodeJS</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg"
              alt="Git"
              style={{
                filter: "invert(100%) brightness(100%) saturate(100%)",
              }}
            />
            <span>Git</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
              alt="GitHub"
              style={{
                filter: "invert(100%) brightness(100%) saturate(100%)",
              }}
            />
            <span>GitHub</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg"
              alt="npm"
            />
            <span>NPM</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
              alt="NextJS"
              style={{
                filter: "invert(100%) brightness(100%) saturate(100%)",
              }}
            />
            <span>NextJS</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
              alt="C"
            />
            <span>C</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
              alt="C++"
            />
            <span>C++</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
              alt="Python"
            />
            <span>Python</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
              alt="SQL"
            />
            <span>SQL</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original-wordmark.svg"
              alt="Firebase"
            />
            <span>Firebase</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg"
              alt="HTML5"
            />
            <span>HTML5</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
              alt="AWS"
            />
            <span>AWS</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
              alt="Google Cloud"
            />
            <span>G Cloud</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
              alt="TensorFlow"
            />
            <span>TensorFlow</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"
              alt="Bootstrap"
            />
            <span>Bootstrap</span>
          </Badge>
          <Badge>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
              alt="Pytorch"
            />
            <span>Pytorch</span>
          </Badge>
        </BadgeGrid>
      </BadgesWrapper>
    </AboutSection>
  );
}

export default About;
