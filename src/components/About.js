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
  background-color: transparent;
  border: 2px solid transparent;
  background-image: linear-gradient(black, black),
    linear-gradient(90deg, #ffd791, #694901);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 10px;
  cursor: pointer;
  padding: 1rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover img {
    transform: translateX(-10px); /* Slide image to the left */
  }

  &:hover span {
    display: block;
    opacity: 1;
    transform: translateX(10px); /* Slide text in */
  }

  img {
    max-width: 60px;
    transition: transform 0.4s ease; /* Smooth image sliding */
  }

  span {
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    display: none;
    color: #fff;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translateX(-40px); /* Initially hidden */
  }
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
            I'm a full-stack developer with a passion for continuous learning.
            With deep expertise in JavaScript, React, and modern web development
            technologies, I'm driven by creativity, logic, and the constant need
            to explore new things.
          </Bio>
          <Bio>
            My journey as a developer has led me to master a variety of
            programming languages and frameworks, and I love crafting intuitive,
            efficient, and elegant solutions for complex problems. When I'm not
            coding, I enjoy keeping fit and playing guitar.
          </Bio>
        </ContentContainer>
      </Container>
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
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
            alt="CSS3"
          />
          <span>CSS3</span>
        </Badge>
        <Badge>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg"
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
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-line.svg"
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
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg"
            alt="HTML5"
          />
          <span>HTML5</span>
        </Badge>
      </BadgeGrid>
    </AboutSection>
  );
}

export default About;
